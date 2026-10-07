import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Fragment, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Chip, Divider, Icon, List, Switch, Text } from 'react-native-paper';

import { CuboStand } from '../components/CuboStand';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { cuboCapabilities, cuboDevice, cuboDeviceSettings, cuboGallery } from '../data/cuboDevice';
import { RootStackParamList } from '../navigation/types';
import { fontFamilies, metricColors, palette, shape, space } from '../theme/material';

type GalleryItem = (typeof cuboGallery)[number];

const stats = [
  { icon: 'video-outline', label: 'Camera', value: cuboDevice.stats[0].value },
  { icon: 'car-outline', label: 'Drives', value: cuboDevice.stats[1].value },
  { icon: 'wifi', label: 'Uptime', value: cuboDevice.stats[2].value },
];

/**
 * Full-photo preview over the screen. Rendered in-screen (not a Portal) so it stays inside the
 * web phone frame.
 */
function PhotoPreview({ item, width, onClose }: { item: GalleryItem | null; width: number; onClose: () => void }) {
  if (!item) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable style={[StyleSheet.absoluteFill, styles.backdrop]} onPress={onClose} accessibilityLabel="Close photo" />
      <View style={styles.previewCenter} pointerEvents="box-none">
        <View style={[styles.previewCard, { width: width + 32 }]}>
          <Image
            source={item.source}
            style={[styles.previewImage, { width, height: width * 1.15 }]}
            resizeMode={item.key === 'device' ? 'contain' : 'cover'}
          />
          <Text variant="titleMedium" style={styles.previewTitle}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={styles.muted}>
            {item.caption}
          </Text>
          <Button style={styles.previewClose} onPress={onClose}>
            Close
          </Button>
        </View>
      </View>
    </View>
  );
}

/** Device — the paired CUBO unit, its status, what it detects, photos and settings. */
export const DeviceScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width: windowWidth } = useWindowDimensions();
  const [settings, setSettings] = useState(cuboDeviceSettings);
  const [preview, setPreview] = useState<GalleryItem | null>(null);

  const toggleSetting = (key: string) =>
    setSettings((current) => current.map((s) => (s.key === key ? { ...s, enabled: !s.enabled } : s)));

  return (
    <View style={styles.root}>
      <ScreenHeader title="Device" subtitle={cuboDevice.serial} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard>
          <View style={styles.stage}>
            <CuboStand height={210} />
          </View>
          <View style={styles.cardPad}>
            <View style={styles.titleRow}>
              <Text variant="headlineSmall">
                {cuboDevice.name} · {cuboDevice.pairedVehicleLabel}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.liveDot} />
              <Text variant="labelLarge" style={{ color: metricColors.focus.accent }}>
                {cuboDevice.connection}
              </Text>
              <Text variant="bodyMedium" style={styles.muted}>
                · synced {cuboDevice.lastSync}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button
                mode="contained"
                icon="camera-outline"
                contentStyle={styles.actionContent}
                onPress={() => navigation.navigate('DetectionLive', { vehicleId: cuboDevice.pairedVehicleId })}
              >
                Start live check
              </Button>
              <Button
                mode="outlined"
                contentStyle={styles.actionContent}
                onPress={() => navigation.navigate('VehicleDetail', { vehicleId: cuboDevice.pairedVehicleId })}
              >
                View {cuboDevice.pairedVehicleLabel}
              </Button>
            </View>
          </View>
        </SurfaceCard>

        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Icon source={s.icon} size={20} color={palette.primary} />
              <Text variant="titleMedium">{s.value}</Text>
              <Text variant="bodySmall" style={styles.muted}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          What CUBO detects
        </Text>
        <View style={styles.chips}>
          {cuboCapabilities.map((c) => (
            <Chip key={c.label} style={styles.chip} textStyle={styles.chipText}>
              {c.label}
            </Chip>
          ))}
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Hardware
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={cuboGallery}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.photos}
          renderItem={({ item }) => (
            <Pressable onPress={() => setPreview(item)} accessibilityLabel={`Open ${item.title} photo`}>
              <Image
                source={item.source}
                style={styles.photo}
                resizeMode={item.key === 'device' ? 'contain' : 'cover'}
              />
              <Text variant="labelLarge" style={styles.photoLabel}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Settings
        </Text>
        <SurfaceCard>
          {settings.map((s, i) => (
            <Fragment key={s.key}>
              {i > 0 ? <Divider style={styles.divider} /> : null}
              <List.Item
                title={s.label}
                description={s.description}
                titleStyle={styles.listTitle}
                onPress={() => toggleSetting(s.key)}
                right={() => <Switch value={s.enabled} onValueChange={() => toggleSetting(s.key)} />}
              />
            </Fragment>
          ))}
        </SurfaceCard>

        <SurfaceCard contentStyle={styles.cardPad}>
          <Text variant="titleMedium" style={styles.aboutTitle}>
            About
          </Text>
          <Text variant="bodyMedium" style={styles.muted}>
            CUBO sits on an adjustable stand facing the driver. It tracks head pose with MediaPipe Face Mesh and spots
            phones with YOLOv8, then sends each trip&apos;s distraction events to this app. Firmware{' '}
            {cuboDevice.firmware}.
          </Text>
        </SurfaceCard>
      </ScrollView>

      <PhotoPreview item={preview} width={Math.min(280, windowWidth - 80)} onClose={() => setPreview(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingHorizontal: space.lg,
    paddingBottom: space.xxl,
    gap: space.md,
  },
  stage: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surfaceContainerLow,
  },
  cardPad: {
    padding: space.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.xs,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: metricColors.focus.accent,
  },
  actions: {
    gap: space.sm,
    marginTop: space.lg,
  },
  actionContent: {
    height: 48,
  },
  statsRow: {
    flexDirection: 'row',
    gap: space.md,
  },
  stat: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 2,
    padding: space.lg,
    borderRadius: shape.tile,
    backgroundColor: palette.surfaceContainerLowest,
  },
  sectionTitle: {
    marginTop: space.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
  },
  chip: {
    backgroundColor: palette.surfaceContainerLowest,
  },
  chipText: {
    fontFamily: fontFamilies.medium,
  },
  photos: {
    gap: space.md,
  },
  photo: {
    width: 148,
    height: 180,
    borderRadius: shape.tile,
    backgroundColor: '#ECEDEF',
  },
  photoLabel: {
    marginTop: space.sm,
    color: palette.onSurfaceVariant,
  },
  divider: {
    marginHorizontal: space.lg,
  },
  listTitle: {
    fontFamily: fontFamilies.medium,
  },
  aboutTitle: {
    marginBottom: space.sm,
  },
  muted: {
    color: palette.onSurfaceVariant,
  },
  backdrop: {
    backgroundColor: 'rgba(20, 35, 44, 0.5)',
  },
  previewCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    borderRadius: shape.sheet,
    padding: space.lg,
    backgroundColor: palette.surfaceContainerLowest,
  },
  previewImage: {
    borderRadius: shape.tile,
    backgroundColor: '#ECEDEF',
  },
  previewTitle: {
    marginTop: space.lg,
  },
  previewClose: {
    marginTop: space.sm,
    alignSelf: 'flex-end',
  },
});

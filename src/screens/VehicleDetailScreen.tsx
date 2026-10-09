import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Chip, List, Text } from 'react-native-paper';

import { FlatCarGlyph } from '../components/FlatCarGlyph';
import { StackHeader } from '../components/ui/StackHeader';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { cuboDevice, cuboImages } from '../data/cuboDevice';
import { getDriverById, getVehicleById } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { fontFamilies, metricColors, palette, shape, space } from '../theme/material';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetail'>;

const statusTone = {
  Live: metricColors.focus,
  Ready: metricColors.trips,
  'Monitoring Off': { accent: palette.onSurfaceVariant, container: palette.surfaceContainerHigh, onContainer: palette.onSurface },
};

/** Vehicle detail — status, scores, the installed CUBO unit and the assigned driver. */
export const VehicleDetailScreen = ({ navigation, route }: Props) => {
  const vehicle = getVehicleById(route.params.vehicleId);

  if (!vehicle) {
    return null;
  }

  const driver = getDriverById(vehicle.driverId);
  const hasCubo = vehicle.id === cuboDevice.pairedVehicleId;
  const tone = statusTone[vehicle.status];
  const stats = [
    { label: 'Safety', value: vehicle.safetyScore, tone: metricColors.focus },
    { label: 'Focus', value: vehicle.focusScore, tone: metricColors.trips },
    { label: 'Alerts', value: driver?.alertsThisWeek ?? 0, tone: metricColors.alerts },
  ];

  return (
    <View style={styles.root}>
      <StackHeader title={vehicle.model} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard contentStyle={styles.header}>
          <View style={[styles.glyph, { backgroundColor: `${vehicle.accent}22` }]}>
            <FlatCarGlyph color={vehicle.accent} fill={palette.surfaceContainerLowest} />
          </View>
          <View style={styles.headerCopy}>
            <Text variant="titleLarge">{vehicle.name}</Text>
            <Text variant="bodyMedium" style={styles.muted}>
              {vehicle.plate} · {vehicle.cabinLabel}
            </Text>
            <Chip
              compact
              style={[styles.statusChip, { backgroundColor: tone.container }]}
              textStyle={[styles.chipText, { color: tone.onContainer }]}
            >
              {vehicle.status}
            </Chip>
          </View>
        </SurfaceCard>

        <View style={styles.stats}>
          {stats.map((s) => (
            <View key={s.label} style={[styles.stat, { backgroundColor: s.tone.soft }]}>
              <Text variant="headlineMedium" style={{ color: s.tone.onContainer }}>
                {s.value}
              </Text>
              <Text variant="labelLarge" style={styles.muted}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <Button
          mode="contained"
          icon="camera-outline"
          contentStyle={styles.ctaContent}
          onPress={() => navigation.navigate('DetectionLive', { vehicleId: vehicle.id })}
        >
          Start CUBO detection
        </Button>

        <SurfaceCard contentStyle={styles.cardPad}>
          <Text variant="titleMedium">Latest activity</Text>
          <Text variant="bodyMedium" style={[styles.muted, styles.activity]}>
            {vehicle.lastEvent}
          </Text>
          {hasCubo ? (
            <View style={styles.unit}>
              <View style={styles.unitImageWrap}>
                <Image source={cuboImages.mountSideCutout} style={styles.unitImage} resizeMode="contain" />
              </View>
              <View style={styles.unitCopy}>
                <Text variant="titleSmall">
                  {cuboDevice.name} {cuboDevice.serial}
                </Text>
                <Text variant="bodySmall" style={styles.muted}>
                  Installed · firmware {cuboDevice.firmware}
                </Text>
                <Text variant="labelMedium" style={{ color: metricColors.focus.accent }}>
                  {cuboDevice.connection} · synced {cuboDevice.lastSync}
                </Text>
              </View>
            </View>
          ) : null}
        </SurfaceCard>

        {driver ? (
          <SurfaceCard>
            <List.Item
              title={driver.name}
              description={`${driver.relation} · view driver report`}
              titleStyle={styles.listTitle}
              left={() => (
                <Avatar.Text
                  size={40}
                  label={driver.initials}
                  color={metricColors.headTurns.onContainer}
                  style={styles.avatar}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('DriverReports', { driverId: driver.id })}
            />
          </SurfaceCard>
        ) : null}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    padding: space.lg,
  },
  glyph: {
    width: 88,
    height: 88,
    borderRadius: shape.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginTop: space.sm,
  },
  chipText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
  },
  stats: {
    flexDirection: 'row',
    gap: space.md,
  },
  stat: {
    flex: 1,
    padding: space.lg,
    borderRadius: shape.tile,
  },
  ctaContent: {
    height: 52,
  },
  cardPad: {
    padding: space.xl,
  },
  activity: {
    marginTop: space.xs,
  },
  unit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    marginTop: space.lg,
  },
  unitImageWrap: {
    width: 64,
    height: 88,
    borderRadius: shape.tile,
    backgroundColor: palette.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitImage: {
    width: 48,
    height: 76,
  },
  unitCopy: {
    flex: 1,
    gap: 2,
  },
  listTitle: {
    fontFamily: fontFamilies.medium,
  },
  avatar: {
    marginLeft: space.lg,
    backgroundColor: metricColors.headTurns.container,
  },
  muted: {
    color: palette.onSurfaceVariant,
  },
});

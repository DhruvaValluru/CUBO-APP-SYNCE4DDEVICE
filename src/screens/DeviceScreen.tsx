import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Card, Layout, List, Text, Toggle } from '@ui-kitten/components';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { FadeInView, PulseDot, ScalePressable, nativeDriver } from '../components/Motion';
import { ImageOverlay } from '../components/kitten/ImageOverlay';
import { Setting } from '../components/kitten/Setting';
import { evaIcon } from '../components/kitten/icons';
import { cuboCapabilities, cuboDevice, cuboDeviceSettings, cuboGallery, cuboImages } from '../data/cuboDevice';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type GalleryItem = (typeof cuboGallery)[number];

const options = [
  { icon: 'video-outline', title: cuboDevice.stats[0].value },
  { icon: 'car-outline', title: `${cuboDevice.stats[1].value} drives` },
  { icon: 'wifi', title: cuboDevice.stats[2].value },
];

/**
 * Full-photo preview that fades/springs in over the screen. Rendered in-screen (not Kitten's Modal,
 * which centres on the browser window) so it stays inside the web phone frame.
 */
function PhotoPreview({ item, width, onClose }: { item: GalleryItem | null; width: number; onClose: () => void }) {
  const open = useRef(new Animated.Value(0)).current;
  // Keep the last item mounted while the close animation plays
  const [shown, setShown] = useState<GalleryItem | null>(item);

  useEffect(() => {
    if (item) {
      setShown(item);
      Animated.spring(open, { toValue: 1, friction: 8, tension: 80, useNativeDriver: nativeDriver }).start();
    } else {
      Animated.timing(open, { toValue: 0, duration: 180, useNativeDriver: nativeDriver }).start(({ finished }) => {
        if (finished) setShown(null);
      });
    }
  }, [item, open]);

  if (!shown) return null;

  const imageH = width * 1.15;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: open }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close photo" />
      </Animated.View>
      <View style={styles.previewCenter} pointerEvents="box-none">
        <Animated.View
          style={{
            opacity: open,
            transform: [
              { scale: open.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
              { translateY: open.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
            ],
          }}
        >
          <Layout level="1" style={[styles.previewCard, { width: width + 32 }]}>
            <Image
              source={shown.source}
              style={[styles.previewImage, { width, height: imageH }]}
              resizeMode={shown.key === 'device' ? 'contain' : 'cover'}
            />
            <Text category="h6" style={styles.previewTitle}>
              {shown.title}
            </Text>
            <Text appearance="hint">{shown.caption}</Text>
            <Button style={styles.previewClose} appearance="ghost" onPress={onClose}>
              CLOSE
            </Button>
          </Layout>
        </Animated.View>
      </View>
    </View>
  );
}

/**
 * CUBO hardware page — kittenTricks "Product Details 4" (ImageOverlay hero, overlapping filled
 * booking Card with absolute CTA, facility chips, option buttons, About, horizontal photo list)
 * followed by the "Settings" dashboard rows.
 */
export const DeviceScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width: windowWidth } = useWindowDimensions();
  const [settings, setSettings] = useState(cuboDeviceSettings);
  const [preview, setPreview] = useState<GalleryItem | null>(null);

  const toggleSetting = (key: string) =>
    setSettings((current) => current.map((s) => (s.key === key ? { ...s, enabled: !s.enabled } : s)));

  const renderImageItem = ({ item, index }: ListRenderItemInfo<GalleryItem>) => (
    <FadeInView delay={300 + index * 80} offset={0}>
      <ScalePressable onPress={() => setPreview(item)} accessibilityLabel={`Open ${item.title} photo`}>
        <Image
          style={[styles.imageItem, item.key === 'device' && styles.imageItemCutout]}
          source={item.source}
          resizeMode={item.key === 'device' ? 'contain' : 'cover'}
        />
      </ScalePressable>
    </FadeInView>
  );

  const renderBookingFooter = () => (
    <View>
      <Text category="s1">Detects</Text>
      <View style={styles.detailsList}>
        {cuboCapabilities.map((c) => (
          <Button key={c.label} style={styles.detailItem} appearance="outline" size="tiny">
            {c.label}
          </Button>
        ))}
      </View>
      <View style={styles.optionList}>
        {options.map((o) => (
          <Button
            key={o.icon}
            style={styles.optionItem}
            appearance="ghost"
            size="small"
            accessoryLeft={evaIcon(o.icon)}
          >
            {o.title}
          </Button>
        ))}
      </View>
    </View>
  );

  return (
    <Layout style={styles.root} level="2">
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <ImageOverlay style={styles.image} source={cuboImages.mountRear} resizeMode="cover" />
        <FadeInView delay={80} offset={24}>
          <Card style={styles.bookingCard} appearance="filled" footer={renderBookingFooter} accessible={false}>
            <Text style={styles.title} category="h6">
              {cuboDevice.name} driver monitor
            </Text>
            <Text style={styles.rentLabel} appearance="hint" category="p2">
              Paired to {cuboDevice.pairedVehicleLabel}
            </Text>
            <View style={styles.priceLabel}>
              <PulseDot color={colors.gaugeProgress} size={7} style={styles.statusDot} />
              <Text category="h6" status="primary">
                {cuboDevice.connection}
              </Text>
            </View>
            <Button
              style={styles.bookButton}
              onPress={() => navigation.navigate('DetectionLive', { vehicleId: cuboDevice.pairedVehicleId })}
            >
              LIVE CHECK
            </Button>
          </Card>
        </FadeInView>

        <Text style={styles.sectionLabel} category="s1">
          About
        </Text>
        <Text style={styles.description} appearance="hint">
          CUBO sits on an adjustable stand facing the driver. It tracks head pose with MediaPipe Face Mesh and spots
          phones with YOLOv8, then sends each trip&apos;s distraction events to this app. Firmware {cuboDevice.firmware}{' '}
          · {cuboDevice.serial}.
        </Text>

        <Text style={styles.sectionLabel} category="s1">
          Photos
        </Text>
        <List
          contentContainerStyle={styles.imagesList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={cuboGallery}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.key}
        />

        <Text style={[styles.sectionLabel, styles.settingsLabel]} category="s1">
          Device settings
        </Text>
        <Layout level="1">
          {settings.map((s) => (
            <Setting
              key={s.key}
              style={styles.setting}
              hint={s.label}
              description={s.description}
              onPress={() => toggleSetting(s.key)}
            >
              <Toggle checked={s.enabled} onChange={() => toggleSetting(s.key)} />
            </Setting>
          ))}
        </Layout>
      </ScrollView>

      <PhotoPreview item={preview} width={Math.min(280, windowWidth - 80)} onClose={() => setPreview(null)} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: '65%',
  },
  rentLabel: {
    marginTop: 24,
    width: '55%',
  },
  priceLabel: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    marginLeft: -7,
    marginRight: -1,
  },
  bookButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  settingsLabel: {
    marginTop: 24,
  },
  imagesList: {
    padding: 8,
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  imageItemCutout: {
    backgroundColor: '#E9EAEC',
  },
  setting: {
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(16, 20, 38, 0.8)',
  },
  previewCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  previewCard: {
    borderRadius: 4,
    padding: 16,
  },
  previewImage: {
    borderRadius: 4,
    backgroundColor: '#E9EAEC',
  },
  previewTitle: {
    marginTop: 16,
    marginBottom: 2,
  },
  previewClose: {
    marginTop: 8,
  },
});

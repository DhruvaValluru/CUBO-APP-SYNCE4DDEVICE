import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Button,
  Card,
  CheckBox,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FadeInView, PulseDot } from '../components/Motion';
import { SemiCircleGauge } from '../components/SemiCircleGauge';
import { ImageOverlay } from '../components/kitten/ImageOverlay';
import { ProfileSocial } from '../components/kitten/ProfileSocial';
import { evaIcon } from '../components/kitten/icons';
import { cuboDevice, cuboImages } from '../data/cuboDevice';
import { goalsMock, trendsMock } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

const PersonIcon = evaIcon('person-outline');
const CameraIcon = evaIcon('camera-outline');
const ShieldIcon = evaIcon('shield-outline');

const distractionBars = [6, 14, 10, 18, 8, 12, 16];
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function formatHeaderDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

/** Bar that grows from the baseline after `delay` ms. */
function GrowBar({ fraction, color, delay }: { fraction: number; color: string; delay: number }) {
  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animating a percentage height, which the native driver can't do
    const anim = Animated.timing(grow, {
      toValue: 1,
      duration: 650,
      delay,
      easing: Easing.out(Easing.back(1.4)),
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [delay, grow]);

  return (
    <Animated.View
      style={[
        styles.bar,
        {
          height: grow.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${Math.round(fraction * 100)}%`] }),
          backgroundColor: color,
        },
      ]}
    />
  );
}

/**
 * Dashboard built from kittenTricks "Trainings 1" (image-overlay hero card + hint section titles)
 * and "Trainings 2" (Cards with headers, ghost tiny stat buttons).
 */
export const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [goals, setGoals] = useState(goalsMock.map((label, i) => ({ label, done: i === 1 })));
  const maxBar = Math.max(...distractionBars, 1);
  const peakIndex = distractionBars.indexOf(maxBar);

  const renderCardHeader = (title: string, hint?: string) => (
    <View style={styles.cardHeader}>
      <Text category="h6">{title}</Text>
      {hint ? (
        <Text category="c1" appearance="hint">
          {hint}
        </Text>
      ) : null}
    </View>
  );

  return (
    <Layout style={styles.root} level="2">
      <SafeAreaView edges={['top']}>
        <TopNavigation
          alignment="center"
          title="Dashboard"
          subtitle={formatHeaderDate(new Date())}
          accessoryRight={() => (
            <TopNavigationAction icon={PersonIcon} onPress={() => navigation.navigate('Profile')} />
          )}
        />
      </SafeAreaView>
      <Divider />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle} appearance="hint">
          YOUR CUBO
        </Text>
        <FadeInView>
          <Card
            style={styles.deviceCard}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Device' })}
            accessibilityLabel="Open CUBO device"
          >
            <ImageOverlay style={styles.deviceImage} source={cuboImages.mountRear} resizeMode="cover">
              <View style={styles.deviceStatus}>
                <PulseDot color={colors.gaugeProgress} size={7} style={styles.deviceDot} />
                <Text category="s1" status="control">
                  {cuboDevice.connection.toUpperCase()}
                </Text>
              </View>
              <Text category="h3" status="control">
                {cuboDevice.pairedVehicleLabel}
              </Text>
              <Text category="c1" status="control">
                Synced {cuboDevice.lastSync} · {cuboDevice.serial}
              </Text>
              <Button
                style={styles.deviceButton}
                size="tiny"
                accessoryLeft={CameraIcon}
                onPress={() => navigation.navigate('DetectionLive', { vehicleId: cuboDevice.pairedVehicleId })}
              >
                LIVE CHECK
              </Button>
            </ImageOverlay>
          </Card>
        </FadeInView>

        <Text style={styles.headerTitle} appearance="hint">
          THIS WEEK
        </Text>
        <FadeInView delay={100}>
          <Card
            style={styles.item}
            header={() => renderCardHeader('Driver distraction score', 'Pablo · Toyota Prius')}
            footer={() => (
              <View style={styles.socials}>
                <ProfileSocial style={styles.social} hint="Trips" value="18" />
                <ProfileSocial style={styles.social} hint="Alerts" value="4" />
                <ProfileSocial style={styles.social} hint="Focus" value="94%" />
              </View>
            )}
          >
            <View style={styles.gauge}>
              <SemiCircleGauge score={85} size={240} strokeWidth={12} />
              <Text category="s1" status="primary">
                Low risk driver
              </Text>
            </View>
          </Card>
        </FadeInView>

        <FadeInView delay={180}>
          <Card style={styles.item} header={() => renderCardHeader('Distraction time', 'Seconds per day')}>
            <View style={styles.bars}>
              {distractionBars.map((h, i) => (
                <View key={i} style={styles.barColumn}>
                  <View style={styles.barTrack}>
                    <GrowBar
                      fraction={h / maxBar}
                      color={i === peakIndex ? colors.danger : colors.gaugeProgress}
                      delay={350 + i * 70}
                    />
                  </View>
                  <Text category="c2" appearance="hint">
                    {dayLabels[i]}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </FadeInView>

        <FadeInView delay={260}>
          <Card style={styles.item} header={() => renderCardHeader('Trends')}>
            {trendsMock.map((row, i) => (
              <View key={row.label} style={[styles.trendRow, i > 0 && styles.trendBorder]}>
                <Text category="p2">{row.label}</Text>
                <Button
                  style={styles.trendButton}
                  appearance="ghost"
                  size="tiny"
                  status={row.tone === 'good' ? 'success' : 'danger'}
                  accessoryLeft={evaIcon(row.trend === 'down' ? 'trending-down-outline' : 'trending-up-outline')}
                >
                  {row.value}
                </Button>
              </View>
            ))}
          </Card>
        </FadeInView>

        <FadeInView delay={340}>
          <Card style={styles.item} header={() => renderCardHeader('Goals')}>
            {goals.map((g) => (
              <CheckBox
                key={g.label}
                style={styles.goal}
                checked={g.done}
                onChange={(done) => setGoals((cur) => cur.map((x) => (x.label === g.label ? { ...x, done } : x)))}
              >
                {g.label}
              </CheckBox>
            ))}
          </Card>
        </FadeInView>

        <FadeInView delay={420}>
          <Card style={styles.item} status="primary">
            <Text category="h6">App focus block</Text>
            <Text appearance="hint" style={styles.focusText}>
              Silence distracting apps on the driver&apos;s phone while CUBO is monitoring.
            </Text>
            <Button
              appearance="outline"
              accessoryLeft={ShieldIcon}
              onPress={() => navigation.navigate('AppBlocking')}
            >
              CHOOSE APPS
            </Button>
          </Card>
        </FadeInView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
  headerTitle: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  deviceCard: {
    height: 200,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  deviceImage: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 4,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDot: {
    marginLeft: -7,
    marginRight: -1,
  },
  deviceButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    borderRadius: 16,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 2,
  },
  gauge: {
    alignItems: 'center',
    gap: 4,
  },
  socials: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  social: {
    flex: 1,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: 120,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  trendBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
  },
  trendButton: {
    paddingHorizontal: 0,
  },
  goal: {
    marginVertical: 8,
  },
  focusText: {
    marginTop: 4,
    marginBottom: 16,
  },
});

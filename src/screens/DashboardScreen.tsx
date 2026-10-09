import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Chip, Icon, List, ProgressBar, Text, TouchableRipple } from 'react-native-paper';

import { MetricTile } from '../components/ui/MetricTile';
import { ScoreRing } from '../components/ui/ScoreRing';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { cuboDevice, cuboImages } from '../data/cuboDevice';
import { goalsMock } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { fontFamilies, metricColors, palette, shape, space } from '../theme/material';

const distractionBars = [6, 14, 10, 18, 8, 12, 16];
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const goalProgress = [0.62, 0.88];

function formatHeaderDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

/** Today — Fitbit-style overview: hero ring, pastel metric tiles, weekly chart, goals, device. */
export const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const maxBar = Math.max(...distractionBars, 1);
  const peakIndex = distractionBars.indexOf(maxBar);
  const weekTotal = distractionBars.reduce((a, b) => a + b, 0);

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Today"
        subtitle={formatHeaderDate(new Date())}
        right={
          <TouchableRipple
            onPress={() => navigation.navigate('Profile')}
            borderless
            style={styles.avatarHit}
            accessibilityLabel="Open profile"
          >
            <Avatar.Text size={40} label="PA" style={styles.avatar} color={metricColors.headTurns.onContainer} />
          </TouchableRipple>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.chips}>
          <Chip
            icon={() => <View style={styles.liveDot} />}
            style={styles.chip}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Device' })}
          >
            {cuboDevice.name} · {cuboDevice.connection}
          </Chip>
        </View>

        <SurfaceCard contentStyle={styles.hero}>
          <View style={styles.heroHeader}>
            <Text variant="titleMedium">Distraction score</Text>
            <Button compact onPress={() => navigation.navigate('DriverReports', { driverId: 'pablo' })}>
              See report
            </Button>
          </View>
          <ScoreRing score={85} label="of 100" />
          <Text variant="bodyMedium" style={[styles.muted, styles.heroCaption]}>
            Low risk this week · 3 points better than last week
          </Text>
        </SurfaceCard>

        <View style={styles.grid}>
          <MetricTile metric="focus" icon="eye-outline" label="Focus" value="94" unit="%" caption="+2% vs last week" />
          <MetricTile metric="phone" icon="cellphone" label="Phone" value="6" unit="events" caption="2 more than usual" />
        </View>
        <View style={styles.grid}>
          <MetricTile metric="headTurns" icon="head-sync-outline" label="Head turns" value="19" unit="/ hr" caption="Down 4 / hr" />
          <MetricTile metric="trips" icon="car-outline" label="Trips" value="18" caption="142 mi driven" />
        </View>

        <SurfaceCard contentStyle={styles.cardPad}>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium">Distraction time</Text>
            <Text variant="bodyMedium" style={styles.muted}>
              {weekTotal}s this week
            </Text>
          </View>
          <View style={styles.bars}>
            {distractionBars.map((h, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${Math.round((h / maxBar) * 100)}%`,
                        backgroundColor: i === peakIndex ? metricColors.alerts.accent : palette.primary,
                      },
                    ]}
                  />
                </View>
                <Text variant="labelSmall" style={styles.muted}>
                  {dayLabels[i]}
                </Text>
              </View>
            ))}
          </View>
        </SurfaceCard>

        <SurfaceCard contentStyle={styles.cardPad}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Goals
          </Text>
          {goalsMock.map((g, i) => (
            <View key={g} style={styles.goal}>
              <View style={styles.goalRow}>
                <Text variant="bodyLarge" style={styles.goalLabel}>
                  {g}
                </Text>
                <Text variant="labelLarge" style={styles.muted}>
                  {Math.round(goalProgress[i] * 100)}%
                </Text>
              </View>
              <ProgressBar progress={goalProgress[i]} color={palette.primary} style={styles.progress} />
            </View>
          ))}
        </SurfaceCard>

        <SurfaceCard onPress={() => navigation.navigate('MainTabs', { screen: 'Device' })} accessibilityLabel="Open CUBO device">
          <View style={styles.device}>
            <View style={styles.deviceImageWrap}>
              <Image source={cuboImages.device} style={styles.deviceImage} resizeMode="contain" />
            </View>
            <View style={styles.deviceCopy}>
              <Text variant="titleMedium">
                {cuboDevice.name} · {cuboDevice.pairedVehicleLabel}
              </Text>
              <Text variant="bodyMedium" style={styles.muted}>
                Firmware {cuboDevice.firmware}
              </Text>
            </View>
            <Icon source="chevron-right" size={24} color={palette.onSurfaceVariant} />
          </View>
        </SurfaceCard>

        <SurfaceCard>
          <List.Item
            title="Focus block"
            description="Silence distracting apps while CUBO is monitoring"
            titleStyle={styles.listTitle}
            left={(props) => <List.Icon {...props} icon="bell-off-outline" color={metricColors.phone.accent} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('AppBlocking')}
          />
        </SurfaceCard>
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
  avatarHit: {
    borderRadius: 20,
  },
  avatar: {
    backgroundColor: metricColors.headTurns.container,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
  },
  chip: {
    backgroundColor: palette.surfaceContainerLowest,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginLeft: 4,
    backgroundColor: metricColors.focus.accent,
  },
  hero: {
    alignItems: 'center',
    gap: space.md,
    padding: space.xl,
    paddingTop: space.md,
  },
  heroHeader: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: -space.md,
  },
  heroCaption: {
    textAlign: 'center',
  },
  muted: {
    color: palette.onSurfaceVariant,
  },
  grid: {
    flexDirection: 'row',
    gap: space.md,
  },
  cardPad: {
    padding: space.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: space.lg,
  },
  cardTitle: {
    marginBottom: space.sm,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: space.md,
    height: 128,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: space.sm,
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    borderRadius: shape.pill,
    backgroundColor: palette.surfaceContainerLow,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: shape.pill,
    minHeight: 6,
  },
  goal: {
    marginTop: space.md,
    gap: space.sm,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: space.md,
  },
  goalLabel: {
    flex: 1,
  },
  progress: {
    height: 8,
    borderRadius: shape.pill,
    backgroundColor: palette.surfaceContainerHigh,
  },
  device: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    padding: space.lg,
  },
  deviceImageWrap: {
    width: 72,
    height: 72,
    borderRadius: shape.tile,
    backgroundColor: palette.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceImage: {
    width: 60,
    height: 40,
  },
  deviceCopy: {
    flex: 1,
    gap: 2,
  },
  listTitle: {
    fontFamily: fontFamilies.medium,
  },
});

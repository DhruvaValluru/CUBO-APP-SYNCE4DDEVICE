import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { GlassCard } from '../components/GlassCard';
import { evaIcon } from '../components/kitten/icons';
import { SemiCircleGauge } from '../components/SemiCircleGauge';
import {
  driverReportSnapshots,
  getDriverById,
  getPrimaryVehicleIdForDriver,
} from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'DriverReports'>;

export const DriverReportsScreen = ({ navigation, route }: Props) => {
  const { driverId } = route.params;
  const driver = getDriverById(driverId);
  const snap = driverReportSnapshots[driverId] ?? driverReportSnapshots.pablo;
  const vehicleId = getPrimaryVehicleIdForDriver(driverId);
  const maxBar = Math.max(...snap.distractionSeconds, 1);

  if (!driver) {
    return null;
  }

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']}>
        <TopNavigation
          alignment="center"
          title={driver.name}
          subtitle="Trip & distraction reports"
          accessoryLeft={() => <TopNavigationAction icon={evaIcon('arrow-ios-back')} onPress={() => navigation.goBack()} />}
        />
      </SafeAreaView>
      <Divider />
      <View style={styles.safe}>

        <GlassCard style={styles.hero}>
          <Text style={styles.cardKicker}>Driver distraction score</Text>
          <View style={styles.gaugeRow}>
            <SemiCircleGauge score={snap.score} size={240} strokeWidth={14} />
          </View>
          <Text style={styles.risk}>Weekly snapshot</Text>
        </GlassCard>

        <GlassCard style={styles.block}>
          <Text style={styles.blockTitle}>Distraction time (seconds)</Text>
          <View style={styles.bars}>
            {snap.distractionSeconds.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  { height: Math.max(12, (h / maxBar) * 72), backgroundColor: colors.accentLime },
                ]}
              />
            ))}
          </View>
        </GlassCard>

        <GlassCard style={styles.block}>
          <Text style={styles.blockTitle}>Summary</Text>
          <Text style={styles.line}>Trips this week: {snap.weeklyTrips}</Text>
          <Text style={styles.line}>Phone-use events: {snap.phoneEvents}</Text>
          <Text style={styles.lineMuted}>Scores are mock data for the prototype.</Text>
        </GlassCard>

        <Pressable
          style={styles.cta}
          onPress={() => navigation.navigate('DetectionLive', { vehicleId })}
        >
          <Ionicons name="scan" size={22} color={colors.background} />
          <Text style={styles.ctaText}>Open live camera (MediaPipe)</Text>
        </Pressable>

        <Text style={styles.hint}>
          Live view uses your device camera with a tracking frame — same flow as before, opened from this driver.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardKicker: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  gaugeRow: {
    alignItems: 'center',
    marginVertical: 4,
  },
  risk: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  block: {
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: 10,
  },
  blockTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
    height: 80,
    marginTop: spacing.sm,
  },
  bar: {
    flex: 1,
    borderRadius: radii.sm,
    maxWidth: 14,
  },
  line: {
    color: colors.text,
    fontSize: 15,
  },
  lineMuted: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 8,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.accentLime,
    paddingVertical: 16,
    borderRadius: radii.lg,
    marginTop: spacing.sm,
  },
  ctaText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

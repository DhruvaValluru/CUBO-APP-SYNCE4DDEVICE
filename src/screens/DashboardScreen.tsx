import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GlassCard } from '../components/GlassCard';
import { ScreenShell } from '../components/ScreenShell';
import { SemiCircleGauge } from '../components/SemiCircleGauge';
import { goalsMock, trendsMock } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/theme';

function formatHeaderDate(d: Date) {
  return d
    .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    .toUpperCase();
}

export const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const distractionBars = [6, 14, 10, 18, 8, 12, 16];
  const maxBar = Math.max(...distractionBars, 1);

  return (
    <ScreenShell>
      {/* ── Header ── */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.date}>{formatHeaderDate(new Date())}</Text>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
          </View>
        </Pressable>
      </View>

      {/* ── Focus block entry ── */}
      <Pressable onPress={() => navigation.navigate('AppBlocking')}>
        <GlassCard style={styles.focusRow}>
          <Ionicons name="flash-outline" size={16} color={colors.gaugeProgress} />
          <Text style={styles.focusLabel}>App focus block</Text>
          <Text style={styles.focusSub}>Pick apps · confirm</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
        </GlassCard>
      </Pressable>

      {/* ── Score card ── */}
      <GlassCard style={styles.scoreCard}>
        <View style={styles.scoreHeader}>
          <Text style={styles.cardLabel}>DRIVER DISTRACTION SCORE</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
        </View>
        <View style={styles.gaugeWrap}>
          <SemiCircleGauge score={85} size={260} strokeWidth={13} />
        </View>
        <Text style={styles.riskLabel}>Low Risk Driver</Text>
      </GlassCard>

      {/* ── Bottom row ── */}
      <View style={styles.rowTwo}>
        {/* Distraction time */}
        <GlassCard style={[styles.halfCard]}>
          <View style={styles.halfHeader}>
            <Text style={styles.cardLabel}>DISTRACTION TIME</Text>
            <Ionicons name="chevron-forward" size={12} color={colors.textTertiary} />
          </View>
          <View style={styles.bars}>
            {distractionBars.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    height: `${Math.round((h / maxBar) * 100)}%` as unknown as number,
                    minHeight: 4,
                    backgroundColor: i === distractionBars.indexOf(Math.max(...distractionBars))
                      ? colors.danger
                      : colors.gaugeProgress,
                    opacity: i === distractionBars.indexOf(Math.max(...distractionBars)) ? 1 : 0.55,
                  },
                ]}
              />
            ))}
          </View>
          <Text style={styles.barLabel}>sec / day</Text>
        </GlassCard>

        {/* Goals */}
        <GlassCard style={[styles.halfCard]}>
          <Text style={styles.cardLabel}>GOALS</Text>
          <View style={styles.goalsList}>
            {goalsMock.map((g) => (
              <View key={g} style={styles.goalRow}>
                <View style={styles.goalDot} />
                <Text style={styles.goalLine} numberOfLines={2}>{g}</Text>
              </View>
            ))}
          </View>
        </GlassCard>
      </View>

      {/* ── Trends ── */}
      <GlassCard style={styles.trendsCard}>
        <View style={styles.scoreHeader}>
          <Text style={styles.cardLabel}>TRENDS</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
        </View>
        {trendsMock.map((row, i) => (
          <View key={row.label} style={[styles.trendRow, i > 0 && styles.trendBorder]}>
            <Text style={styles.trendLabel}>{row.label}</Text>
            <Text
              style={[
                styles.trendValue,
                { color: row.tone === 'good' ? colors.gaugeProgress : colors.danger },
              ]}
            >
              {row.trend === 'down' ? '↓ ' : '↑ '}
              {row.value}
            </Text>
          </View>
        ))}
      </GlassCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  date: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  /* Focus block */
  focusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
  },
  focusLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  focusSub: {
    color: colors.textTertiary,
    fontSize: 12,
  },
  /* Score card */
  scoreCard: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xs,
  },
  gaugeWrap: {
    alignItems: 'center',
    width: '100%',
  },
  cardLabel: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.9,
  },
  riskLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  /* Bottom row */
  rowTwo: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfCard: {
    flex: 1,
    padding: spacing.md,
    minHeight: 140,
  },
  halfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginTop: spacing.sm,
  },
  bar: {
    flex: 1,
    borderRadius: 2,
  },
  barLabel: {
    color: colors.textTertiary,
    fontSize: 10,
    marginTop: 6,
    fontWeight: '500',
  },
  goalsList: {
    gap: 8,
    marginTop: spacing.sm,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  goalDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gaugeProgress,
    marginTop: 5,
    flexShrink: 0,
  },
  goalLine: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
  },
  /* Trends */
  trendsCard: {
    padding: spacing.md,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  trendBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  trendLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  trendValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});

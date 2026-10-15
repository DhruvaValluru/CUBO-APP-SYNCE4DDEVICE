import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CircularScoreRing } from '../components/CircularScoreRing';
import { FlatPersonAvatar } from '../components/FlatPersonAvatar';
import { GlassCard } from '../components/GlassCard';
import { GradientCard } from '../components/GradientCard';
import { ScreenShell } from '../components/ScreenShell';
import { SimpleLineChart } from '../components/SimpleLineChart';
import {
  bundledSafetyIndex,
  getDriverById,
  insuranceMonthLabels,
  monthlyPremiumUsd,
  projectedRenewalPremium,
} from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/theme';
import { font } from '../theme/typography';

type TrendKey = 'premium' | 'safety' | 'renewal';

const TRENDS: Record<TrendKey, { label: string; data: number[]; mode: 'currency' | 'index'; note: string }> = {
  premium: { label: 'Premium', data: monthlyPremiumUsd, mode: 'currency', note: 'Billed USD / month after CUBO safety adjustments' },
  safety: { label: 'Safety index', data: bundledSafetyIndex, mode: 'index', note: 'Composite of distraction score, phone events and trip completion (0–100)' },
  renewal: { label: 'Renewal', data: projectedRenewalPremium, mode: 'currency', note: 'Projected USD / month next term · model output, not a binding quote' },
};

const COVERAGE: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }[] = [
  { icon: 'car-sport-outline', label: 'Collision', value: 'Yes · ACV' },
  { icon: 'shield-checkmark-outline', label: 'Comprehensive', value: 'Yes · $250 ded.' },
  { icon: 'key-outline', label: 'Rental', value: '$40/day · 30 days' },
  { icon: 'construct-outline', label: 'Roadside', value: 'Included' },
];

const POLICY: { label: string; value: string }[] = [
  { label: 'Policy #', value: 'SF-88421-TX' },
  { label: 'Effective', value: 'Mar 12, 2025' },
  { label: 'Deductible', value: '$500 coll.' },
  { label: 'Miles / yr', value: '12,400 est.' },
];

export const InsuranceScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const pablo = getDriverById('pablo');
  const [trend, setTrend] = useState<TrendKey>('premium');
  const active = TRENDS[trend];

  const premiumNow = monthlyPremiumUsd[monthlyPremiumUsd.length - 1];
  const premiumStart = monthlyPremiumUsd[0];
  const premiumDrop = Math.round(((premiumStart - premiumNow) / premiumStart) * 100);

  return (
    <ScreenShell>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Insurance</Text>
          <Text style={styles.subtitle}>State Farm · Drive Safe & Save</Text>
        </View>
        <Pressable style={styles.avatarBtn} onPress={() => navigation.navigate('Profile')}>
          {pablo ? (
            <FlatPersonAvatar skin={pablo.skinTone} shirt={pablo.shirtColor} size={40} />
          ) : (
            <View style={styles.avatarFallback}>
              <Ionicons name="person" size={20} color={colors.text} />
            </View>
          )}
        </Pressable>
      </View>

      {/* ── Hero: score + what it's doing to the premium ── */}
      <GradientCard style={styles.hero}>
        <View style={styles.heroRow}>
          <CircularScoreRing score={85} size={96} strokeWidth={10} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>DISTRACTION SCORE</Text>
            <Text style={styles.heroTitle}>Low Risk Driver</Text>
            <View style={styles.heroStatRow}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>${premiumNow}</Text>
                <Text style={styles.heroStatLabel}>per month</Text>
              </View>
              <View style={styles.heroStat}>
                <Text style={[styles.heroStatValue, { color: colors.gaugeProgress }]}>↓{premiumDrop}%</Text>
                <Text style={styles.heroStatLabel}>since Jan</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.heroBadge}>
          <Ionicons name="sparkles" size={12} color={colors.gaugeProgress} />
          <Text style={styles.heroBadgeText}>18% safe-driver discount active · stacks after 30 days in the green</Text>
        </View>
      </GradientCard>

      {/* ── Policy ── */}
      <Text style={styles.section}>Policy</Text>
      <GlassCard style={styles.card}>
        <View style={styles.providerRow}>
          <View style={styles.sfMark}>
            <Text style={styles.sfText}>SF</Text>
          </View>
          <View style={styles.providerCopy}>
            <Text style={styles.providerName}>State Farm</Text>
            <Text style={styles.providerSub}>CUBO telemetry eligible · TX</Text>
          </View>
          <Pressable style={styles.moveBtn} hitSlop={8}>
            <Text style={styles.moveText}>Switch</Text>
            <Ionicons name="swap-vertical" size={14} color={colors.accentLime} />
          </Pressable>
        </View>
        <View style={styles.divider} />
        <View style={styles.kvGrid}>
          {POLICY.map((kv) => (
            <View key={kv.label} style={styles.kvCell}>
              <Text style={styles.kvLabel}>{kv.label}</Text>
              <Text style={styles.kvValue}>{kv.value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.fine}>
          Bodily injury $100k/$300k · Property damage $100k · Uninsured motorist $50k/$100k · PIP as required in TX.
        </Text>
      </GlassCard>

      {/* ── Trends: one chart, three series ── */}
      <Text style={styles.section}>Trends</Text>
      <GlassCard style={styles.card}>
        <View style={styles.segment}>
          {(Object.keys(TRENDS) as TrendKey[]).map((key) => {
            const on = key === trend;
            return (
              <Pressable key={key} onPress={() => setTrend(key)} style={[styles.segmentItem, on && styles.segmentItemOn]}>
                <Text style={[styles.segmentText, on && styles.segmentTextOn]}>{TRENDS[key].label}</Text>
              </Pressable>
            );
          })}
        </View>
        <SimpleLineChart
          data={active.data}
          labels={insuranceMonthLabels}
          width={300}
          height={140}
          lineColor={colors.gaugeProgress}
          autoSummary={active.mode}
          unit={active.note}
        />
      </GlassCard>

      {/* ── Coverage ── */}
      <Text style={styles.section}>Coverage</Text>
      <GlassCard style={styles.card}>
        {COVERAGE.map((c, i) => (
          <View key={c.label} style={[styles.coverageRow, i > 0 && styles.coverageRowBorder]}>
            <View style={styles.coverageIcon}>
              <Ionicons name={c.icon} size={16} color={colors.gaugeProgress} />
            </View>
            <Text style={styles.coverageLabel}>{c.label}</Text>
            <Text style={styles.coverageValue}>{c.value}</Text>
          </View>
        ))}
      </GlassCard>

      {/* ── Benefits ── */}
      <Text style={styles.section}>Benefits</Text>
      <Pressable style={styles.benefitsWrap}>
        <GradientCard variant="soft" style={styles.card}>
          <View style={styles.benefitsTop}>
            <Text style={styles.benefitsTitle}>Discounts stacking</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </View>
          <View style={styles.pills}>
            <Text style={styles.pill}>18% discount</Text>
            <Text style={styles.pill}>Save $40/mo</Text>
            <Text style={styles.pill}>Premiums −12%</Text>
          </View>
          <Text style={styles.fine}>Discounts stack when distraction scores stay in the green band for 30+ days.</Text>
        </GradientCard>
      </Pressable>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    ...font('600', 'heading'),
    letterSpacing: -0.3,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    ...font('500', 'body'),
    marginTop: 2,
  },
  avatarBtn: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: {
    color: colors.textSecondary,
    fontSize: 11,
    ...font('700', 'body'),
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    paddingHorizontal: 2,
  },
  card: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  hero: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  heroCopy: {
    flex: 1,
    gap: 4,
  },
  heroKicker: {
    color: colors.logoGreenMuted,
    fontSize: 10,
    ...font('700', 'body'),
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 17,
    ...font('700', 'heading'),
  },
  heroStatRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: 2,
  },
  heroStat: {
    gap: 1,
  },
  heroStatValue: {
    color: colors.text,
    fontSize: 17,
    ...font('700', 'heading'),
  },
  heroStatLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    ...font('500', 'body'),
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 255, 136, 0.4)',
    borderRadius: radii.md,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  heroBadgeText: {
    color: colors.gaugeProgress,
    fontSize: 11,
    ...font('600', 'body'),
    flex: 1,
  },

  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sfMark: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sfText: {
    color: '#FFF',
    ...font('900', 'body'),
    fontSize: 13,
  },
  providerCopy: {
    flex: 1,
  },
  providerName: {
    color: colors.text,
    fontSize: 16,
    ...font('700', 'heading'),
  },
  providerSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
  moveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moveText: {
    color: colors.accentLime,
    ...font('700', 'body'),
    fontSize: 13,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  kvGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.md,
  },
  kvCell: {
    width: '50%',
  },
  kvLabel: {
    color: colors.textTertiary,
    fontSize: 11,
    ...font('600', 'body'),
    marginBottom: 2,
  },
  kvValue: {
    color: colors.text,
    fontSize: 15,
    ...font('600', 'heading'),
  },
  fine: {
    color: colors.textTertiary,
    fontSize: 12,
    lineHeight: 17,
  },

  segment: {
    flexDirection: 'row',
    backgroundColor: colors.cardElevated,
    borderRadius: radii.pill,
    padding: 3,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  segmentItemOn: {
    backgroundColor: colors.gaugeProgress,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 12,
    ...font('600', 'body'),
  },
  segmentTextOn: {
    color: colors.background,
  },

  coverageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  coverageRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  coverageIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverageLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    ...font('500', 'body'),
  },
  coverageValue: {
    color: colors.text,
    fontSize: 14,
    ...font('600', 'heading'),
    textAlign: 'right',
  },

  benefitsWrap: {
    marginBottom: spacing.xl,
  },
  benefitsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  benefitsTitle: {
    color: colors.text,
    fontSize: 16,
    ...font('600', 'heading'),
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    color: colors.gaugeProgress,
    fontSize: 12,
    ...font('600', 'body'),
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 255, 136, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
  },
});

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CircularScoreRing } from '../components/CircularScoreRing';
import { FlatPersonAvatar } from '../components/FlatPersonAvatar';
import { GlassCard } from '../components/GlassCard';
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

export const InsuranceScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const pablo = getDriverById('pablo');

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.title}>Insurance</Text>
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

      <GlassCard style={styles.introCard}>
        <Text style={styles.introTitle}>What this is</Text>
        <Text style={styles.introBody}>
          CUBO links your driver safety data with your auto policy. Safer driving scores can unlock discounts,
          renewal previews, and clearer coverage details — all in one place. Below are live-style charts and
          policy facts (sample data for this prototype).
        </Text>
      </GlassCard>

      <GlassCard style={styles.policySnap}>
        <Text style={styles.snapTitle}>Policy snapshot</Text>
        <View style={styles.snapGrid}>
          <View style={styles.snapCell}>
            <Text style={styles.snapLabel}>Policy #</Text>
            <Text style={styles.snapValue}>SF-88421-TX</Text>
          </View>
          <View style={styles.snapCell}>
            <Text style={styles.snapLabel}>Effective</Text>
            <Text style={styles.snapValue}>Mar 12, 2025</Text>
          </View>
          <View style={styles.snapCell}>
            <Text style={styles.snapLabel}>Deductible</Text>
            <Text style={styles.snapValue}>$500 coll.</Text>
          </View>
          <View style={styles.snapCell}>
            <Text style={styles.snapLabel}>Miles / yr</Text>
            <Text style={styles.snapValue}>12,400 est.</Text>
          </View>
        </View>
      </GlassCard>

      <Text style={styles.sectionHeading}>Driver & score</Text>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        <GlassCard style={styles.driverCard}>
          <View style={styles.driverCardTop}>
            <View style={styles.driverMini}>
              {pablo ? <FlatPersonAvatar skin={pablo.skinTone} shirt={pablo.shirtColor} size={36} /> : null}
              <Text style={styles.driverTag}>Pablo: Low Risk Driver</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </View>
          <View style={styles.ringWrap}>
            <CircularScoreRing score={85} size={176} strokeWidth={14} />
          </View>
          <Text style={styles.ringCaption}>Driver Distraction Score</Text>
          <Text style={styles.ringDate}>6/7/25</Text>
        </GlassCard>
      </ScrollView>

      <View style={styles.planHeader}>
        <Text style={styles.sectionTitle}>Insurance Plan</Text>
        <Pressable style={styles.moveBtn}>
          <Text style={styles.moveText}>Move</Text>
          <Ionicons name="swap-vertical" size={16} color={colors.accentLime} />
        </Pressable>
      </View>
      <Text style={styles.caps}>CURRENT PLAN AND BENEFITS</Text>

      <GlassCard style={styles.providerCard}>
        <View style={styles.sfRow}>
          <View style={styles.sfMark}>
            <Text style={styles.sfText}>SF</Text>
          </View>
          <View style={styles.providerCopy}>
            <Text style={styles.providerName}>State Farm</Text>
            <Text style={styles.providerSub}>Drive Safe & Save · CUBO telemetry eligible</Text>
          </View>
        </View>
        <Text style={styles.detailLine}>
          Bodily injury $100k/$300k · Property damage $100k · Uninsured motorist $50k/$100k · Personal injury
          protection as required in TX.
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '85%' }]} />
        </View>
        <View style={styles.scaleRow}>
          <Text style={[styles.scaleMark, { color: colors.danger }]}>0</Text>
          <Text style={[styles.scaleMark, { color: colors.mustard }]}>70</Text>
          <Text style={[styles.scaleMark, { color: colors.gaugeProgress }]}>85</Text>
          <Text style={[styles.scaleMark, { color: colors.gaugeProgress }]}>100</Text>
        </View>
        <Text style={styles.scaleHint}>Safety score vs discount tier (mock)</Text>
      </GlassCard>

      <GlassCard style={styles.chartCard}>
        <SimpleLineChart
          title="Monthly premium (USD)"
          subtitle="Estimated billed amount after CUBO safety adjustments. Downward trend reflects fewer distraction alerts."
          data={monthlyPremiumUsd}
          labels={insuranceMonthLabels}
          width={320}
          height={150}
          lineColor={colors.gaugeProgress}
          autoSummary="currency"
          unit="Y-axis: dollars · X-axis: month"
        />
      </GlassCard>

      <GlassCard style={styles.chartCard}>
        <SimpleLineChart
          title="Bundled safety index"
          subtitle="Composite of distraction score, phone events, and trip completion. Higher is better for renewal quotes."
          data={bundledSafetyIndex}
          labels={insuranceMonthLabels}
          width={320}
          height={150}
          lineColor={colors.gaugeProgress}
          autoSummary="index"
          unit="Index 0–100"
        />
      </GlassCard>

      <GlassCard style={styles.chartCard}>
        <SimpleLineChart
          title="Renewal projection (USD/mo)"
          subtitle="Forecast if current driving habits continue through next policy term."
          data={projectedRenewalPremium}
          labels={insuranceMonthLabels}
          width={320}
          height={150}
          lineColor={colors.gaugeProgress}
          autoSummary="currency"
          unit="Model output — not a binding quote"
        />
      </GlassCard>

      <GlassCard style={styles.tableCard}>
        <Text style={styles.tableTitle}>Coverage checklist</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Collision</Text>
          <Text style={styles.tableVal}>Yes · ACV</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Comprehensive</Text>
          <Text style={styles.tableVal}>Yes · $250 ded.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Rental</Text>
          <Text style={styles.tableVal}>$40/day · 30 days max</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Roadside</Text>
          <Text style={styles.tableVal}>Included</Text>
        </View>
      </GlassCard>

      <Pressable style={styles.benefitsCard}>
        <GlassCard style={styles.benefitsInner}>
          <View style={styles.benefitsTop}>
            <Text style={styles.benefitsTitle}>Benefits</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </View>
          <View style={styles.pills}>
            <Text style={styles.pill}>18% Discount</Text>
            <Text style={styles.pill}>Save $40/mo</Text>
            <Text style={styles.pill}>Decrease Premiums 12%</Text>
          </View>
          <Text style={styles.benefitsFoot}>
            Discounts stack when distraction scores stay in the green band for 30+ days.
          </Text>
        </GlassCard>
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
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
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
  introCard: {
    padding: spacing.lg,
    gap: 10,
    marginBottom: spacing.md,
  },
  introTitle: {
    color: colors.gaugeProgress,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  introBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  policySnap: {
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  snapTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  snapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  snapCell: {
    width: '47%',
    backgroundColor: colors.cardElevated,
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  snapLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  snapValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  sectionHeading: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  carousel: {
    paddingRight: spacing.lg,
    marginBottom: spacing.lg,
  },
  driverCard: {
    width: 300,
    padding: spacing.lg,
    marginRight: spacing.md,
  },
  driverCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  driverMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  driverTag: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  ringWrap: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  ringCaption: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  ringDate: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  moveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moveText: {
    color: colors.accentLime,
    fontWeight: '700',
    fontSize: 15,
  },
  caps: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  providerCard: {
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  providerCopy: {
    flex: 1,
  },
  sfMark: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sfText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 14,
  },
  providerName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  providerSub: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  detailLine: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.cardElevated,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.gaugeProgress,
    borderRadius: 5,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleMark: {
    fontSize: 12,
    fontWeight: '700',
  },
  scaleHint: {
    color: colors.textTertiary,
    fontSize: 11,
  },
  chartCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  tableCard: {
    padding: spacing.lg,
    gap: 12,
    marginBottom: spacing.md,
  },
  tableTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tableKey: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  tableVal: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '55%',
    textAlign: 'right',
  },
  benefitsCard: {
    marginBottom: spacing.xl,
  },
  benefitsInner: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  benefitsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  benefitsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: colors.cardElevated,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  benefitsFoot: {
    color: colors.textTertiary,
    fontSize: 12,
    lineHeight: 18,
  },
});

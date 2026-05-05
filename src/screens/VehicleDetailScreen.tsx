import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DriverProfileCard } from '../components/DriverProfileCard';
import { FlatCarGlyph } from '../components/FlatCarGlyph';
import { GlassCard } from '../components/GlassCard';
import { ScreenShell } from '../components/ScreenShell';
import { getDriverById, getVehicleById } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetail'>;

export const VehicleDetailScreen = ({ navigation, route }: Props) => {
  const vehicle = getVehicleById(route.params.vehicleId);

  if (!vehicle) {
    return null;
  }

  const driver = getDriverById(vehicle.driverId);

  return (
    <ScreenShell>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={18} color={colors.text} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroKicker}>{vehicle.plate}</Text>
          <Text style={styles.heroTitle}>{vehicle.model}</Text>
          <Text style={styles.heroText}>{vehicle.lastEvent}</Text>
        </View>
        <View style={[styles.heroVisual, { backgroundColor: `${vehicle.accent}28` }]}>
          <FlatCarGlyph color={vehicle.accent} />
        </View>
      </View>

      {driver ? <DriverProfileCard driver={driver} /> : null}

      <GlassCard style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Safety summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryLabel}>Monitoring</Text>
            <Text style={styles.summaryValue}>{vehicle.status}</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryLabel}>Safety score</Text>
            <Text style={styles.summaryValue}>{vehicle.safetyScore}</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryLabel}>Focus score</Text>
            <Text style={styles.summaryValue}>{vehicle.focusScore}</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryLabel}>System state</Text>
            <Text style={styles.summaryValue}>Ready</Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard style={styles.activationCard}>
        <Text style={styles.summaryTitle}>Activate CUBO Detection</Text>
        <Text style={styles.activationText}>
          Launch the live camera monitoring experience and simulate MediaPipe-style face tracking for this driver.
        </Text>

        <Pressable style={styles.activationButton} onPress={() => navigation.navigate('DetectionLive', { vehicleId: vehicle.id })}>
          <Text style={styles.activationButtonText}>Activate CUBO Detection</Text>
          <Ionicons name="scan" size={18} color={colors.background} />
        </Pressable>
        <Pressable style={styles.reportsLink} onPress={() => navigation.navigate('DriverReports', { driverId: vehicle.driverId })}>
          <Text style={styles.reportsLinkText}>View driver reports</Text>
          <Ionicons name="document-text-outline" size={18} color={colors.accentLime} />
        </Pressable>
      </GlassCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.black06,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  backText: {
    color: colors.text,
    fontWeight: '600',
  },
  hero: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCopy: {
    flex: 1,
  },
  heroKicker: {
    color: colors.accentLime,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  heroText: {
    color: colors.textMuted,
    marginTop: 10,
    lineHeight: 22,
  },
  heroVisual: {
    width: 110,
    height: 110,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.65 }],
  },
  summaryCard: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  summaryStat: {
    width: '48%',
    borderRadius: radii.md,
    backgroundColor: colors.black06,
    padding: spacing.md,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 8,
  },
  activationCard: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  activationText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  activationButton: {
    backgroundColor: colors.accentLime,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  activationButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
  reportsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  reportsLinkText: {
    color: colors.accentLime,
    fontSize: 15,
    fontWeight: '700',
  },
});

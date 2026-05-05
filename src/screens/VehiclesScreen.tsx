import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { OtherDriverRow } from '../components/OtherDriverRow';
import { ShowcaseVehicleCard } from '../components/ShowcaseVehicleCard';
import { ScreenShell } from '../components/ScreenShell';
import { getDriverById, otherDriversList, pabloShowcaseVehicles } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/theme';

export const VehiclesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScreenShell>
      <Text style={styles.title}>Vehicles</Text>

      <Text style={styles.sectionLabel}>Pablo&apos;s Vehicles</Text>
      {pabloShowcaseVehicles.map((v) => (
        <ShowcaseVehicleCard
          key={v.id}
          item={v}
          onPress={() => navigation.navigate('VehicleDetail', { vehicleId: v.linkedVehicleId })}
        />
      ))}

      <Text style={[styles.sectionLabel, styles.sectionSpaced]}>Other Drivers</Text>
      {otherDriversList.map((row) => {
        const d = getDriverById(row.driverId);
        if (!d) {
          return null;
        }
        return (
          <OtherDriverRow
            key={row.driverId}
            driver={d}
            vehicleLabel={row.vehicleLabel}
            onPress={() => navigation.navigate('DriverReports', { driverId: row.driverId })}
          />
        );
      })}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: spacing.md,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  sectionSpaced: {
    marginTop: spacing.md,
  },
});

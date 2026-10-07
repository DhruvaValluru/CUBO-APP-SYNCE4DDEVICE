import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Fragment } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Chip, Divider, Icon, List, Text } from 'react-native-paper';

import { ScreenHeader } from '../components/ui/ScreenHeader';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { getDriverById, otherDriversList, pabloShowcaseVehicles } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { fontFamilies, metricColors, palette, shape, space } from '../theme/material';

const CAR_IMAGES = {
  prius: require('../../assets/car-prius.png'),
  sienna: require('../../assets/car-sienna.png'),
} as const;

/** Exact background baked into each car PNG, so the tile and artwork read as one */
const CAR_BACKDROP = {
  prius: '#01CC3C',
  sienna: '#D2B43A',
} as const;

const avatarTones = [metricColors.trips, metricColors.headTurns, metricColors.phone, metricColors.focus];

/** Vehicles — the owner's cars as cards, then other drivers as a list. */
export const VehiclesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.root}>
      <ScreenHeader title="Vehicles" subtitle="Pablo's fleet" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {pabloShowcaseVehicles.map((item) => {
          const low = item.risk === 'low';
          return (
            <SurfaceCard
              key={item.id}
              onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item.linkedVehicleId })}
              accessibilityLabel={`Open ${item.model}`}
            >
              <View style={styles.vehicle}>
                <View
                  style={[styles.carTile, { backgroundColor: item.carKey ? CAR_BACKDROP[item.carKey] : item.tileColor }]}
                >
                  {item.carKey ? (
                    <Image source={CAR_IMAGES[item.carKey]} style={styles.carImage} resizeMode="contain" />
                  ) : null}
                </View>
                <View style={styles.vehicleCopy}>
                  <Text variant="titleMedium">{item.model}</Text>
                  <Text variant="bodyMedium" style={styles.muted}>
                    Last trip {item.time}
                  </Text>
                  <View style={styles.vehicleMeta}>
                    <Chip
                      compact
                      style={{ backgroundColor: low ? metricColors.focus.container : metricColors.phone.container }}
                      textStyle={[styles.chipText, { color: low ? metricColors.focus.onContainer : metricColors.phone.onContainer }]}
                    >
                      {low ? 'Low risk' : 'Medium risk'}
                    </Chip>
                    <View style={styles.rating}>
                      <Icon source="star" size={16} color="#E8A317" />
                      <Text variant="labelLarge">{item.stars}</Text>
                    </View>
                  </View>
                </View>
                <Icon source="chevron-right" size={24} color={palette.onSurfaceVariant} />
              </View>
            </SurfaceCard>
          );
        })}

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Other drivers
        </Text>
        <SurfaceCard>
          {otherDriversList.map((row, i) => {
            const d = getDriverById(row.driverId);
            if (!d) return null;
            const tone = avatarTones[i % avatarTones.length];
            return (
              <Fragment key={row.driverId}>
                {i > 0 ? <Divider style={styles.divider} /> : null}
                <List.Item
                  title={d.name}
                  description={`${d.relation} · ${row.vehicleLabel}`}
                  titleStyle={styles.listTitle}
                  left={() => (
                    <Avatar.Text
                      size={40}
                      label={d.initials}
                      color={tone.onContainer}
                      style={[styles.avatar, { backgroundColor: tone.container }]}
                    />
                  )}
                  right={() => (
                    <View style={styles.rowRight}>
                      <Text variant="labelMedium" style={d.alertsThisWeek ? styles.alert : styles.muted}>
                        {d.alertsThisWeek === 0
                          ? 'No alerts'
                          : `${d.alertsThisWeek} alert${d.alertsThisWeek > 1 ? 's' : ''}`}
                      </Text>
                      <Icon source="chevron-right" size={24} color={palette.onSurfaceVariant} />
                    </View>
                  )}
                  onPress={() => navigation.navigate('DriverReports', { driverId: row.driverId })}
                />
              </Fragment>
            );
          })}
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
  vehicle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    padding: space.lg,
  },
  carTile: {
    width: 88,
    height: 88,
    borderRadius: shape.tile,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  carImage: {
    width: 80,
    height: 76,
  },
  vehicleCopy: {
    flex: 1,
    gap: 2,
  },
  vehicleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    marginTop: space.sm,
  },
  chipText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sectionTitle: {
    marginTop: space.md,
  },
  divider: {
    marginHorizontal: space.lg,
  },
  listTitle: {
    fontFamily: fontFamilies.medium,
  },
  avatar: {
    marginLeft: space.lg,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  muted: {
    color: palette.onSurfaceVariant,
  },
  alert: {
    color: metricColors.alerts.accent,
  },
});

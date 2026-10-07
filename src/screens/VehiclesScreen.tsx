import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Card, Divider, Layout, List, ListItem, Text, TopNavigation } from '@ui-kitten/components';
import { Image, ListRenderItemInfo, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatPersonAvatar } from '../components/FlatPersonAvatar';
import { FadeInView } from '../components/Motion';
import { evaIcon } from '../components/kitten/icons';
import { getDriverById, otherDriversList, pabloShowcaseVehicles } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

const CAR_IMAGES = {
  prius: require('../../assets/car-prius.png'),
  sienna: require('../../assets/car-sienna.png'),
} as const;

/** Exact background baked into each car PNG, so the header and artwork blend into one banner */
const CAR_BACKDROP = {
  prius: '#01CC3C',
  sienna: '#D2B43A',
} as const;

const ClockIcon = evaIcon('clock-outline');
const StarIcon = evaIcon('star');
const ChevronIcon = evaIcon('chevron-right-outline');

type ShowcaseItem = (typeof pabloShowcaseVehicles)[number];

/**
 * Vehicles — kittenTricks "Trainings 2" card list (image header + h-title + ghost tiny stat buttons)
 * and a ListItem section for the other drivers.
 */
export const VehiclesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItemHeader = (item: ShowcaseItem) => (
    <View style={[styles.itemHeader, { backgroundColor: item.carKey ? CAR_BACKDROP[item.carKey] : item.tileColor }]}>
      {item.carKey ? <Image source={CAR_IMAGES[item.carKey]} style={styles.carImage} resizeMode="contain" /> : null}
    </View>
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<ShowcaseItem>) => (
    <FadeInView delay={index * 90}>
      <Card
        style={styles.item}
        header={() => renderItemHeader(item)}
        onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item.linkedVehicleId })}
      >
        <Text category="h5">{item.model}</Text>
        <View style={styles.itemFooter}>
          <Button style={styles.activityButton} appearance="ghost" size="tiny" accessoryLeft={ClockIcon}>
            {item.time}
          </Button>
          <Button
            style={styles.activityButton}
            appearance="ghost"
            size="tiny"
            status="warning"
            accessoryLeft={StarIcon}
          >
            {`${item.stars} / 5`}
          </Button>
          <Button
            style={styles.activityButton}
            appearance="ghost"
            size="tiny"
            status={item.risk === 'low' ? 'success' : 'danger'}
          >
            {item.risk === 'low' ? 'LOW RISK' : 'MID RISK'}
          </Button>
        </View>
      </Card>
    </FadeInView>
  );

  return (
    <Layout style={styles.root} level="2">
      <SafeAreaView edges={['top']}>
        <TopNavigation alignment="center" title="Vehicles" subtitle="Pablo's fleet" />
      </SafeAreaView>
      <Divider />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <List
          style={styles.list}
          scrollEnabled={false}
          data={pabloShowcaseVehicles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Text style={styles.headerTitle} appearance="hint">
          OTHER DRIVERS
        </Text>
        <FadeInView delay={250}>
          <Layout level="1">
            {otherDriversList.map((row) => {
              const d = getDriverById(row.driverId);
              if (!d) return null;
              return (
                <View key={row.driverId}>
                  <ListItem
                    title={d.name}
                    description={`${d.relation} · ${row.vehicleLabel}`}
                    accessoryLeft={() => <FlatPersonAvatar skin={d.skinTone} shirt={d.shirtColor} size={40} />}
                    accessoryRight={(props) => (
                      <View style={styles.rowRight}>
                        <Text category="c1" appearance="hint">
                          {d.alertsThisWeek === 0 ? 'No alerts' : `${d.alertsThisWeek} alert${d.alertsThisWeek > 1 ? 's' : ''}`}
                        </Text>
                        {ChevronIcon(props)}
                      </View>
                    )}
                    onPress={() => navigation.navigate('DriverReports', { driverId: row.driverId })}
                  />
                  <Divider />
                </View>
              );
            })}
          </Layout>
        </FadeInView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  list: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  item: {
    borderRadius: 0,
    marginVertical: 8,
  },
  itemHeader: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carImage: {
    width: 88,
    height: 84,
  },
  itemFooter: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: -4,
    gap: 12,
  },
  activityButton: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  headerTitle: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

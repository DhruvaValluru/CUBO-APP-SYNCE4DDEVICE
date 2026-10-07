import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Divider,
  Layout,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatCarGlyph } from '../components/FlatCarGlyph';
import { FlatPersonAvatar } from '../components/FlatPersonAvatar';
import { FadeInView } from '../components/Motion';
import { ProfileSocial } from '../components/kitten/ProfileSocial';
import { evaIcon } from '../components/kitten/icons';
import { cuboDevice, cuboImages } from '../data/cuboDevice';
import { getDriverById, getVehicleById } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetail'>;

const BackIcon = evaIcon('arrow-ios-back');
const ScanIcon = evaIcon('camera-outline');
const ReportIcon = evaIcon('file-text-outline');
const ChevronIcon = evaIcon('chevron-right-outline');

const statusTone = { Live: 'success', Ready: 'info', 'Monitoring Off': 'basic' } as const;

/**
 * Vehicle detail — kittenTricks "Product Details 1" (image + details header, category chips,
 * full-width primary CTA, level-2 "About" block) with the vehicle's installed CUBO unit.
 */
export const VehicleDetailScreen = ({ navigation, route }: Props) => {
  const vehicle = getVehicleById(route.params.vehicleId);

  if (!vehicle) {
    return null;
  }

  const driver = getDriverById(vehicle.driverId);
  const hasCubo = vehicle.id === cuboDevice.pairedVehicleId;

  return (
    <Layout style={styles.root} level="1">
      <SafeAreaView edges={['top']}>
        <TopNavigation
          alignment="center"
          title={vehicle.model}
          subtitle={vehicle.plate}
          accessoryLeft={() => <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />}
        />
      </SafeAreaView>
      <Divider />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FadeInView style={styles.header}>
          <Layout level="3" style={styles.productImage}>
            <FlatCarGlyph color={vehicle.accent} />
          </Layout>
          <View style={styles.detailsContainer}>
            <Text category="s1">{vehicle.name}</Text>
            <Text style={styles.authorLabel} appearance="hint" category="c1">
              {`Driver: ${driver?.name ?? 'Unassigned'}`}
            </Text>
            <View style={styles.categoryContainer}>
              <Button style={styles.categoryItem} size="tiny" status={statusTone[vehicle.status]}>
                {vehicle.status.toUpperCase()}
              </Button>
            </View>
            <Text appearance="hint" category="c1">
              {vehicle.cabinLabel}
            </Text>
          </View>
        </FadeInView>

        <FadeInView delay={80} style={styles.socials}>
          <ProfileSocial style={styles.social} hint="Safety" value={`${vehicle.safetyScore}`} />
          <ProfileSocial style={styles.social} hint="Focus" value={`${vehicle.focusScore}`} />
          <ProfileSocial style={styles.social} hint="Alerts" value={`${driver?.alertsThisWeek ?? 0}`} />
        </FadeInView>

        <FadeInView delay={140}>
          <Button
            style={styles.buyButton}
            accessoryLeft={ScanIcon}
            onPress={() => navigation.navigate('DetectionLive', { vehicleId: vehicle.id })}
          >
            ACTIVATE CUBO DETECTION
          </Button>
        </FadeInView>

        <FadeInView delay={200}>
          <Layout style={styles.descriptionContainer} level="2">
            <Text style={styles.aboutLabel} category="s1">
              Latest activity
            </Text>
            <Text appearance="hint">{vehicle.lastEvent}</Text>

            {hasCubo ? (
              <View style={styles.unitRow}>
                <Image source={cuboImages.mountSide} style={styles.unitImage} resizeMode="cover" />
                <View style={styles.unitCopy}>
                  <Text category="s2">
                    {cuboDevice.name} {cuboDevice.serial}
                  </Text>
                  <Text appearance="hint" category="c1">
                    Installed · firmware {cuboDevice.firmware}
                  </Text>
                  <Text status="primary" category="c1">
                    {cuboDevice.connection} · synced {cuboDevice.lastSync}
                  </Text>
                </View>
              </View>
            ) : null}
          </Layout>
        </FadeInView>

        {driver ? (
          <FadeInView delay={260}>
            <ListItem
              title={driver.name}
              description={`${driver.relation} · driver reports`}
              accessoryLeft={() => <FlatPersonAvatar skin={driver.skinTone} shirt={driver.shirtColor} size={40} />}
              accessoryRight={ChevronIcon}
              onPress={() => navigation.navigate('DriverReports', { driverId: driver.id })}
            />
            <Divider />
            <Button
              style={styles.reportsButton}
              appearance="ghost"
              accessoryLeft={ReportIcon}
              onPress={() => navigation.navigate('DriverReports', { driverId: driver.id })}
            >
              VIEW DRIVER REPORTS
            </Button>
          </FadeInView>
        ) : null}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 16,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorLabel: {
    marginVertical: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    marginHorizontal: -4,
  },
  categoryItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  socials: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  social: {
    flex: 1,
  },
  buyButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  aboutLabel: {
    marginBottom: 16,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 16,
  },
  unitImage: {
    width: 72,
    height: 96,
    borderRadius: 4,
  },
  unitCopy: {
    flex: 1,
    gap: 2,
  },
  reportsButton: {
    marginVertical: 8,
  },
});

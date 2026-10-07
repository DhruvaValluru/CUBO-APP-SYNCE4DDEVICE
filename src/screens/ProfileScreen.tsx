import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Divider,
  Layout,
  ListItem,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatPersonAvatar } from '../components/FlatPersonAvatar';
import { FadeInView } from '../components/Motion';
import { ProfileSocial } from '../components/kitten/ProfileSocial';
import { Setting } from '../components/kitten/Setting';
import { evaIcon } from '../components/kitten/icons';
import { drivers, getDriverById, profileSettings, vehicles } from '../data/mockData';

const BackIcon = evaIcon('arrow-ios-back');
const PeopleIcon = evaIcon('people-outline');

/**
 * Owner profile — kittenTricks "Profile 1" header (avatar, name, location, socials, primary
 * button) followed by "Settings" toggle rows and a ListItem list of linked drivers.
 */
export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState(profileSettings);
  const owner = getDriverById('pablo') ?? drivers[0];

  const toggle = (label: string) =>
    setSettings((current) => current.map((s) => (s.label === label ? { ...s, enabled: !s.enabled } : s)));

  return (
    <Layout style={styles.root} level="2">
      <SafeAreaView edges={['top']}>
        <TopNavigation
          alignment="center"
          title="Profile"
          accessoryLeft={() => <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />}
        />
      </SafeAreaView>
      <Divider />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FadeInView>
          <Layout style={styles.header} level="1">
            <View style={styles.profileAvatar}>
              <FlatPersonAvatar skin={owner.skinTone} shirt={owner.shirtColor} size={88} />
            </View>
            <View style={styles.profileDetailsContainer}>
              <Text category="h4">{owner.name}</Text>
              <Text appearance="hint" category="s1">
                {owner.relation} · {owner.location}
              </Text>
              <View style={styles.profileSocialsContainer}>
                <ProfileSocial style={styles.profileSocialContainer} hint="Drivers" value={`${drivers.length}`} />
                <ProfileSocial style={styles.profileSocialContainer} hint="Vehicles" value={`${vehicles.length}`} />
                <ProfileSocial style={styles.profileSocialContainer} hint="Alerts" value={`${owner.alertsThisWeek}`} />
              </View>
              <Button style={styles.followButton} accessoryLeft={PeopleIcon}>
                INVITE
              </Button>
            </View>
          </Layout>
        </FadeInView>

        <Text style={styles.sectionLabel} appearance="hint">
          NOTIFICATIONS
        </Text>
        <FadeInView delay={120}>
          <Layout level="1">
            {settings.map((s) => (
              <Setting
                key={s.label}
                style={styles.setting}
                hint={s.label}
                description={s.description}
                onPress={() => toggle(s.label)}
              >
                <Toggle checked={s.enabled} onChange={() => toggle(s.label)} />
              </Setting>
            ))}
          </Layout>
        </FadeInView>

        <Text style={styles.sectionLabel} appearance="hint">
          LINKED DRIVERS
        </Text>
        <FadeInView delay={220}>
          <Layout level="1">
            {drivers
              .filter((d) => d.id !== owner.id)
              .slice(0, 4)
              .map((d) => (
                <View key={d.id}>
                  <ListItem
                    title={d.name}
                    description={`${d.relation} · ${d.location}`}
                    accessoryLeft={() => <FlatPersonAvatar skin={d.skinTone} shirt={d.shirtColor} size={40} />}
                    accessoryRight={() => (
                      <Text category="c1" status="success">
                        READY
                      </Text>
                    )}
                  />
                  <Divider />
                </View>
              ))}
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
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileSocialsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  profileSocialContainer: {
    flex: 1,
  },
  followButton: {
    marginVertical: 16,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  setting: {
    padding: 16,
  },
});

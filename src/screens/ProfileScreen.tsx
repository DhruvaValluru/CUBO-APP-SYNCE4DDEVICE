import { useNavigation } from '@react-navigation/native';
import { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, List, Switch, Text } from 'react-native-paper';

import { StackHeader } from '../components/ui/StackHeader';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { drivers, getDriverById, profileSettings, vehicles } from '../data/mockData';
import { fontFamilies, metricColors, palette, space } from '../theme/material';

const avatarTones = [metricColors.trips, metricColors.focus, metricColors.phone, metricColors.alerts];

/** Profile — owner summary, notification switches and linked drivers (Fitbit "You" tab style). */
export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState(profileSettings);
  const owner = getDriverById('pablo') ?? drivers[0];

  const toggle = (label: string) =>
    setSettings((current) => current.map((s) => (s.label === label ? { ...s, enabled: !s.enabled } : s)));

  const stats = [
    { label: 'Drivers', value: drivers.length },
    { label: 'Vehicles', value: vehicles.length },
    { label: 'Alerts this week', value: owner.alertsThisWeek },
  ];

  return (
    <View style={styles.root}>
      <StackHeader title="You" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.identity}>
          <Avatar.Text size={88} label={owner.initials} color={metricColors.headTurns.onContainer} style={styles.avatarLarge} />
          <Text variant="headlineMedium">{owner.name}</Text>
          <Text variant="bodyLarge" style={styles.muted}>
            {owner.relation} · {owner.location}
          </Text>
        </View>

        <SurfaceCard contentStyle={styles.stats}>
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 ? <View style={styles.statDivider} /> : null}
              <View style={styles.stat}>
                <Text variant="headlineSmall">{s.value}</Text>
                <Text variant="bodySmall" style={styles.muted}>
                  {s.label}
                </Text>
              </View>
            </Fragment>
          ))}
        </SurfaceCard>

        <Button mode="contained-tonal" icon="account-plus-outline">
          Invite a driver
        </Button>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Notifications
        </Text>
        <SurfaceCard>
          {settings.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 ? <Divider style={styles.divider} /> : null}
              <List.Item
                title={s.label}
                description={s.description}
                titleStyle={styles.listTitle}
                onPress={() => toggle(s.label)}
                right={() => <Switch value={s.enabled} onValueChange={() => toggle(s.label)} />}
              />
            </Fragment>
          ))}
        </SurfaceCard>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Linked drivers
        </Text>
        <SurfaceCard>
          {drivers
            .filter((d) => d.id !== owner.id)
            .slice(0, 4)
            .map((d, i) => {
              const tone = avatarTones[i % avatarTones.length];
              return (
                <Fragment key={d.id}>
                  {i > 0 ? <Divider style={styles.divider} /> : null}
                  <List.Item
                    title={d.name}
                    description={`${d.relation} · ${d.location}`}
                    titleStyle={styles.listTitle}
                    left={() => (
                      <Avatar.Text
                        size={40}
                        label={d.initials}
                        color={tone.onContainer}
                        style={[styles.avatar, { backgroundColor: tone.container }]}
                      />
                    )}
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
  identity: {
    alignItems: 'center',
    gap: 2,
    paddingVertical: space.lg,
  },
  avatarLarge: {
    marginBottom: space.md,
    backgroundColor: metricColors.headTurns.container,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: palette.outlineVariant,
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
  muted: {
    color: palette.onSurfaceVariant,
  },
});

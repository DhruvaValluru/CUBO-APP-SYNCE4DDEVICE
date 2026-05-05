import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { DriverProfileCard } from '../components/DriverProfileCard';
import { FlatPersonAvatar } from '../components/FlatPersonAvatar';
import { GlassCard } from '../components/GlassCard';
import { ScreenShell } from '../components/ScreenShell';
import { drivers, getDriverById, profileSettings } from '../data/mockData';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/theme';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState(profileSettings);
  const owner = getDriverById('pablo') ?? drivers[0];

  return (
    <ScreenShell>
      <Pressable style={styles.closeRow} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color={colors.text} />
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Owner controls, linked drivers, and monitoring permissions.</Text>
      </View>

      {owner ? <DriverProfileCard driver={owner} /> : null}

      <GlassCard style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settings.map((setting) => (
          <View key={setting.label} style={styles.settingRow}>
            <View style={styles.settingCopy}>
              <Text style={styles.settingLabel}>{setting.label}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={(value) =>
                setSettings((current) =>
                  current.map((item) =>
                    item.label === setting.label ? { ...item, enabled: value } : item,
                  ),
                )
              }
              trackColor={{ false: colors.surfaceMuted, true: colors.accentLime }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}
      </GlassCard>

      <GlassCard style={styles.linkedCard}>
        <Text style={styles.sectionTitle}>Linked drivers</Text>
        {drivers.slice(0, 3).map((driver) => (
          <View key={driver.id} style={styles.linkedRow}>
            <FlatPersonAvatar skin={driver.skinTone} shirt={driver.shirtColor} size={44} />
            <View style={styles.settingCopy}>
              <Text style={styles.settingLabel}>{driver.name}</Text>
              <Text style={styles.settingDescription}>{driver.relation}</Text>
            </View>
            <Text style={styles.ready}>Ready</Text>
          </View>
        ))}
      </GlassCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  closeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
  },
  closeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  settingsCard: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.black06,
    padding: spacing.md,
  },
  settingCopy: {
    flex: 1,
  },
  settingLabel: {
    color: colors.text,
    fontWeight: '700',
  },
  settingDescription: {
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
    fontSize: 12,
  },
  linkedCard: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  linkedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.black06,
    padding: spacing.md,
  },
  ready: {
    color: colors.success,
    fontWeight: '700',
  },
});

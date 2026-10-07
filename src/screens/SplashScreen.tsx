import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CuboStand } from '../components/CuboStand';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const features = [
  { icon: 'eye-outline', label: 'Spots head turns away from the road' },
  { icon: 'smartphone-outline', label: 'Detects phone use behind the wheel' },
  { icon: 'activity-outline', label: 'Scores every drive for every driver' },
];

/**
 * Welcome screen — kittenTricks "Sign In 4" layout (centred header, content slot,
 * giant CTA, ghost secondary action) with the real CUBO unit in the content slot.
 */
export const SplashScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <Layout style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]} level="2">
      <StatusBar style="light" />
      <View style={styles.headerContainer}>
        <Text category="h1">CUBO</Text>
        <Text style={styles.signInLabel} category="s1" appearance="hint">
          Driver attention, every trip
        </Text>
      </View>

      <View style={styles.formContainer}>
        <CuboStand height={250} />
      </View>

      <View style={styles.features}>
        {features.map((f) => (
          <View key={f.label} style={styles.featureRow}>
            <Icon name={f.icon} style={styles.featureIcon} fill="#8F9BB3" />
            <Text category="s2" style={styles.featureText}>
              {f.label}
            </Text>
          </View>
        ))}
      </View>

      <Button style={styles.signInButton} size="giant" onPress={() => navigation.replace('MainTabs')}>
        GET STARTED
      </Button>
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={() => navigation.replace('MainTabs', { screen: 'Device' })}
      >
        Already have a CUBO? Pair it
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInLabel: {
    marginTop: 16,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  features: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
  },
  featureText: {
    flex: 1,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
  },
});

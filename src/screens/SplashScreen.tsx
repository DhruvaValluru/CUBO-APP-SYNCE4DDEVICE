import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FadeInView } from '../components/Motion';
import { ImageOverlay } from '../components/kitten/ImageOverlay';
import { cuboImages } from '../data/cuboDevice';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

/** Eva basic-1100 tint instead of the template's flat black, so the photo reads as part of the theme */
const OVERLAY = 'rgba(16, 20, 38, 0.62)';

const features = [
  { icon: 'eye-outline', label: 'Spots head turns away from the road' },
  { icon: 'smartphone-outline', label: 'Detects phone use behind the wheel' },
  { icon: 'activity-outline', label: 'Scores every drive for every driver' },
];

/**
 * Welcome screen — kittenTricks "Sign In 4" layout (full-bleed ImageOverlay,
 * centred header, form slot, giant CTA, ghost secondary action) over a real CUBO photo.
 */
export const SplashScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageOverlay
      style={[styles.container, { overlayColor: OVERLAY, paddingTop: insets.top, paddingBottom: insets.bottom }]}
      source={cuboImages.mountSide}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <FadeInView style={styles.headerContainer}>
        <Text category="h1" status="control">
          CUBO
        </Text>
        <Text style={styles.subtitle} category="s1" status="control">
          Driver attention, every trip
        </Text>
      </FadeInView>

      <View style={styles.formContainer}>
        {features.map((f, i) => (
          <FadeInView key={f.label} delay={150 + i * 90} style={styles.featureRow}>
            <Icon name={f.icon} style={styles.featureIcon} fill="#FFFFFF" />
            <Text status="control" category="s2" style={styles.featureText}>
              {f.label}
            </Text>
          </FadeInView>
        ))}
      </View>

      <FadeInView delay={450}>
        <Button style={styles.signInButton} size="giant" onPress={() => navigation.replace('MainTabs')}>
          GET STARTED
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={() => navigation.replace('MainTabs', { screen: 'Device' })}
        >
          Already have a CUBO? Pair it
        </Button>
      </FadeInView>
    </ImageOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 32,
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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.logoBlock}>
        <Image source={require('../../assets/cubo-logo.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="CUBO logo" />
      </View>

      <View style={styles.copy}>
        <Text style={styles.kicker}>Stay alert on every drive</Text>
        <Text style={styles.title}>CUBO</Text>
        <Text style={styles.subtitle}>Real-time distraction awareness from the cabin camera — calm UI, serious safety.</Text>
      </View>

      <View style={styles.featureRow}>
        <View style={styles.featurePill}>
          <Text style={styles.featureText}>Live vision</Text>
        </View>
        <View style={styles.featurePill}>
          <Text style={styles.featureText}>Family & fleet</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.replace('MainTabs')}>
        <Text style={styles.buttonText}>Enter CUBO</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.background} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    backgroundColor: colors.splashBg,
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 220,
    height: 220,
  },
  copy: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  kicker: {
    color: colors.logoGreenMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    color: colors.splashText,
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  featurePill: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(52, 217, 122, 0.35)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  featureText: {
    color: colors.splashText,
    fontWeight: '600',
    fontSize: 13,
  },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.accentLime,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
});

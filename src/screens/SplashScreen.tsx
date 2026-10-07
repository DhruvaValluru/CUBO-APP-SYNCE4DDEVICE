import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CuboStand } from '../components/CuboStand';
import { RootStackParamList } from '../navigation/types';
import { metricColors, palette, shape, space } from '../theme/material';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const features = [
  { icon: 'head-sync-outline', label: 'Spots head turns away from the road', tone: metricColors.headTurns },
  { icon: 'cellphone-off', label: 'Detects phone use behind the wheel', tone: metricColors.phone },
  { icon: 'chart-donut', label: 'Scores every drive for every driver', tone: metricColors.focus },
];

/** Welcome — Fitbit-style onboarding: product on a white stage, display headline, one primary action. */
export const SplashScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [stageHeight, setStageHeight] = useState(0);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + space.lg }]}>
      <StatusBar style="dark" />
      <View style={styles.stage} onLayout={(e) => setStageHeight(e.nativeEvent.layout.height)}>
        {stageHeight > 0 ? <CuboStand height={Math.min(260, stageHeight * 0.82)} /> : null}
      </View>

      <View style={styles.copy}>
        <Text variant="labelLarge" style={styles.brand}>
          CUBO
        </Text>
        <Text variant="headlineLarge">Eyes on the road, every trip.</Text>
        <View style={styles.features}>
          {features.map((f) => (
            <View key={f.label} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: f.tone.container }]}>
                <Icon source={f.icon} size={18} color={f.tone.accent} />
              </View>
              <Text variant="bodyLarge" style={styles.featureText}>
                {f.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.replace('MainTabs')}
        >
          Get started
        </Button>
        <Button mode="text" onPress={() => navigation.replace('MainTabs', { screen: 'Device' })}>
          I already have a CUBO
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.surfaceContainerLowest,
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: space.lg,
    borderRadius: shape.sheet,
    backgroundColor: palette.surfaceContainerLow,
  },
  copy: {
    paddingHorizontal: space.xxl,
    gap: space.sm,
  },
  brand: {
    color: palette.primary,
    letterSpacing: 1.2,
  },
  features: {
    gap: space.md,
    marginTop: space.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    color: palette.onSurfaceVariant,
  },
  actions: {
    paddingHorizontal: space.xxl,
    marginTop: space.xxl,
    gap: space.xs,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

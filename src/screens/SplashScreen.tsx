import { useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

/** How long the logo sits centered before it expands into the app. */
const HOLD_MS = 1500;
/** Duration of the expand-and-fade transition. */
const EXPAND_MS = 700;
/** Hand off to the main app partway through the expand so it fades in underneath. */
const HANDOFF_MS = 250;

export const SplashScreen = ({ navigation }: Props) => {
  const scale = useRef(new Animated.Value(0.92)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let handoff: ReturnType<typeof setTimeout> | undefined;

    // 1. Gentle settle-in so the logo doesn't just pop on screen.
    const intro = Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 500, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }),
    ]);

    // 2. Expand the logo past the edges of the screen while everything fades out.
    const expand = Animated.parallel([
      Animated.timing(scale, { toValue: 7, duration: EXPAND_MS, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 0, duration: EXPAND_MS * 0.8, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(screenOpacity, { toValue: 0, duration: EXPAND_MS, delay: HANDOFF_MS, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]);

    const sequence = Animated.sequence([intro, Animated.delay(HOLD_MS), expand]);

    // Navigate shortly after the expand starts so MainTabs fades in behind the growing logo.
    handoff = setTimeout(() => navigation.replace('MainTabs'), 500 + HOLD_MS + HANDOFF_MS);
    sequence.start();

    return () => {
      if (handoff) clearTimeout(handoff);
      sequence.stop();
    };
  }, [logoOpacity, navigation, scale, screenOpacity]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]} pointerEvents="none">
      <StatusBar style="light" />
      <View style={styles.center}>
        <Animated.Image
          source={require('../../assets/cubo-logo.png')}
          style={[styles.logo, { opacity: logoOpacity, transform: [{ scale }] }]}
          resizeMode="contain"
          accessibilityLabel="CUBO logo"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.splashBg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

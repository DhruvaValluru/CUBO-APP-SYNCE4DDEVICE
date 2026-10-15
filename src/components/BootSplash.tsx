import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

/** How long the logo sits centered before it expands into the app. */
const HOLD_MS = 1500;
/** Duration of the expand-and-fade transition. */
const EXPAND_MS = 750;

type Props = { onDone: () => void };

/**
 * Full-screen boot overlay rendered above the navigator. The logo settles in,
 * holds, then scales up and dissolves to reveal the app already mounted beneath.
 */
export const BootSplash = ({ onDone }: Props) => {
  const scale = useRef(new Animated.Value(0.92)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const intro = Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 500, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }),
    ]);

    const expand = Animated.parallel([
      Animated.timing(scale, { toValue: 7, duration: EXPAND_MS, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 0, duration: EXPAND_MS * 0.85, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(screenOpacity, { toValue: 0, duration: EXPAND_MS, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]);

    const sequence = Animated.sequence([intro, Animated.delay(HOLD_MS), expand]);
    sequence.start(({ finished }) => {
      if (finished) onDone();
    });

    return () => sequence.stop();
  }, [logoOpacity, onDone, scale, screenOpacity]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, { opacity: screenOpacity }]} pointerEvents="none">
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
    backgroundColor: colors.splashBg,
    zIndex: 1000,
    elevation: 1000,
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

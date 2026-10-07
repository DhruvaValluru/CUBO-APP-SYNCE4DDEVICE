import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

/** The native driver isn't available on web; fall back to the JS driver there. */
export const nativeDriver = Platform.OS !== 'web';

type FadeInViewProps = {
  children: ReactNode;
  /** Stagger entrance by this many ms */
  delay?: number;
  /** Starting vertical offset in px */
  offset?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

/** Fades + slides its children up once on mount. Stack several with increasing `delay` for a stagger. */
export function FadeInView({ children, delay = 0, offset = 14, duration = 420, style }: FadeInViewProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: nativeDriver,
    });
    anim.start();
    return () => anim.stop();
  }, [delay, duration, progress]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] });

  return <Animated.View style={[style, { opacity: progress, transform: [{ translateY }] }]}>{children}</Animated.View>;
}

type PulseDotProps = {
  color: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** Solid status dot with an expanding "live" ring. */
export function PulseDot({ color, size = 8, style }: PulseDotProps) {
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(ring, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: nativeDriver }),
    );
    anim.start();
    return () => anim.stop();
  }, [ring]);

  const box = size * 3;

  return (
    <Animated.View style={[{ width: box, height: box, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
          transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [1, 3] }) }],
        }}
      />
      <Animated.View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
    </Animated.View>
  );
}

type ScalePressableProps = Omit<PressableProps, 'style'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Scale while pressed */
  pressedScale?: number;
};

/** Pressable with a springy press-in shrink. */
export function ScalePressable({ children, style, pressedScale = 0.97, onPressIn, onPressOut, ...rest }: ScalePressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const springTo = (toValue: number) =>
    Animated.spring(scale, { toValue, friction: 6, tension: 220, useNativeDriver: nativeDriver }).start();

  return (
    <Pressable
      {...rest}
      onPressIn={(e) => {
        springTo(pressedScale);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        springTo(1);
        onPressOut?.(e);
      }}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

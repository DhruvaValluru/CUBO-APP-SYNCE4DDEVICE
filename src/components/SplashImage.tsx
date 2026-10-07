// Ported from akveo/kittenTricks (MIT) — src/components/splash-image.component.expo.tsx
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ImageProps, Platform, StyleSheet } from 'react-native';

export interface SplashImageProps extends ImageProps {
  loading: boolean;
  backgroundColor: string;
}

/** Covers the app while fonts load, then zooms out (1 → 1.5) and fades away. */
export const SplashImage = ({ loading, backgroundColor, style, ...imageProps }: SplashImageProps) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (loading) return;
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.in(Easing.exp),
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => setAnimationCompleted(true));
  }, [loading, animationValue]);

  if (animationCompleted) return null;

  const opacity = animationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const scale = animationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container, { backgroundColor, opacity }]}
      pointerEvents="none"
    >
      <Animated.Image {...imageProps} style={[styles.image, style, { transform: [{ scale }] }]} resizeMode="contain" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ImageProps, Platform, StyleSheet } from 'react-native';

export interface SplashImageProps extends ImageProps {
  loading: boolean;
  backgroundColor: string;
}

/** Covers the app while fonts load, then fades away (Material standard-decelerate, 300 ms). */
export const SplashImage = ({ loading, backgroundColor, style, ...imageProps }: SplashImageProps) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (loading) return;
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0, 0, 0, 1),
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => setAnimationCompleted(true));
  }, [loading, animationValue]);

  if (animationCompleted) return null;

  const opacity = animationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container, { backgroundColor, opacity }]}
      pointerEvents="none"
    >
      <Image {...imageProps} style={[styles.image, style]} resizeMode="contain" />
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

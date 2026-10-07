import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Platform, StyleProp, View, ViewStyle } from 'react-native';

/** Background-removed photo of CUBO on its stand, split into two layers at the ball joint. */
const HEAD = require('../../assets/cubo/cubo-stand-head.png');
const STAND = require('../../assets/cubo/cubo-stand-base.png');

/** Source layer size and the ball-joint centre the head rotates around (px in the 520×1083 layers). */
const SRC_W = 520;
const SRC_H = 1083;
const PIVOT = { x: 295, y: 355 };

type Props = {
  height: number;
  /** Max head tilt either side, in degrees */
  sweep?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * The real CUBO unit slowly tilting on its mount, like it is aiming at the driver.
 * Layers are drawn stand-over-head so the ring hides the joint while the head moves.
 */
export function CuboStand({ height, sweep = 6, style }: Props) {
  const tilt = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const easing = Easing.inOut(Easing.sin);
    const useNativeDriver = Platform.OS !== 'web';
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(tilt, { toValue: 1, duration: 2200, easing, useNativeDriver }),
        Animated.delay(500),
        Animated.timing(tilt, { toValue: -1, duration: 2200, easing, useNativeDriver }),
        Animated.delay(500),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [tilt]);

  const scale = height / SRC_H;
  const width = SRC_W * scale;
  // Rotate about the joint: move the pivot to the layer centre, rotate, move back
  const dx = (PIVOT.x - SRC_W / 2) * scale;
  const dy = (PIVOT.y - SRC_H / 2) * scale;
  const rotate = tilt.interpolate({ inputRange: [-1, 1], outputRange: [`-${sweep}deg`, `${sweep}deg`] });
  const layer = { position: 'absolute' as const, left: 0, top: 0, width, height };

  return (
    <View style={[{ width, height }, style]} accessibilityLabel="CUBO on its stand">
      <Animated.View
        style={[
          layer,
          { transform: [{ translateX: dx }, { translateY: dy }, { rotate }, { translateX: -dx }, { translateY: -dy }] },
        ]}
      >
        <Image source={HEAD} style={{ width, height }} resizeMode="contain" />
      </Animated.View>
      <Image source={STAND} style={[layer]} resizeMode="contain" />
    </View>
  );
}

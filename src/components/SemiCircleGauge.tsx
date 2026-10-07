import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/colors';

type SemiCircleGaugeProps = {
  score: number;
  size?: number;
  strokeWidth?: number;
  /** Sweep the arc and count the number up from 0 on mount */
  animated?: boolean;
};

export function SemiCircleGauge({ score, size = 260, strokeWidth = 12, animated = true }: SemiCircleGaugeProps) {
  const target = Math.min(100, Math.max(0, score));
  const [shown, setShown] = useState(animated ? 0 : target);
  const progress = useRef(new Animated.Value(animated ? 0 : target)).current;

  useEffect(() => {
    if (!animated) {
      setShown(target);
      return;
    }
    // SVG dash props can't use the native driver; drive a JS value and re-render the arc
    const id = progress.addListener(({ value }) => setShown(value));
    const anim = Animated.timing(progress, {
      toValue: target,
      duration: 1400,
      delay: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    anim.start();
    return () => {
      anim.stop();
      progress.removeListener(id);
    };
  }, [animated, progress, target]);

  const w = size;
  const h = Math.round(size * 0.46);
  const cx = w / 2;
  const r = size * 0.37;
  const cyBase = h - strokeWidth / 2 - 2;
  const d = `M ${cx - r} ${cyBase} A ${r} ${r} 0 1 1 ${cx + r} ${cyBase}`;
  const arcLength = Math.PI * r;
  const filled = (shown / 100) * arcLength;

  return (
    <View style={[styles.wrap, { width: w }]}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Path d={d} stroke={colors.gaugeTrack} strokeWidth={strokeWidth} fill="none" strokeLinecap="butt" />
        <Path
          d={d}
          stroke={colors.gaugeProgress}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${arcLength}`}
        />
      </Svg>
      <Text style={[styles.score, { marginTop: -(strokeWidth + 22) }]}>{Math.round(shown)}</Text>
      <View style={[styles.scaleRow, { width: w - 16 }]}>
        <Text style={styles.scale}>0</Text>
        <Text style={styles.scale}>100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  scale: {
    color: colors.textTertiary,
    fontSize: 11,
    fontWeight: '400',
  },
  score: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.gaugeProgress,
    letterSpacing: -2,
    marginBottom: 0,
  },
});

import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';

import { palette } from '../../theme/material';

type Props = {
  score: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
};

/** Closed progress ring with the value centred, like Fitbit's goal rings. */
export function ScoreRing({ score, size = 168, stroke = 14, color = palette.primary, label }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score)) / 100;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={palette.surfaceContainerHigh} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>
        <Text variant="displayMedium">{Math.round(score)}</Text>
        {label ? (
          <Text variant="labelMedium" style={styles.label}>
            {label}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: palette.onSurfaceVariant,
    marginTop: -4,
  },
});

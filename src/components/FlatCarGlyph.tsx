import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

type FlatCarGlyphProps = {
  color?: string;
  /** Fill for cabin / wheels (e.g. white on green tile) */
  fill?: string;
};

/** Minimal 2D car — flat shapes only (no “AI art” look). */
export function FlatCarGlyph({ color = colors.text, fill = colors.surface }: FlatCarGlyphProps) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.cabin, { borderColor: color, backgroundColor: fill }]} />
      <View style={[styles.body, { backgroundColor: color }]} />
      <View style={styles.axle}>
        <View style={[styles.wheel, { borderColor: color, backgroundColor: fill }]} />
        <View style={[styles.wheel, { borderColor: color, backgroundColor: fill }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 40,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cabin: {
    position: 'absolute',
    top: 0,
    width: 22,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    backgroundColor: colors.surface,
  },
  body: {
    width: 36,
    height: 12,
    borderRadius: 6,
    opacity: 0.92,
  },
  axle: {
    position: 'absolute',
    bottom: -2,
    left: 4,
    right: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wheel: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 3,
    backgroundColor: colors.surface,
  },
});

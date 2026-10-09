import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { MetricKey, metricColors, palette, shape, space } from '../../theme/material';

type Props = {
  metric: MetricKey;
  icon: string;
  label: string;
  value: string;
  unit?: string;
  caption?: string;
};

/** Fitbit-style stat tile: pastel container, tinted icon, large value, quiet caption. */
export function MetricTile({ metric, icon, label, value, unit, caption }: Props) {
  const c = metricColors[metric];
  return (
    <View style={[styles.tile, { backgroundColor: c.soft }]}>
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: c.container }]}>
          <Icon source={icon} size={18} color={c.accent} />
        </View>
        <Text variant="labelLarge" style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <View style={styles.valueRow}>
        <Text variant="headlineMedium" style={{ color: c.onContainer }}>
          {value}
        </Text>
        {unit ? (
          <Text variant="bodyMedium" style={styles.unit}>
            {unit}
          </Text>
        ) : null}
      </View>
      {caption ? (
        <Text variant="bodySmall" style={{ color: c.accent }}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: shape.tile,
    padding: space.lg,
    gap: space.sm,
    minHeight: 132,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    color: palette.onSurfaceVariant,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 'auto',
  },
  unit: {
    color: palette.onSurfaceVariant,
  },
});

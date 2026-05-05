import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';
import { radii } from '../theme/theme';

type GlassCardProps = {
  children: ReactNode;
  style?: object;
};

export const GlassCard = ({ children, style }: GlassCardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
});

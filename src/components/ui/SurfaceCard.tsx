import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { palette, shape } from '../../theme/material';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/** Flat white card on the near-white canvas (no shadow), with an M3 ripple when pressable. */
export function SurfaceCard({ children, onPress, style, contentStyle, accessibilityLabel }: Props) {
  return (
    <View style={[styles.card, style]}>
      {onPress ? (
        <TouchableRipple onPress={onPress} style={contentStyle} accessibilityLabel={accessibilityLabel} borderless>
          <View>{children}</View>
        </TouchableRipple>
      ) : (
        <View style={contentStyle}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surfaceContainerLowest,
    borderRadius: shape.card,
    overflow: 'hidden',
  },
});

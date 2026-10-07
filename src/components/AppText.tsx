import { StyleSheet, Text, TextProps } from 'react-native';

import { familyForWeight } from '../theme/material';

/**
 * React Native Text in Cubo Sans, for hand-styled screens. Maps `fontWeight` onto the matching
 * font file (unless a `fontFamily` is given) so iOS/Android never fall back to the system font
 * or fake a bold.
 */
export function AppText({ style, ...rest }: TextProps) {
  const flat = StyleSheet.flatten(style) ?? {};
  const fontFamily = flat.fontFamily ?? familyForWeight(flat.fontWeight);
  return <Text {...rest} style={[flat, { fontFamily, fontWeight: 'normal' }]} />;
}

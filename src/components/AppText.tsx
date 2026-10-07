import { StyleSheet, Text, TextProps } from 'react-native';

/** Font loaded in App.tsx and set as Eva's `text-font-family` (kittenTricks custom mapping). */
export const APP_FONT_FAMILY = 'opensans-regular';

/** React Native Text in the app font, for screens that don't use UI Kitten's Text. */
export function AppText({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[styles.base, style]} />;
}

const styles = StyleSheet.create({
  base: {
    fontFamily: APP_FONT_FAMILY,
  },
});

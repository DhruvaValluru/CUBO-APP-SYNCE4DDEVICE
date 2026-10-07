// Ported from akveo/kittenTricks (MIT) — social/profile-1/extra/profile-social.component.tsx
import { Text } from '@ui-kitten/components';
import { StyleSheet, View, ViewProps } from 'react-native';

export interface ProfileSocialProps extends ViewProps {
  hint: string;
  value: string;
}

export const ProfileSocial = ({ style, hint, value, ...viewProps }: ProfileSocialProps) => (
  <View {...viewProps} style={[styles.container, style]}>
    <Text category="s2">{value}</Text>
    <Text appearance="hint" category="c2">
      {hint}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

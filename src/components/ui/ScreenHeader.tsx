import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette, space } from '../../theme/material';

type Props = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
};

/** Large left-aligned page title, as on Fitbit's Today / You tabs. */
export function ScreenHeader({ title, subtitle, right }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + space.lg }]}>
      <View style={styles.copy}>
        {subtitle ? (
          <Text variant="labelLarge" style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
        <Text variant="headlineLarge">{title}</Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    paddingBottom: space.md,
    backgroundColor: palette.background,
  },
  copy: {
    flex: 1,
  },
  subtitle: {
    color: palette.onSurfaceVariant,
    marginBottom: 2,
  },
});

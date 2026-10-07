// Ported from akveo/kittenTricks (MIT) — dashboards/settings/extra/settings-section.component.tsx
import { Divider, Text } from '@ui-kitten/components';
import { Fragment, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface SettingProps extends TouchableOpacityProps {
  hint: string;
  /** CUBO addition: optional second line under the hint */
  description?: string;
  children?: ReactNode;
}

export const Setting = ({ style, hint, description, children, ...touchableOpacityProps }: SettingProps) => (
  <Fragment>
    <TouchableOpacity activeOpacity={1.0} {...touchableOpacityProps} style={[styles.container, style]}>
      <View style={styles.copy}>
        <Text category="s2">{hint}</Text>
        {description ? (
          <Text category="c1" appearance="hint">
            {description}
          </Text>
        ) : null}
      </View>
      {children}
    </TouchableOpacity>
    <Divider />
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
    marginRight: 16,
  },
});

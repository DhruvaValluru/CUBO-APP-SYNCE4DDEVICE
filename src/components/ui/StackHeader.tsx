import { ReactNode } from 'react';
import { Appbar } from 'react-native-paper';

import { fontFamilies, palette } from '../../theme/material';

type Props = {
  title: string;
  onBack: () => void;
  right?: ReactNode;
};

/** Material 3 small top app bar with a back action, for pushed screens. */
export function StackHeader({ title, onBack, right }: Props) {
  return (
    <Appbar.Header style={{ backgroundColor: palette.background }}>
      <Appbar.BackAction onPress={onBack} accessibilityLabel="Back" />
      <Appbar.Content title={title} titleStyle={{ fontFamily: fontFamilies.displayMedium }} />
      {right}
    </Appbar.Header>
  );
}

import { Icon, IconElement, IconProps } from '@ui-kitten/components';

/** Eva icon factory for Kitten `accessoryLeft` / `accessoryRight` / `icon` props. */
export const evaIcon =
  (name: string) =>
  (props?: Partial<IconProps>): IconElement => <Icon {...props} name={name} />;

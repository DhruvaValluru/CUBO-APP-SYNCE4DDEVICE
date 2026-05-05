import { ReactNode } from 'react';
import { View } from 'react-native';

/** Native: full screen; web uses `PhoneFrame.web.tsx`. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return <View style={{ flex: 1 }}>{children}</View>;
}

import { Platform } from 'react-native';

/** App-wide serif theme (Times New Roman where the OS provides it). */
export const fontFamily = Platform.select({
  ios: 'Times New Roman',
  android: 'serif',
  web: 'Times New Roman, Times, serif',
}) as string;

export const typography = {
  fontFamily,
};

import { MD3LightTheme, configureFonts } from 'react-native-paper';

/**
 * CUBO design tokens — a Material 3 light scheme in the style of the Fitbit app:
 * near-white canvas, dark-navy ink, flat white cards, and one soft pastel family per metric.
 *
 * Primary roles were generated from the seed #00A86B with Google's material-color-utilities
 * (themeFromSourceColor); neutrals are a cool grey with navy ink instead of the generated green-greys.
 */
export const palette = {
  primary: '#006D43',
  onPrimary: '#FFFFFF',
  primaryContainer: '#C2F5D6',
  onPrimaryContainer: '#002111',
  secondary: '#4E6355',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#D0E8D6',
  onSecondaryContainer: '#0B1F14',
  tertiary: '#3C6471',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#BFE9F9',
  onTertiaryContainer: '#001F27',
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',

  /** Canvas and surface containers (M3 tone 98 → 90) */
  background: '#F7F9FA',
  surface: '#F7F9FA',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F1F4F6',
  surfaceContainer: '#ECEFF1',
  surfaceContainerHigh: '#E6EAEC',
  surfaceContainerHighest: '#E0E4E7',
  surfaceVariant: '#DEE4E8',

  /** Dark-navy ink, as in Fitbit's on-surface role */
  onSurface: '#14232C',
  onSurfaceVariant: '#4B5A63',
  outline: '#76858D',
  outlineVariant: '#D3DADE',
  inverseSurface: '#29353C',
  inverseOnSurface: '#EEF2F4',
  inversePrimary: '#59DE9B',
  scrim: '#000000',
  shadow: '#000000',
};

/** Pastel tonal families (tone 45 accent / 92 container / 96 soft / 15 on-container). */
export const metricColors = {
  focus: { accent: '#197A43', container: '#C9F2D5', soft: '#EAF8EE', onContainer: '#002D14' },
  phone: { accent: '#A85322', container: '#FFE2D6', soft: '#FFF1EB', onContainer: '#451800' },
  headTurns: { accent: '#6062B6', container: '#E8E6FF', soft: '#F5F2FF', onContainer: '#18176D' },
  trips: { accent: '#0072A2', container: '#D4EBFF', soft: '#EBF5FF', onContainer: '#00293D' },
  alerts: { accent: '#AB4C55', container: '#FFE1E2', soft: '#FFF0F0', onContainer: '#510615' },
};

export type MetricKey = keyof typeof metricColors;

/** Font files (assets/fonts) — each weight is its own family so no platform fakes bold. */
export const fontFamilies = {
  regular: 'CuboSans-Regular',
  medium: 'CuboSans-Medium',
  bold: 'CuboSans-Bold',
  displayRegular: 'CuboSansDisplay-Regular',
  displayMedium: 'CuboSansDisplay-Medium',
};

export const fontAssets = {
  [fontFamilies.regular]: require('../../assets/fonts/CuboSans-Regular.ttf'),
  [fontFamilies.medium]: require('../../assets/fonts/CuboSans-Medium.ttf'),
  [fontFamilies.bold]: require('../../assets/fonts/CuboSans-Bold.ttf'),
  [fontFamilies.displayRegular]: require('../../assets/fonts/CuboSansDisplay-Regular.ttf'),
  [fontFamilies.displayMedium]: require('../../assets/fonts/CuboSansDisplay-Medium.ttf'),
};

/** Picks the font file that matches a fontWeight, for hand-styled Text. */
export function familyForWeight(weight?: string | number) {
  const w = Number(weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : weight);
  if (w >= 600) return fontFamilies.bold;
  if (w >= 500) return fontFamilies.medium;
  return fontFamilies.regular;
}

/** M3 type scale (sizes/line heights per spec) mapped onto Cubo Sans text + display cuts. */
const fonts = configureFonts({
  config: {
    displayLarge: { fontFamily: fontFamilies.displayRegular, fontSize: 57, lineHeight: 64, letterSpacing: -0.25, fontWeight: '400' },
    displayMedium: { fontFamily: fontFamilies.displayRegular, fontSize: 45, lineHeight: 52, letterSpacing: 0, fontWeight: '400' },
    displaySmall: { fontFamily: fontFamilies.displayRegular, fontSize: 36, lineHeight: 44, letterSpacing: 0, fontWeight: '400' },
    headlineLarge: { fontFamily: fontFamilies.displayRegular, fontSize: 32, lineHeight: 40, letterSpacing: 0, fontWeight: '400' },
    headlineMedium: { fontFamily: fontFamilies.displayRegular, fontSize: 28, lineHeight: 36, letterSpacing: 0, fontWeight: '400' },
    headlineSmall: { fontFamily: fontFamilies.displayRegular, fontSize: 24, lineHeight: 32, letterSpacing: 0, fontWeight: '400' },
    titleLarge: { fontFamily: fontFamilies.displayMedium, fontSize: 22, lineHeight: 28, letterSpacing: 0, fontWeight: '400' },
    titleMedium: { fontFamily: fontFamilies.medium, fontSize: 16, lineHeight: 24, letterSpacing: 0.15, fontWeight: '400' },
    titleSmall: { fontFamily: fontFamilies.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0.1, fontWeight: '400' },
    labelLarge: { fontFamily: fontFamilies.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0.1, fontWeight: '400' },
    labelMedium: { fontFamily: fontFamilies.medium, fontSize: 12, lineHeight: 16, letterSpacing: 0.5, fontWeight: '400' },
    labelSmall: { fontFamily: fontFamilies.medium, fontSize: 11, lineHeight: 16, letterSpacing: 0.5, fontWeight: '400' },
    bodyLarge: { fontFamily: fontFamilies.regular, fontSize: 16, lineHeight: 24, letterSpacing: 0.15, fontWeight: '400' },
    bodyMedium: { fontFamily: fontFamilies.regular, fontSize: 14, lineHeight: 20, letterSpacing: 0.25, fontWeight: '400' },
    bodySmall: { fontFamily: fontFamilies.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, fontWeight: '400' },
  },
});

export const paperTheme = {
  ...MD3LightTheme,
  roundness: 4,
  fonts: { ...fonts, default: { ...fonts.default, fontFamily: fontFamilies.regular, fontWeight: '400' as const } },
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    onPrimary: palette.onPrimary,
    primaryContainer: palette.primaryContainer,
    onPrimaryContainer: palette.onPrimaryContainer,
    secondary: palette.secondary,
    onSecondary: palette.onSecondary,
    secondaryContainer: palette.secondaryContainer,
    onSecondaryContainer: palette.onSecondaryContainer,
    tertiary: palette.tertiary,
    onTertiary: palette.onTertiary,
    tertiaryContainer: palette.tertiaryContainer,
    onTertiaryContainer: palette.onTertiaryContainer,
    error: palette.error,
    onError: palette.onError,
    errorContainer: palette.errorContainer,
    onErrorContainer: palette.onErrorContainer,
    background: palette.background,
    onBackground: palette.onSurface,
    surface: palette.surface,
    onSurface: palette.onSurface,
    surfaceVariant: palette.surfaceVariant,
    onSurfaceVariant: palette.onSurfaceVariant,
    outline: palette.outline,
    outlineVariant: palette.outlineVariant,
    inverseSurface: palette.inverseSurface,
    inverseOnSurface: palette.inverseOnSurface,
    inversePrimary: palette.inversePrimary,
    elevation: {
      level0: 'transparent',
      level1: palette.surfaceContainerLow,
      level2: palette.surfaceContainer,
      level3: palette.surfaceContainerHigh,
      level4: palette.surfaceContainerHigh,
      level5: palette.surfaceContainerHighest,
    },
  },
};

/** Fitbit-style shape + spacing scale */
export const shape = { tile: 20, card: 24, sheet: 28, pill: 999 };
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };

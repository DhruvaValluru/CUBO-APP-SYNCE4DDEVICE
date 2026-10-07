import { metricColors, palette } from './material';

/**
 * Legacy colour tokens used by hand-styled screens (Insurance, reports, focus block, detection),
 * mapped onto the Material 3 light palette in ./material so they match the Paper screens.
 */
export const colors = {
  background: palette.background,
  card: palette.surfaceContainerLowest,
  cardHover: palette.surfaceContainerLow,
  cardElevated: palette.surfaceContainerLow,
  border: palette.outlineVariant,
  borderLight: palette.outlineVariant,
  borderStrong: palette.outline,

  text: palette.onSurface,
  textSecondary: palette.onSurfaceVariant,
  textMuted: palette.onSurfaceVariant,
  textTertiary: palette.outline,

  gaugeProgress: palette.primary,
  gaugeTrack: palette.surfaceContainerHighest,

  starkGreen: palette.primary,
  accentLime: palette.primary,
  accentLimeMuted: 'rgba(0, 109, 67, 0.56)',
  accentGreen: metricColors.focus.accent,
  mustard: metricColors.phone.accent,

  star: '#E8A317',
  danger: palette.error,
  dangerMuted: '#93000A',

  successGreen: metricColors.focus.accent,

  splashBg: palette.surfaceContainerLowest,
  splashText: palette.onSurface,
  logoGreen: palette.primary,
  logoGreenMuted: 'rgba(0, 109, 67, 0.56)',

  pageBg: '#E6EAEC',

  surface: palette.surfaceContainerLowest,
  surfaceMuted: palette.surfaceContainerHigh,
  primary: palette.primary,
  primaryStrong: '#005232',
  primarySoft: palette.primaryContainer,
  success: metricColors.focus.accent,
  successSoft: metricColors.focus.soft,
  warning: metricColors.phone.accent,
  warningSoft: metricColors.phone.soft,
  dangerSoft: palette.errorContainer,
  white08: 'rgba(20, 35, 44, 0.06)',
  white20: 'rgba(20, 35, 44, 0.16)',
  black06: 'rgba(20, 35, 44, 0.05)',
  shadow: 'rgba(20, 35, 44, 0.12)',
};

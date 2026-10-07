/**
 * Eva Design (UI Kitten) dark palette, so hand-built screens match the kittenTricks layouts.
 * Surfaces = color-basic-800…1100, hint text = color-basic-600, accent = Eva success green.
 */
const eva = {
  basic100: '#FFFFFF',
  basic500: '#C5CEE0',
  basic600: '#8F9BB3',
  basic700: '#2E3A59',
  basic800: '#222B45',
  basic900: '#1A2138',
  basic1000: '#151A30',
  basic1100: '#101426',
  success500: '#00E096',
  success600: '#00B383',
  success700: '#008F72',
  warning500: '#FFAA00',
  danger500: '#FF3D71',
};

export const evaPalette = eva;

export const colors = {
  background: eva.basic900,
  card: eva.basic800,
  cardHover: eva.basic700,
  cardElevated: eva.basic700,
  border: eva.basic1100,
  borderLight: 'rgba(143, 155, 179, 0.16)',
  borderStrong: 'rgba(143, 155, 179, 0.24)',

  text: eva.basic100,
  textSecondary: eva.basic600,
  textMuted: eva.basic600,
  textTertiary: eva.basic600,

  gaugeProgress: eva.success500,
  gaugeTrack: eva.basic700,

  starkGreen: eva.success500,
  accentLime: eva.success500,
  accentLimeMuted: 'rgba(0, 224, 150, 0.56)',
  accentGreen: eva.success500,
  mustard: eva.warning500,

  star: eva.warning500,
  danger: eva.danger500,
  dangerMuted: '#DB2C66',

  successGreen: eva.success500,

  splashBg: eva.basic1000,
  splashText: eva.basic100,
  logoGreen: eva.success500,
  logoGreenMuted: 'rgba(0, 224, 150, 0.56)',

  pageBg: eva.basic1100,

  surface: eva.basic800,
  surfaceMuted: eva.basic700,
  primary: eva.success500,
  primaryStrong: eva.success600,
  primarySoft: 'rgba(0, 224, 150, 0.16)',
  success: eva.success500,
  successSoft: 'rgba(0, 224, 150, 0.16)',
  warning: eva.warning500,
  warningSoft: 'rgba(255, 170, 0, 0.16)',
  dangerSoft: 'rgba(255, 61, 113, 0.16)',
  white08: 'rgba(255, 255, 255, 0.08)',
  white20: 'rgba(255, 255, 255, 0.2)',
  black06: 'rgba(255, 255, 255, 0.06)',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

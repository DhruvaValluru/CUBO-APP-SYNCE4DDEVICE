import { font } from './typography';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export const radii = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 14,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  phone: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 18 },
    elevation: 12,
  },
};

/** Body font faces (Source Sans 3). For headings use `font(weight, 'heading')` from ./typography. */
export const fonts = {
  regular: font('400'),
  medium: font('500'),
  semibold: font('600'),
  bold: font('700'),
  heavy: font('800'),
};

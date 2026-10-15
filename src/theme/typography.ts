import { TextStyle } from 'react-native';

/**
 * App typography: Outfit for headings / display, Source Sans 3 for body copy.
 * Each weight is a separate loaded face, so we set `fontFamily` only and never
 * `fontWeight` (which would cause faux-bold on Android).
 */
export type FontWeight = '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type FontRole = 'heading' | 'body';

export const fontFamilies: Record<FontRole, Record<FontWeight, string>> = {
  heading: {
    '300': 'Outfit_300Light',
    '400': 'Outfit_400Regular',
    '500': 'Outfit_500Medium',
    '600': 'Outfit_600SemiBold',
    '700': 'Outfit_700Bold',
    '800': 'Outfit_800ExtraBold',
    '900': 'Outfit_900Black',
  },
  body: {
    '300': 'SourceSans3_300Light',
    '400': 'SourceSans3_400Regular',
    '500': 'SourceSans3_500Medium',
    '600': 'SourceSans3_600SemiBold',
    '700': 'SourceSans3_700Bold',
    '800': 'SourceSans3_800ExtraBold',
    '900': 'SourceSans3_900Black',
  },
};

/** Spread into a style: `...font('600', 'heading')`. */
export const font = (weight: FontWeight = '400', role: FontRole = 'body'): Pick<TextStyle, 'fontFamily'> => ({
  fontFamily: fontFamilies[role][weight],
});

export const typography = { fontFamilies, font };

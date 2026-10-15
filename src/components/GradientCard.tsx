import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme/colors';
import { radii } from '../theme/theme';

type Variant = 'hero' | 'soft';

type Props = {
  children: ReactNode;
  style?: object;
  /** `hero`: deep green sweep for the focal card. `soft`: faint green wash. */
  variant?: Variant;
};

const GRADIENTS: Record<Variant, readonly [string, string, string]> = {
  hero: ['#0F3B25', '#0B2A1C', colors.card],
  soft: ['rgba(0, 255, 136, 0.14)', 'rgba(0, 255, 136, 0.05)', 'rgba(0, 255, 136, 0.0)'],
};

/** Card with a green gradient fill. Same radius / border language as GlassCard. */
export const GradientCard = ({ children, style, variant = 'hero' }: Props) => {
  return (
    <View style={[styles.card, variant === 'hero' ? styles.heroBorder : styles.softBorder, style]}>
      <LinearGradient
        colors={GRADIENTS[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.card,
  },
  heroBorder: {
    borderColor: 'rgba(0, 255, 136, 0.35)',
  },
  softBorder: {
    borderColor: 'rgba(0, 255, 136, 0.22)',
  },
});

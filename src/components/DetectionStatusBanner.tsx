import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/theme';
import { font } from '../theme/typography';

type DetectionStatusBannerProps = {
  distracted: boolean;
  title: string;
  subtitle: string;
};

export const DetectionStatusBanner = ({ distracted, title, subtitle }: DetectionStatusBannerProps) => {
  return (
    <View
      style={[
        styles.wrap,
        distracted
          ? { backgroundColor: '#3A1A1E', borderColor: colors.danger }
          : { backgroundColor: '#14301F', borderColor: colors.accentGreen },
      ]}
    >
      <View style={[styles.dot, distracted ? { backgroundColor: colors.danger } : { backgroundColor: colors.accentLime }]} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    ...font('800', 'heading'),
    fontSize: 16,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 3,
    fontSize: 12,
  },
});

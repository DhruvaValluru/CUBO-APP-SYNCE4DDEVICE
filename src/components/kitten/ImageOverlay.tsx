// Ported from akveo/kittenTricks (MIT) — src/layouts/*/extra/image-overlay.component.tsx
import { ReactNode } from 'react';
import { ImageBackground, ImageBackgroundProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps extends Omit<ImageBackgroundProps, 'style'> {
  style?: StyleProp<OverlayImageStyle>;
  children?: ReactNode;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export const ImageOverlay = ({ style, children, ...imageBackgroundProps }: ImageOverlayProps) => {
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style) ?? {};

  return (
    // Explicit 100% size: on web a bundled image otherwise keeps its intrinsic size and overflows
    <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle} imageStyle={styles.image}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }]} />
      {children}
    </ImageBackground>
  );
};

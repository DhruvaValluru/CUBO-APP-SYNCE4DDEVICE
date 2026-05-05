import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

type FlatPersonAvatarProps = {
  skin: string;
  shirt: string;
  size?: number;
};

/** Minimal 2D figure: circle head + rounded torso (flat vector look). */
export function FlatPersonAvatar({ skin, shirt, size = 40 }: FlatPersonAvatarProps) {
  const headSize = Math.round(size * 0.42);
  const bodyW = Math.round(size * 0.72);
  const bodyH = Math.round(size * 0.48);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View
        style={[
          styles.head,
          { width: headSize, height: headSize, borderRadius: headSize / 2, backgroundColor: skin },
        ]}
      />
      <View
        style={[
          styles.body,
          { width: bodyW, height: bodyH, borderRadius: bodyW / 2, backgroundColor: shirt },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  head: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  body: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

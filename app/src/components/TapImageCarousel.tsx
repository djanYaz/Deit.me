import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export interface TapImageCorouselProps {
  onPress: () => void;
  imageUrl: string;
}
export default function TapImageCorousel(props: TapImageCorouselProps) {
  return (
    <View onTouchStart={props.onPress}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: props.imageUrl }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

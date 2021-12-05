import React, { useEffect, useState } from 'react';
import { GestureResponderEvent, Image, StyleSheet, View } from 'react-native';
import { preloadImages } from '../utils';

export interface TapImageCorouselProps {
  imageUrls: string[];
}
export default function TapImageCorousel(props: TapImageCorouselProps) {
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const currentPicture = props.imageUrls[currentPictureIndex];

  //Preload images
  useEffect(() => {
    preloadImages(props.imageUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //

  function handleToggleOfPictures(e: GestureResponderEvent) {
    e.stopPropagation();
    const index = currentPictureIndex + 1;
    if (index >= props.imageUrls.length) {
      setCurrentPictureIndex(0);
    } else {
      setCurrentPictureIndex(index);
    }
  }

  function renderSelectorPoints() {
    return props.imageUrls.map((_, index) => {
      const backgroundColor = index === currentPictureIndex ? 'white' : 'grey';
      return <View style={[styles.selectorPoint, { backgroundColor }]} />;
    });
  }

  return (
    <View onTouchStart={handleToggleOfPictures}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: currentPicture }}
      />
      <View style={styles.selectorContainer}>{renderSelectorPoints()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  selectorContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
    // left: '100%',
    // right: '100%',
    // paddingHorizontal: '40%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectorPoint: {
    width: 30,
    height: 2,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginHorizontal: 2,
  },
});

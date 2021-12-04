import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text } from 'react-native';
import { defaultShadow } from '../constants';
import { TabHeight } from './Tabs';
import Interactable from 'react-native-interactable';

const WindowHeight = Dimensions.get('screen').height;
const WindowWidth = Dimensions.get('screen').width;
const BottomMargin = 100;

const defaultTimeouot = 150;
type DiscardDirection = 'left' | 'right' | 'center';
export interface ProfileCardProps {
  name: string;
  onDiscard?: () => void;
  timeoutOnDiscard?: number;
}
export default function ProfileCard(props: ProfileCardProps) {
  const inputRanges = [
    -(WindowWidth + WindowWidth / 2),
    0,
    WindowWidth + WindowWidth / 2,
  ];
  const snapPoints = [
    { id: 'left', x: inputRanges[0] },
    { id: 'center', x: inputRanges[1], damping: 0.5 },
    { id: 'right', x: inputRanges[2] },
  ];

  const scale = useRef(new Animated.Value(0)).current;

  // Start mount animation
  useEffect(() => {
    Animated.timing(scale, {
      easing: Easing.elastic(1),
      duration: 200,
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, []);
  //

  const deltaX = useRef(new Animated.Value(0)).current;
  const deltaY = useRef(new Animated.Value(0)).current;

  const rotation = deltaX.interpolate({
    inputRange: inputRanges,
    outputRange: ['-40deg', '0deg', '40deg'],
  });

  function handleDiscard() {
    if (props.onDiscard) {
      setTimeout(props.onDiscard, props.timeoutOnDiscard || defaultTimeouot);
    }
  }

  return (
    <Interactable.View
      style={styles.interactableContainer}
      animatedNativeDriver={true}
      snapPoints={snapPoints}
      animatedValueX={deltaX}
      animatedValueY={deltaY}
      gravityPoints={[
        { x: 0, y: 0, strength: 7000, falloff: 40, damping: 0.5 },
      ]}
      onSnap={(event: Interactable.ISnapEvent) => {
        const snapDirection = event.nativeEvent.id as DiscardDirection;
        if (snapDirection !== 'center') {
          handleDiscard();
        }
      }}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ rotate: rotation }, { scale }],
          },
        ]}>
        <Text style={styles.title}>{props.name}</Text>
      </Animated.View>
    </Interactable.View>
  );
}

const styles = StyleSheet.create({
  interactableContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: WindowHeight - TabHeight - BottomMargin,
  },
  container: {
    flex: 1,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    ...defaultShadow,
  },
  title: {
    fontSize: 36,
    color: 'black',
  },
});

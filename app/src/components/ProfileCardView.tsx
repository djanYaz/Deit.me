import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native';
import { defaultShadow } from '../constants';
import { TabHeight } from './Tabs';
import Interactable from 'react-native-interactable';
import ProfileCardContent, {
  ProfileCardContentProps,
} from './ProfileCardContent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const WindowHeight = Dimensions.get('screen').height;
const WindowWidth = Dimensions.get('screen').width;
const BottomMargin = 100;

const defaultTimeouot = 100;
type DiscardDirection = 'left' | 'right' | 'center';
export interface ProfileCardProps extends ProfileCardContentProps {
  onSwipe?: (direction: DiscardDirection) => void;
  timeoutOnDiscard?: number;
}
export default function ProfileCardView(props: ProfileCardProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //

  const deltaX = useRef(new Animated.Value(0)).current;
  const deltaY = useRef(new Animated.Value(0)).current;
  var cardRef = useRef<any>().current;

  const rotation = deltaX.interpolate({
    inputRange: inputRanges,
    outputRange: ['-40deg', '0deg', '40deg'],
  });

  const iconScale = deltaX.interpolate({
    inputRange: inputRanges,
    outputRange: [3, 0, 3],
  });

  function handleLike() {
    if (cardRef) {
      cardRef.snapTo({ index: 2 });
    }
  }

  function handleDislike() {
    if (cardRef) {
      cardRef.snapTo({ index: 0 });
    }
  }

  function handleDiscard(direction: DiscardDirection) {
    if (props.onSwipe) {
      setTimeout(
        () => props.onSwipe && props.onSwipe(direction),
        props.timeoutOnDiscard || defaultTimeouot,
      );
    }
  }

  return (
    <Interactable.View
      style={{
        height: WindowHeight - TabHeight - BottomMargin,
        ...styles.interactableContainer,
      }}
      ref={ref => (cardRef = ref)}
      animatedNativeDriver={true}
      snapPoints={snapPoints}
      animatedValueX={deltaX}
      animatedValueY={deltaY}
      gravityPoints={[
        {
          x: 0,
          y: 0,
          strength: 2000,
          falloff: 40,
          damping: 1,
        },
      ]}
      onSnap={(event: Interactable.ISnapEvent) => {
        const snapDirection = event.nativeEvent.id as DiscardDirection;
        if (snapDirection !== 'center') {
          handleDiscard(snapDirection);
        }
      }}>
      <Animated.View
        style={{
          ...styles.likeHelperIcon,
          transform: [{ scale: iconScale }],
        }}>
        <FontAwesome5Icon
          size={64}
          style={styles.icon}
          name="heart"
          color="black"
          solid
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ rotate: rotation }, { scale }],
          },
        ]}>
        <ProfileCardContent
          {...(props as ProfileCardContentProps)}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.dislikeHelperIcon,
          transform: [{ scale: iconScale }],
        }}>
        <FontAwesome5Icon
          style={styles.icon}
          size={64}
          name="times"
          color="black"
        />
      </Animated.View>
    </Interactable.View>
  );
}

const styles = StyleSheet.create({
  interactableContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  likeHelperIcon: {
    marginLeft: -48,
    marginRight: 0,
  },
  dislikeHelperIcon: {
    marginRight: -48,
    marginLeft: 0,
  },
  icon: { width: 64, height: 64 },
  container: {
    flex: 1,
    width: '90%',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    ...defaultShadow,
  },
});

import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { defaultShadow } from '../constants';
import { TabHeight } from './Tabs';
import Interactable from 'react-native-interactable';

const WindowHeight = Dimensions.get('screen').height;
const WindowWidth = Dimensions.get('screen').width;
const BottomMargin = 100;
type DiscardDirection = 'left' | 'right' | 'center';
const snapPoints = {
  left: { x: -WindowWidth },
  right: { x: WindowWidth },
  center: { y: 0 },
};
export default function ProfileCard() {
  const [discard, setDiscard] = useState<DiscardDirection>('center');
  const [alert, setAlert] = useState<DiscardDirection>('center');
  const snapPoint = [snapPoints[discard]];
  return (
    <Interactable.View
      style={{
        ...{ height: WindowHeight - TabHeight - BottomMargin },
        ...styles.container,
      }}
      animatedNativeDriver={true}
      snapPoints={snapPoint}
      alertAreas={[
        {
          id: 'left',
          influenceArea: { left: -(WindowWidth / 2) },
        },
        {
          id: 'right',
          influenceArea: { right: WindowWidth / 2 },
        },
      ]}
      gravityPoints={[
        { x: 0, y: 0, strength: 8000, falloff: 40, damping: 0.5 },
      ]}
      onSnap={() => {
        if (alert) {
          setDiscard(alert);
          setAlert('center');
        }
        if (discard) {
          console.log('discard');
        }
      }}
      onAlert={(event: Interactable.IAlertEvent) => {
        //@ts-ignore
        const key = Object.keys(event.nativeEvent)[0];
        if (event.nativeEvent[key] === 'leave') {
          setAlert(key as any);
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    ...defaultShadow,
  },
});

import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { defaultShadow } from '../constants';

const defaultSize = 64;
export interface CircleButtonIconProps {
  iconName: string;
  size?: number;
  tintColor: string;
  style?: ViewStyle;
  onPress?: () => void;
}
export default function CircleButtonIcon(props: CircleButtonIconProps) {
  const size = props.size || defaultSize;
  return (
    <TouchableOpacity
      onPressOut={props.onPress}
      style={[styles.container, { height: size, width: size }, props.style]}>
      <FontAwesome5Icon
        size={size * 0.8}
        name={props.iconName}
        color={props.tintColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    ...defaultShadow,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

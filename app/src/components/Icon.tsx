import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  style?: ViewStyle;
  onPress?: () => void;
  size?: number;
  tintColor?: string;
  name: string;
}

export default function Icon(props: Props) {
  function handlePress(e: GestureResponderEvent) {
    e.stopPropagation();
    if (props.onPress) {
      props.onPress();
    }
  }
  const size = props.size || 32;
  return (
    <View style={[styles.icon, props.style]}>
      <TouchableOpacity
        onPress={handlePress}
        hitSlop={{ top: size, bottom: size, left: size, right: size }}>
        <FontAwesome5Icon
          name={props.name}
          size={size}
          color={props.tintColor || '#987bf3'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 32,
    width: 32,
    height: 32,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 32,
    shadowOpacity: 1.0,
    elevation: 32,
  },
});

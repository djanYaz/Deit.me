import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface CustomButtonProps {
  title: string;
  tintColor?: string;
}
export default function CustomButton(
  props: TouchableOpacityProps & CustomButtonProps,
) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, props.style, props.disabled && styles.disabled]}>
      <Text style={[styles.text, { color: props.tintColor }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#b87cd9',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: 'white',
  },
});

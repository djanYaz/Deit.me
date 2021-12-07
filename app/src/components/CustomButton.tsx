import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface CustomButtonProps {
  title: string;
}
export default function CustomButton(
  props: TouchableOpacityProps & CustomButtonProps,
) {
  return (
    <TouchableOpacity {...props} style={[props.style, styles.button]}>
      <Text style={styles.text}>{props.title}</Text>
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
  text: {
    color: 'white',
  },
});

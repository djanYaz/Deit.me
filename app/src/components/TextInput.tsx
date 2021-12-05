import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function CustomTextInput(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="grey"
      {...props}
      style={[props.style, styles.input]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 32,
    borderColor: '#b87cd9',
    borderWidth: 2,
    borderRadius: 8,
    color: 'black',
    padding: 8,
    marginVertical: 8,
  },
});

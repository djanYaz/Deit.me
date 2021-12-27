import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export interface CustomTextInputProps extends TextInputProps {
  id?: string;
  onChangeText?: (text: string, id?: string) => void;
}
export default function CustomTextInput(props: CustomTextInputProps) {
  function handleTextInput(text: string) {
    if (props.onChangeText) {
      props.onChangeText(text, props.id);
    }
  }
  return (
    <TextInput
      placeholderTextColor="grey"
      {...props}
      onChangeText={handleTextInput}
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

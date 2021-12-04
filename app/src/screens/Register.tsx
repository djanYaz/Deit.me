import React from 'react';
import { StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/CustomTextInput';

export default function Register() {
  return (
    <ScreenView style={styles.container}>
      <CustomTextInput placeholder="email" />
      <CustomTextInput
        placeholder="password"
        textContentType="password"
        secureTextEntry
      />
      <CustomButton title="Register" />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

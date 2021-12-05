import React from 'react';
import { StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/TextInput';
import rootNavigation from '../rootNavigation';

export default function Register() {
  function handleRegister() {
    rootNavigation.reset('Main');
  }
  return (
    <ScreenView style={styles.container}>
      <CustomTextInput placeholder="email" />
      <CustomTextInput
        placeholder="password"
        textContentType="password"
        secureTextEntry
      />
      <CustomButton title="Register" onPress={handleRegister} />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

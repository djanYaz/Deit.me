import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/TextInput';
import rootNavigation from '../rootNavigation';
import user from '../services/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  function handleRegister() {
    rootNavigation.navigate('Register');
  }

  async function handleLogin() {
    const response = await user.login(email, password);
    if (response) {
      setError(undefined);
      rootNavigation.navigate('MainScreen');
    } else {
      setError('Невалиден email или парола');
    }
  }

  return (
    <ScreenView style={styles.container}>
      <Text style={styles.title}>Deit.me</Text>
      <CustomTextInput
        placeholder="First name"
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        placeholder="Last name"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          style={styles.button}
        />
        <CustomButton
          title="Register"
          onPress={handleRegister}
          style={styles.button}
        />
      </View>
    </ScreenView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 48,
    color: 'grey',
  },
  errorText: {
    color: 'red',
  },
  button: {
    marginHorizontal: 12,
    width: 150,
  },
});

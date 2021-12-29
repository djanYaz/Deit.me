import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScreenView from '../components/ScreenView';
import rootNavigation from '../rootNavigation';
import user from '../services/user';

export default function Profile() {
  async function handleLogOut() {
    await user.logout();
    rootNavigation.reset('Login');
  }
  return (
    <ScreenView style={styles.container}>
      <Text style={{ color: 'black', fontSize: 32 }}>Profile screen</Text>
      <CustomButton title="Log out" onPress={handleLogOut} />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ScreenView from '../components/ScreenView';

export default function Profile() {
  return (
    <ScreenView style={styles.container}>
      <Text style={{ color: 'black', fontSize: 32 }}>Profile screen</Text>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

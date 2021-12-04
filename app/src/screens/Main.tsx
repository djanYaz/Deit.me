import React from 'react';
import { StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import ScreenView from '../components/ScreenView';

export default function Main() {
  return (
    <ScreenView style={styles.container}>
      <ProfileCard />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 32,
  },
});

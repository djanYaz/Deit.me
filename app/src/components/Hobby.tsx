import React from 'react';
import { StyleSheet, Text } from 'react-native';

export interface HobbyProps {
  name: string;
}
export default function Hobby(props: HobbyProps) {
  return <Text style={styles.hobby}>{props.name}</Text>;
}

const styles = StyleSheet.create({
  hobby: {
    color: 'white',
    textAlign: 'center',
    borderRadius: 32,
    fontSize: 16,
    backgroundColor: '#b87cd9',
    paddingVertical: 2,
    paddingHorizontal: 8,
    margin: 1,
  },
});

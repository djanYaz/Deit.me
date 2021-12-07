import React from 'react';
import { StyleSheet, Text } from 'react-native';

const defaultTintColor = '#b87cd9';
export interface HobbyProps {
  name: string;
  onPress?: () => void;
  tintColor?: string;
}
export default function Hobby(props: HobbyProps) {
  const backgroundColor = {
    backgroundColor: props.tintColor || defaultTintColor,
  };
  return (
    <Text onPress={props.onPress} style={[styles.hobby, backgroundColor]}>
      {props.name}
    </Text>
  );
}

const styles = StyleSheet.create({
  hobby: {
    color: 'white',
    textAlign: 'center',
    borderRadius: 32,
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 8,
    margin: 1,
  },
});

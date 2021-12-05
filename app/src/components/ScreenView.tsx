import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function ScreenView(props: ViewProps) {
  return (
    <View {...props} style={[props.style, styles.container]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(127, 93, 240, 0.1)',
  },
});

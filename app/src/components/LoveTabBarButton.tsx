import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LoveTabBarButton(props: BottomTabBarButtonProps) {
  return (
    <TouchableOpacity {...props} style={styles.touchContaienr}>
      <View style={styles.viewContainer}>{props.children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchContaienr: {
    top: -32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#b87cd9',
    borderRadius: 64,
  },
});

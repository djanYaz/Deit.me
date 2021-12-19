import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewProps } from 'react-native';

export interface ScreenViewProps extends ViewProps {
  loading?: boolean;
}
export default function ScreenView(props: ScreenViewProps) {
  return (
    <View {...props} style={[props.style, styles.container]}>
      {props.children}
      {props.loading && (
        <ActivityIndicator style={styles.loading} size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(127, 93, 240, 0.1)',
  },
  loading: {
    position: 'absolute',
    marginHorizontal: '50%',
    marginVertical: '50%',
  },
});

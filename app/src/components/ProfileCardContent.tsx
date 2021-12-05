import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CircleButtonIcon from './CircleButtonIcon';

export interface ProfileCardContentProps {
  name: string;
  profilePicture: string;
  age: number;
  description: string;
  location: string;
}
export default function ProfileCardContent(props: ProfileCardContentProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: props.profilePicture }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {props.name}
          <Text style={styles.age}>, {props.age}</Text>
        </Text>

        <Text style={[styles.subtitle, styles.location]}>{props.location}</Text>
        <Text style={styles.subtitle} numberOfLines={4}>
          {props.description}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CircleButtonIcon iconName="heart" tintColor="#f50a4d" />
        <CircleButtonIcon iconName="times" tintColor="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  age: {
    fontSize: 26,
    fontWeight: 'normal',
    color: '#404040',
  },
  location: {
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
});

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CircleButtonIcon from './CircleButtonIcon';
import Hobby from './Hobby';
import { TabHeight } from './Tabs';
import TapImageCorousel from './TapImageCarousel';

export interface ProfileCardContentProps {
  name: string;
  pictures: string[];
  age: number;
  description: string;
  location: string;
  hobbies: string[];
  onLike?: () => void;
  onDislike?: () => void;
  onPress?: () => void;
  showButtons?: boolean;
  showDescription?: boolean;
  showHobies?: boolean;
}
export default function ProfileCardContent(props: ProfileCardContentProps) {
  function renderButtonContainer() {
    return (
      <View style={styles.buttonContainer}>
        <CircleButtonIcon
          iconName="heart"
          tintColor="#f50a4d"
          onPress={props.onLike}
        />
        <CircleButtonIcon
          iconName="info"
          tintColor="grey"
          onPress={props.onPress}
        />
        <CircleButtonIcon
          iconName="times"
          tintColor="black"
          onPress={props.onDislike}
        />
      </View>
    );
  }

  function renderDescription() {
    const paddingBottom = TabHeight + 20;
    return (
      <Text style={[styles.subtitle, { paddingBottom }]}>
        {props.description}
      </Text>
    );
  }

  function renderHobbies() {
    return (
      <View style={styles.hobbyContainer}>
        {props.hobbies.map(hobby => {
          return <Hobby name={hobby} />;
        })}
      </View>
    );
  }

  const showButtons =
    props.showButtons === undefined ? true : props.showButtons;
  return (
    <ScrollView style={styles.container}>
      <TapImageCorousel imageUrls={props.pictures} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {props.name}
          <Text style={styles.age}>, {props.age}</Text>
        </Text>
        {props.showHobies && renderHobbies()}
        <Text style={[styles.subtitle, styles.location]}>{props.location}</Text>
        {props.showDescription && renderDescription()}
      </View>
      {showButtons && renderButtonContainer()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  age: {
    fontSize: 32,
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
    width: '100%',
  },
  container: {
    flex: 1,
    // flexGrow: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  hobbyContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CircleButtonIcon from './CircleButtonIcon';
import { TabHeight } from './Tabs';
import TapImageCorousel from './TapImageCarousel';

export interface ProfileCardContentProps {
  name: string;
  pictures: string[];
  age: number;
  description: string;
  location: string;
  onLike?: () => void;
  onDislike?: () => void;
  onPress?: () => void;
  showButtons?: boolean;
  showDescription?: boolean;
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
    return (
      <Text style={[styles.subtitle, styles.description]}>
        {props.description}
      </Text>
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
  description: {
    paddingBottom: TabHeight + 20,
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
});

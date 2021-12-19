import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import Hobby from '../components/Hobby';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/TextInput';
import rootNavigation from '../rootNavigation';

const defaultHobbies = [
  '1.9TDI',
  'Tesni P',
  'Macki',
  'BMW',
  'Dupe',
  'Cross',
  'Drift',
  'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
  // 'Macki',
  // 'BMW',
  // 'Dupe',
  // 'Cross',
  // 'Drift',
  // 'Cici',
  // 'MMA',
  // 'Cars',
];
const slideAnimationDuration = 300;

export default function Register() {
  const [hobbies, setHobbies] = useState(defaultHobbies);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const parts = [
    renderPersonalInformationPath(),
    renderCredentialsPart(),
    renderInfoPart(),
    renderHobbies(),
  ];
  const [registrationPart, setRegistrationPart] = useState(0);
  const animationX = useRef(new Animated.Value(0)).current;
  const slideOutAnimation = Animated.sequence([
    Animated.timing(animationX, {
      toValue: -Dimensions.get('window').width,
      duration: slideAnimationDuration,
      useNativeDriver: true,
    }),
    Animated.timing(animationX, {
      toValue: Dimensions.get('window').width,
      duration: 0,
      useNativeDriver: true,
    }),
  ]);
  const slideInAnimation = Animated.timing(animationX, {
    toValue: 0,
    duration: slideAnimationDuration,
    useNativeDriver: true,
  });
  function handleRegister() {
    if (registrationPart >= parts.length - 1) {
      rootNavigation.reset('MainScreen');
    } else {
      slideOutAnimation.start(() => {
        setRegistrationPart(registrationPart + 1);
        slideInAnimation.start();
      });
    }
  }

  function handleSelectHobby(name: string, index: number) {
    selectedHobbies.push(hobbies[index]);
    setSelectedHobbies([...selectedHobbies]);
    hobbies.splice(index, 1);
    setHobbies([...hobbies]);
  }

  function handleDeselectHobby(name: string, index: number) {
    selectedHobbies.splice(index, 1);
    setSelectedHobbies([...selectedHobbies]);
    hobbies.push(name);
    setHobbies([...hobbies]);
  }

  function getRegisterButtonName() {
    return registrationPart >= parts.length - 1 ? 'Register' : 'Next';
  }

  function renderPersonalInformationPath() {
    return (
      <>
        <CustomTextInput placeholder="First name" />
        <CustomTextInput placeholder="Last name" />
        <CustomTextInput placeholder="Date of birth" />
        <CustomTextInput placeholder="Gender" />
        <CustomTextInput placeholder="Sexuality" />
      </>
    );
  }

  function renderCredentialsPart() {
    return (
      <>
        <CustomTextInput placeholder="email" />
        <CustomTextInput
          placeholder="password"
          textContentType="password"
          secureTextEntry
        />
      </>
    );
  }

  function renderInfoPart() {
    return <Text style={styles.title}>Now we'll add your interests...</Text>;
  }

  function renderHobbies() {
    const hobbiesComponents = hobbies.map((hobby, index) => {
      return (
        <Hobby name={hobby} onPress={() => handleSelectHobby(hobby, index)} />
      );
    });
    const selectedHobbiesComponents = selectedHobbies.map((hobby, index) => {
      return (
        <Hobby
          name={hobby}
          onPress={() => handleDeselectHobby(hobby, index)}
          tintColor="black"
        />
      );
    });
    return (
      <ScrollView style={styles.hobbiesScrollContainer}>
        <View style={styles.hobbiesContainer}>
          {selectedHobbiesComponents}
          {hobbiesComponents}
        </View>
      </ScrollView>
    );
  }

  function handleRenderOfPart() {
    const translate = {
      transform: [{ translateX: animationX }],
    };
    return (
      <Animated.View style={[styles.partContainer, translate]}>
        {parts[registrationPart]}
      </Animated.View>
    );
  }

  return (
    <ScreenView style={styles.container}>
      <Text style={styles.title}>Deit.me</Text>
      {handleRenderOfPart()}
      <CustomButton
        title={getRegisterButtonName()}
        onPress={handleRegister}
        style={styles.button}
      />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 64,
    alignItems: 'center',
  },
  partContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: 'grey',
  },
  button: {
    width: 200,
  },
  hobbiesContainer: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    padding: 32,
  },
  hobbiesScrollContainer: {
    height: '70%',
  },
});

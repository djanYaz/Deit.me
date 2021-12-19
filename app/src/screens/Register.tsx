import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import Hobby from '../components/Hobby';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/TextInput';
import { API_URL } from '../constants';
import rootNavigation from '../rootNavigation';
import { makeRequest } from '../utils';

const slideAnimationDuration = 300;

export default function Register() {
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<any[]>([]);
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

  useEffect(() => {
    // Load hobbies
    (async () => {
      const response = await makeRequest(API_URL + 'api/hobby', 'GET');
      if (response) {
        setHobbies([...response.data]);
      }
    })();
  }, []);

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

  function handleSelectHobby(index: number) {
    selectedHobbies.push(hobbies[index]);
    setSelectedHobbies([...selectedHobbies]);
    hobbies.splice(index, 1);
    setHobbies([...hobbies]);
  }

  function handleDeselectHobby(index: number) {
    selectedHobbies.splice(index, 1);
    setSelectedHobbies([...selectedHobbies]);
    hobbies.push([...selectedHobbies[index]]);
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
    const hobbiesComponents = hobbies.map((item, index) => {
      return (
        <Hobby name={item.hobby} onPress={() => handleSelectHobby(index)} />
      );
    });
    const selectedHobbiesComponents = selectedHobbies.map((item, index) => {
      return (
        <Hobby
          name={item.hobby}
          onPress={() => handleDeselectHobby(index)}
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

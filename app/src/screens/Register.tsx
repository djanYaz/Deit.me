import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import Hobby from '../components/Hobby';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/TextInput';
import ToggleList from '../components/ToggleList';
import rootNavigation from '../rootNavigation';
import hobbyService from '../services/hobby';
import user from '../services/user';
import { IHobby, UserRegisterDTO } from '../types';
import { hobbyListToFlatMap } from '../utils';

const slideAnimationDuration = 300;
const defaultRegistrationInfo: UserRegisterDTO = {
  email: undefined,
  firstName: undefined,
  gender: 'male',
  hobbies: undefined,
  lastName: undefined,
  password: undefined,
  phoneNumber: undefined,
  preference: 'male',
};
export default function Register() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [registrationInfo, setRegistrationInfo] = useState<UserRegisterDTO>(
    defaultRegistrationInfo,
  );
  const [hobbies, setHobbies] = useState<Array<IHobby>>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<Array<IHobby>>([]);
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
      const response = await hobbyService.getAll();
      if (response) {
        setHobbies([...response.data]);
      }
    })();
  }, []);

  async function handleRegisterService() {
    const info = {
      ...registrationInfo,
      hobbies: hobbyListToFlatMap(selectedHobbies),
    };
    // Check for unfilled data
    for (var value of Object.values(info)) {
      if (value === undefined) {
        setError('Please enter all input field');
        return false;
      }
    }
    // Clear error message
    setError(undefined);
    console.log('Registering:', info);
    return await user.register(info);
  }

  async function handleRegister() {
    if (registrationPart >= parts.length - 1) {
      const response = await handleRegisterService();
      if (response) {
        rootNavigation.reset('MainScreen');
      }
    } else {
      slideOutAnimation.start(() => {
        setRegistrationPart(registrationPart + 1);
        slideInAnimation.start();
      });
    }
  }

  function handleBack() {
    if (registrationPart <= 0) {
      rootNavigation.navigate('Login');
    } else {
      setRegistrationPart(registrationPart - 1);
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
    hobbies.push(selectedHobbies[index]);
    setHobbies([...hobbies]);
  }

  function getRegisterButtonName() {
    return registrationPart >= parts.length - 1 ? 'Register' : 'Next';
  }

  function handleTextInput(text: string, key?: string) {
    if (!key) {
      return;
    }
    const entry = { [key]: text };
    const info = { ...registrationInfo, ...entry };
    // console.log('info', info);
    setRegistrationInfo(info);
  }

  function renderPersonalInformationPath() {
    return (
      <>
        <CustomTextInput
          onChangeText={handleTextInput}
          placeholder="First name"
          id="firstName"
          value={registrationInfo.firstName}
        />
        <CustomTextInput
          onChangeText={handleTextInput}
          placeholder="Last name"
          id="lastName"
          value={registrationInfo.lastName}
        />
        {/* <CustomTextInput
          onChangeText={handleTextInput}
          placeholder="Gender"
          id="gender"
          value={registrationInfo.gender}
        /> */}
        <ToggleList
          style={styles.input}
          title="Gender"
          onChange={v => handleTextInput(v, 'gender')}
          list={['male', 'female']}
        />
        {/* <CustomTextInput
          onChangeText={handleTextInput}
          placeholder="Sexual Preference"
          id="preference"
          value={registrationInfo.preference}
        /> */}
        <ToggleList
          style={styles.input}
          title="Sexual Preference"
          onChange={v => handleTextInput(v, 'preference')}
          list={['male', 'female']}
        />
      </>
    );
  }

  function renderCredentialsPart() {
    return (
      <>
        <CustomTextInput
          onChangeText={handleTextInput}
          id="email"
          value={registrationInfo.email}
          placeholder="Email"
        />
        <CustomTextInput
          onChangeText={handleTextInput}
          id="phoneNumber"
          value={registrationInfo.phoneNumber}
          placeholder="Phone Number"
        />
        <CustomTextInput
          placeholder="Password"
          onChangeText={handleTextInput}
          id="password"
          value={registrationInfo.password}
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
      <Text style={styles.errorText}>{error}</Text>
      {handleRenderOfPart()}
      <View style={styles.buttonContainer}>
        <CustomButton title="Back" onPress={handleBack} style={styles.button} />
        <CustomButton
          title={getRegisterButtonName()}
          onPress={handleRegister}
          style={styles.button}
        />
      </View>
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
    width: 150,
    marginHorizontal: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
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
  input: {
    width: '80%',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

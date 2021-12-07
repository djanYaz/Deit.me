import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScreenView from '../components/ScreenView';
import CustomTextInput from '../components/TextInput';
import rootNavigation from '../rootNavigation';

export default function Register() {
  const parts = [renderPersonalInformationPath(), renderCredentialsPart()];
  const [registrationPart, setRegistrationPart] = useState(0);
  const animationX = useRef(new Animated.Value(0)).current;
  const slideAnimationDuration = 300;
  const slideOutAnimation = Animated.sequence([
    Animated.timing(animationX, {
      toValue: -Dimensions.get('window').width,
      duration: slideAnimationDuration,
      useNativeDriver: true,
    }),
    Animated.timing(animationX, {
      toValue: Dimensions.get('window').width,
      duration: 0,
      delay: slideAnimationDuration,
      useNativeDriver: true,
    }),
  ]);
  const slideInAnimation = Animated.timing(animationX, {
    toValue: 0,
    duration: slideAnimationDuration,
    delay: slideAnimationDuration,
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
        <CustomTextInput style={styles.input} placeholder="email" />
        <CustomTextInput
          placeholder="password"
          textContentType="password"
          secureTextEntry
          style={styles.input}
        />
      </>
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
      {handleRenderOfPart()}
      <CustomButton title={getRegisterButtonName()} onPress={handleRegister} />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  partContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {},
});

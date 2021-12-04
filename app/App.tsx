import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, RootStackParamList } from './src/rootNavigation';
import Register from './src/screens/Register';
import Main from './src/screens/Main';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Screens />
    </NavigationContainer>
  );
};

export default App;

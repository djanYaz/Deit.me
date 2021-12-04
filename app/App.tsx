import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  navigationRef,
  RootStackParamList,
  RootTabParamList,
} from './src/rootNavigation';
import Register from './src/screens/Register';
import Main from './src/screens/Main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Messages from './src/screens/Messages';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const Screens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={Tabs} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#b87cd9',
      }}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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

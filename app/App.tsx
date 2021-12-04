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
import LoveTabBarButton from './src/components/LoveTabBarButton';

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
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 32,
          elevation: 32,
          backgroundColor: 'white',
          borderWidth: 0,
          borderColor: 'white',
        },
      }}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarButton: LoveTabBarButton,
        }}
      />
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

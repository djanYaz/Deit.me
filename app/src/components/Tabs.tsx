import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Tab } from '../../App';
import Main from '../screens/Main';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import LoveTabBarButton from './LoveTabBarButton';

export default function Tabs() {
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
          elevation: 5,
          backgroundColor: 'white',
          borderWidth: 0,
          borderColor: 'white',
          height: 64,
          paddingBottom: 8,
          shadowColor: '#7f5df0',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        },
      }}>
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: props => (
            <FontAwesome5Icon {...props} name="comment" solid={props.focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: _props => null,
          tabBarIcon: props => (
            <FontAwesome5Icon
              {...props}
              name="heart"
              color="white"
              solid={props.focused}
            />
          ),
          tabBarButton: LoveTabBarButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => (
            <FontAwesome5Icon {...props} name="user" solid={props.focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

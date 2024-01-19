import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Songs from '../screens/Songs/Songs';
import Player from '../screens/Player/Player';

const Tab = createBottomTabNavigator();

export const HomeBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Songs"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Songs" component={Songs} />
      <Tab.Screen name="Player" component={Player} />
    </Tab.Navigator>
  );
};

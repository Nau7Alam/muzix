import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Albums from '../screens/Albums/Albums';
import AlbumDetail from '../screens/AlbumDetail/AlbumDetail';

const AlbmStack = createStackNavigator();
const AlbumStack = () => {
  return (
    <AlbmStack.Navigator
      initialRouteName="AlbumList"
      screenOptions={{ headerShown: false }}
    >
      <AlbmStack.Screen name="AlbumList" component={Albums} />
      <AlbmStack.Screen name="AlbumDetail" component={AlbumDetail} />
    </AlbmStack.Navigator>
  );
};

export default AlbumStack;

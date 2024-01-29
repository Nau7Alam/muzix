import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Playlists from '../screens/Playlists/Playlists';
import PlaylistDetail from '../screens/PlaylistDetail/PlaylistDetail';

const AlbmStack = createStackNavigator();
const PlaylistStack = () => {
  return (
    <AlbmStack.Navigator
      initialRouteName="PlaylistList"
      screenOptions={{ headerShown: false }}
    >
      <AlbmStack.Screen name="PlaylistList" component={Playlists} />
      <AlbmStack.Screen name="PlaylistDetail" component={PlaylistDetail} />
    </AlbmStack.Navigator>
  );
};

export default PlaylistStack;

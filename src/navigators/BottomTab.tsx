import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Songs from '../screens/Songs/Songs';
import Player from '../screens/Player/Player';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useTheme } from '@react-navigation/native';
import { IColors, ITheme } from '../theme/theme.interface';
import Settings from '../screens/Settings/Settings';
import { StyleSheet } from 'react-native';
import AlbumStack from './AlbumStack';
import PlaylistStack from './PlaylistStack';

const Tab = createBottomTabNavigator();

const renderIcons = (
  route: any,
  focused: any,
  colors: IColors,
  fontSize: any,
  styles: any
) => {
  let iconName = '';
  let iconSize = focused ? fontSize.xlg : fontSize.lg;
  let iconColor = focused ? colors.white : colors.text;
  if (route.name === 'Player') {
    iconName = 'disc';
  } else if (route.name === 'Songs') {
    iconName = 'music-tone';
  } else if (route.name === 'Settings') {
    iconName = 'settings';
  } else if (route.name === 'Albums') {
    iconName = 'notebook';
  } else if (route.name === 'Playlists') {
    iconName = 'playlist';
  }
  return (
    <Icon
      name={iconName}
      style={[
        styles.tabBarIconStyle,
        { backgroundColor: focused ? colors.primaryDark : colors.cardLight },
      ]}
      color={iconColor}
      size={iconSize}
    />
  );
};

export const HomeBottomTab = () => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createColor(theme), [theme]);
  const { colors, fontSize } = theme;
  return (
    <Tab.Navigator
      initialRouteName="Playlists"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          renderIcons(route, focused, colors, fontSize, styles),
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen name="Songs" component={Songs} />
      <Tab.Screen name="Albums" component={AlbumStack} />
      <Tab.Screen name="Player" component={Player} />
      <Tab.Screen name="Playlists" component={PlaylistStack} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const createColor = ({ colors, fontSize, fontWeight }: ITheme) => {
  return StyleSheet.create({
    tabBarStyle: {
      backgroundColor: colors.cardLight,
      height: 60,
      borderRadius: 15,
      margin: 5,
      borderTopColor: colors.transparent,
      overflow: 'hidden',
    },
    tabBarLabelStyle: {
      fontSize: fontSize.xxs,
      paddingBottom: 4,
      fontWeight: fontWeight.semiBold,
    },
    tabBarIconStyle: {
      zIndex: 10,
      bottom: -3,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: 10,
    },
  });
};

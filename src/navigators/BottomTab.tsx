import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Songs from '../screens/Songs/Songs';
import Player from '../screens/Player/Player';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../theme/theme.interface';

const Tab = createBottomTabNavigator();

const renderIcons = (
  route: any,
  focused: any,
  _color: any,
  _size: any,
  colors: any
) => {
  let iconName = '';
  if (route.name === 'Player') {
    iconName = 'disc';
  } else if (route.name === 'Songs') {
    iconName = 'music-tone';
  }
  return (
    <Icon
      name={iconName}
      color={focused ? colors.primary : colors.text}
      size={focused ? 28 : 24}
    />
  );
};

export const HomeBottomTab = () => {
  const { colors } = useTheme() as ITheme;
  return (
    <Tab.Navigator
      initialRouteName="Songs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          renderIcons(route, focused, color, size, colors),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDark,
      })}

      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === 'Home') {
      //       iconName = focused
      //         ? 'ios-information-circle'
      //         : 'ios-information-circle-outline';
      //     } else if (route.name === 'Settings') {
      //       iconName = focused ? 'ios-list' : 'ios-list-outline';
      //     }

      //     // You can return any component that you like here!
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      //   tabBarActiveTintColor: 'tomato',
      //   tabBarInactiveTintColor: 'gray',
      // })}
    >
      <Tab.Screen name="Songs" component={Songs} />
      <Tab.Screen name="Player" component={Player} />
    </Tab.Navigator>
  );
};

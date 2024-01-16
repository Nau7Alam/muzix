import { DefaultTheme } from '@react-navigation/native';
import { ITheme } from './theme.interface';
import {
  SpaceSize,
  FontSize,
  FontWeight,
  width,
  height,
} from '../constants/themeConstant';
export const LightThemes: ITheme = {
  ...DefaultTheme,
  colors: {
    primary: '#fdb5bb',
    primaryLight: '#fdb5bb',
    primaryDark: '#fb737f',

    background: '#f9f9fb',
    backgroundDark: '#ededf3',
    backgroundDarker: '#f9f9fb',

    text: '#404859',
    textLight: '#6b7994',
    textDark: '#242831',

    textSecondary: '#bcbcbe',
    textSecondaryLight: '#efeff0',
    textSecondaryDark: '#bcbcbe',

    danger: '#ff5a51',
    dangerLight: '#ff8680',
    dangerDark: '#ff443a',

    white: '#ffffff',
    black: '#000000',

    success: '#36ec6c',

    border: '#7c7d83',
    borderLight: '#9f9fa4',
    borderDark: '#5b5b60',

    notification: '#c50a00',

    shadow: '#ededef',
    shadowLight: '#fafafa',
    shadowDark: '#e4e4e7',

    card: '#f8f8fa',
    cardLight: '#f9f9fb',
    cardDark: '#ededf2',

    icon: '#6b7994',
    iconLight: '#a1aabb',
    iconDark: '#6b7994',
  },
  fontSize: FontSize,
  fontWeight: FontWeight,
  padding: SpaceSize,
  margin: SpaceSize,
  borderRadius: SpaceSize,
  screen: {
    width: width,
    height: height,
  },
};

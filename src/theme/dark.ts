import { DarkTheme } from '@react-navigation/native';
import { ITheme } from './theme.interface';
import {
  SpaceSize,
  FontSize,
  FontWeight,
  width,
  height,
} from '../constants/themeConstant';

export const DarkThemes: ITheme = {
  ...DarkTheme,
  colors: {
    primary: '#fdb5bb',
    primaryLight: '#fdb5bb',
    primaryDark: '#fb737f',

    background: '#373a4d',
    backgroundDark: '##303243',
    backgroundDarker: '#292c3a',

    text: '#8c9fbf',
    textLight: '#e0e5ee',
    textDark: '#526a94',

    textSecondary: '',
    textSecondaryLight: '',
    textSecondaryDark: '',

    danger: '#ff5a51',
    dangerLight: '#ff8680',
    dangerDark: '#ff443a',

    white: '#fff',
    black: '#000',

    success: '#36ec6c',

    border: '#adbad1',
    borderLight: '#ced6e4',
    borderDark: '#8d9fbf',

    notification: '#c50a00',

    shadow: '#363647',
    shadowLight: '#363647',
    shadowDark: '#373748',

    card: '#424357',
    cardLight: '#595b76',
    cardDark: '#3e3f52',

    icon: '#adbad1',
    iconLight: '#b8c3d7',
    iconDark: '#8fa0c0',
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

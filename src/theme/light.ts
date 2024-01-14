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
    primary: '#fb7985',
    background: '#f8f9fb',
    text: '#4f596d',
    textLight: '#bcbcbe',
    border: '#b9bbc0',
    borderLight: '#d4d5d9',
    notification: 'red',
    shadow: '#ededef',
    card: '#f8f8fa',
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

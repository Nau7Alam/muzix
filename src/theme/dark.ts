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
    primary: '#fb7985',
    background: '#373a4d',
    text: '#8a9dbe',
    textLight: '#596378',
    border: '#58627b',
    borderLight: '#596378',
    notification: 'red',
    shadow: '#363647',
    card: '#424357',
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

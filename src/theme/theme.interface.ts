interface IFontSizes {
  xxxs: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  base: number;
  lg: number;
  xlg: number;
  xxlg: number;
  xxxlg: number;
}

type FontWeightLitral =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

interface IFontWeight {
  thin: FontWeightLitral;
  ultraLight: FontWeightLitral;
  light: FontWeightLitral;
  medium: FontWeightLitral;
  regular: FontWeightLitral;
  semiBold: FontWeightLitral;
  heavy: FontWeightLitral;
  bold: FontWeightLitral;
}

interface ISpaceSizes {
  zero: number;
  two: number;
  four: number;
  six: number;
  eight: number;
  ten: number;
  md: number;
  lg: number;
  xlg: number;
  xxlg: number;
  full: number;
}

export interface IColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  background: string;
  backgroundDark: string;
  backgroundDarker: string;

  text: string;
  textLight: string;
  textDark: string;

  textSecondary: string;
  textSecondaryLight: string;
  textSecondaryDark: string;

  danger: string;
  dangerLight: string;
  dangerDark: string;

  white: string;
  black: string;
  transparent: string;

  success: string;

  border: string;
  borderLight: string;
  borderDark: string;

  notification: string;

  shadow: string;
  shadowLight: string;
  shadowDark: string;

  card: string;
  cardLight: string;
  cardDark: string;

  icon: string;
  iconLight: string;
  iconDark: string;
}
interface IScreen {
  width: number;
  height: number;
}

export interface ITheme {
  colors: IColors;
  dark: boolean;
  fontSize: IFontSizes;
  fontWeight: IFontWeight;
  borderRadius: ISpaceSizes;
  margin: ISpaceSizes;
  padding: ISpaceSizes;
  screen: IScreen;
}

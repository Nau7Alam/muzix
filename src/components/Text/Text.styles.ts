import { StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';

export const setColor = (color: string): Object => {
  return { color };
};

export const createStyles = (
  { fontSize, fontWeight }: ITheme,
  color?: string
) => {
  return StyleSheet.create({
    color: {
      color: color,
    },
    xxxs: {
      fontSize: fontSize.xxxs,
    },
    xxs: {
      fontSize: fontSize.xxs,
    },
    xs: {
      fontSize: fontSize.xs,
    },
    sm: {
      fontSize: fontSize.sm,
    },
    md: {
      fontSize: fontSize.md,
    },
    base: {
      fontSize: fontSize.base,
    },
    lg: {
      fontSize: fontSize.lg,
    },
    xlg: {
      fontSize: fontSize.xlg,
    },
    xxlg: {
      fontSize: fontSize.xxlg,
    },
    xxxlg: {
      fontSize: fontSize.xxxlg,
    },
    thin: {
      fontWeight: fontWeight.thin,
    },
    ultraLight: {
      fontWeight: fontWeight.ultraLight,
    },
    light: {
      fontWeight: fontWeight.light,
    },
    regular: {
      fontWeight: fontWeight.regular,
    },
    medium: {
      fontWeight: fontWeight.medium,
    },
    semiBold: {
      fontWeight: fontWeight.semiBold,
    },
    heavy: {
      fontWeight: fontWeight.heavy,
    },
    bold: {
      fontWeight: fontWeight.bold,
    },
    center: {
      textAlign: 'center',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },
    upperCase: {
      textTransform: 'uppercase',
    },
    lowerCase: {
      textTransform: 'lowercase',
    },
    capitalize: {
      textTransform: 'capitalize',
    },
  });
};

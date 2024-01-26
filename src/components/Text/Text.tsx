import React, { useMemo } from 'react';
import {
  Text as NativeText,
  StyleSheet,
  TextProps as NativeTextProps,
  TextStyle,
} from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { createStyles, setColor } from './Text.styles';

type TextProps = {
  style?: TextStyle;
  xxxs?: boolean;
  xxs?: boolean;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  base?: boolean;
  lg?: boolean;
  xlg?: boolean;
  xxlg?: boolean;
  xxxlg?: boolean;
  thin?: boolean;
  ultraLight?: boolean;
  light?: boolean;
  regular?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  heavy?: boolean;
  bold?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  upperCase?: boolean;
  lowerCase?: boolean;
  capitalize?: boolean;
  color?: string;
} & NativeTextProps;

const Text = ({
  children,
  style: customStyle,
  // Font Sizes
  xxxs,
  xxs,
  xs,
  sm,
  md,
  base,
  lg,
  xlg,
  xxlg,
  xxxlg,
  // Font Weights
  thin,
  ultraLight,
  light,
  regular,
  medium,
  semiBold,
  heavy,
  bold,
  // Text Align
  center,
  left,
  right,
  // Text Case
  upperCase,
  lowerCase,
  capitalize,
  // Text color
  color,
  // Other Text props
  ...rest
}: TextProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyles(theme, color), [theme, color]);

  return (
    <NativeText
      style={[
        color ? setColor(color) : { color: theme.colors.text },
        StyleSheet.flatten([
          xxxs && styles.xxxs,
          xxs && styles.xxs,
          xs && styles.xs,
          sm && styles.sm,
          md && styles.md,
          base && styles.base,
          lg && styles.lg,
          xlg && styles.xlg,
          xxlg && styles.xxlg,
          xxxlg && styles.xxxlg,
          thin && styles.thin,
          ultraLight && styles.ultraLight,
          light && styles.light,
          regular && styles.regular,
          medium && styles.medium,
          semiBold && styles.semiBold,
          heavy && styles.heavy,
          bold && styles.bold,
          center && styles.center,
          left && styles.left,
          right && styles.right,
          upperCase && styles.upperCase,
          lowerCase && styles.lowerCase,
          capitalize && styles.capitalize,
          customStyle,
        ]),
      ]}
      {...rest}
    >
      {children}
    </NativeText>
  );
};

export default Text;

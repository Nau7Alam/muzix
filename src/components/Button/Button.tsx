import React, { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Text from '../Text/Text';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { StyleProp } from 'react-native';

type ButtonProps = {
  onClick: () => void;
  title: string;
  type: string;
  buttonStyle?: StyleProp<ViewStyle>;
};
const Button = ({ onClick, title, type, buttonStyle }: ButtonProps) => {
  const theme = useTheme() as ITheme;
  const { colors } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const titleColor =
    type === 'primary'
      ? theme.colors.white
      : type === 'secondary'
      ? theme.colors.primary
      : colors.text;
  const bgColor =
    type === 'primary'
      ? colors.primary
      : type === 'secondary'
      ? colors.white
      : colors.transparent;

  return (
    <Pressable
      onPress={onClick}
      style={[
        styles.continer,
        buttonStyle,
        {
          backgroundColor: bgColor,
        },
      ]}
    >
      <Text md semiBold center color={titleColor}>
        {title}
      </Text>
    </Pressable>
  );
};

const createStyle = (theme: ITheme) => {
  const { padding, borderRadius } = theme;
  return StyleSheet.create({
    continer: {
      padding: padding.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius.eight,
    },
  });
};

export default Button;

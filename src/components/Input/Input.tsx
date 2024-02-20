import React, { useMemo } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { INPUT_TYPES } from '../../constants/listOptions';

type InputProps = {
  onValueChange: (text: string) => void;
  value: string;
  type?: string;
} & TextInputProps;
const Input = ({
  value,
  onValueChange,
  type,
  style: inputStyle,
  ...otherProps
}: InputProps) => {
  const theme = useTheme() as ITheme;
  const { colors } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const titleColor =
    type === INPUT_TYPES.primary
      ? theme.colors.white
      : type === INPUT_TYPES.secondary
      ? theme.colors.primary
      : colors.text;
  const bgColor =
    type === INPUT_TYPES.primary
      ? colors.primary
      : type === INPUT_TYPES.secondary
      ? colors.white
      : colors.transparent;

  return (
    <TextInput
      style={[
        styles.input,
        inputStyle,
        { color: titleColor, borderColor: bgColor },
      ]}
      value={value}
      placeholderTextColor={colors.borderLight}
      onChangeText={text => onValueChange(text)}
      {...otherProps}
    />
  );
};

const createStyle = (theme: ITheme) => {
  const { padding, borderRadius } = theme;
  return StyleSheet.create({
    input: {
      paddingHorizontal: padding.md,
      paddingVertical: padding.eight,
      borderRadius: borderRadius.six,
      borderWidth: 1.77,
    },
  });
};

export default Input;

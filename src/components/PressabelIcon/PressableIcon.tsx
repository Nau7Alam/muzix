import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';

type PressableIconProps = {
  onPress: () => void;
  size: number;
  color: string;
  name: string;
  buttonStyle?: any;
};
const PressableIcon = ({
  buttonStyle,
  onPress,
  size,
  color,
  name,
}: PressableIconProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <Pressable onPress={onPress} style={[styles.container, buttonStyle]}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};

const createStyle = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      padding: theme.padding.md,
    },
  });
};
export default PressableIcon;

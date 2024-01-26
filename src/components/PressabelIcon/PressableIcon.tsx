import React, { useMemo } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';

type PressableIconProps = {
  name: string;
  size: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
} & PressableProps;
const PressableIcon = ({
  onPress,
  size,
  color,
  name,
  style: customStyle,
}: PressableIconProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <Pressable onPress={onPress} style={[styles.container, customStyle]}>
      <Icon name={name} size={size} color={color ?? theme.colors.icon} />
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

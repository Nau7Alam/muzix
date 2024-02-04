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
import Text from '../Text/Text';

type PressableIconProps = {
  name: string;
  size: number;
  color?: string;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
} & PressableProps;
const PressableIcon = ({
  onPress,
  size,
  color,
  name,
  title,
  style: customStyle,
}: PressableIconProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <Pressable onPress={onPress} style={[styles.container, customStyle]}>
      <Icon name={name} size={size} color={color ?? theme.colors.icon} />
      {!!title && (
        <Text md color={color ?? theme.colors.icon}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const createStyle = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      padding: theme.padding.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.padding.eight,
    },
  });
};
export default PressableIcon;

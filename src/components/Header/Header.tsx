import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Text from '../Text/Text';

export const Header = () => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View style={styles.continer}>
      <PressableIcon
        onPress={() => console.log('MENU')}
        size={theme.fontSize.lg}
        name="menu"
        color={theme.colors.text}
      />
      <View>
        <Text base lg color={theme.colors.primary} style={styles.title}>
          Muzix
        </Text>
      </View>
      <PressableIcon
        onPress={() => console.log('SEARCH')}
        size={theme.fontSize.lg}
        name="magnifier"
        color={theme.colors.text}
      />
    </View>
  );
};

export default Header;

const createStyle = (theme: ITheme) => {
  const { colors, padding } = theme;
  return StyleSheet.create({
    continer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: padding.six,
    },
    title: {},
  });
};

import React, { useMemo } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Text from '../Text/Text';

export const Header = () => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const isLight = Appearance.getColorScheme() === 'light';
  return (
    <View style={styles.continer}>
      <PressableIcon
        onPress={() => {
          Appearance.setColorScheme(isLight ? 'dark' : 'light');
        }}
        size={theme.fontSize.lg}
        name="menu"
        color={theme.colors.text}
      />
      <View>
        <Text md medium color={theme.colors.textDark} style={styles.title}>
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

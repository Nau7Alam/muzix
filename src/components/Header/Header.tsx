import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';

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
        <Text style={styles.title}>Muzix</Text>
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
  const { colors, padding, fontSize, fontWeight } = theme;
  return StyleSheet.create({
    continer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: padding.lg,
    },
    title: {
      fontSize: fontSize.default,
      fontWeight: fontWeight.medium,
    },
  });
};

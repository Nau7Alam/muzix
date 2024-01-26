import React, { useMemo } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Text from '../Text/Text';

type HeaderProps = {
  title?: string;
};

export const Header = ({ title }: HeaderProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const isLight = Appearance.getColorScheme() === 'light';
  return (
    <View style={styles.continer}>
      <PressableIcon
        onPress={() => {
          Appearance.setColorScheme(isLight ? 'dark' : 'light');
        }}
        size={theme.fontSize.xlg}
        style={styles.logo}
        name="music-tone-alt"
        color={theme.colors.text}
      />
      <View style={styles.titleBox}>
        <Text
          numberOfLines={1}
          md
          medium
          center
          color={theme.colors.primaryLight}
          style={styles.title}
        >
          {title ? title : 'Muzix'}
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
      padding: padding.four,
    },
    logo: {
      paddingVertical: 0,
      transform: [{ rotate: '-20deg' }, { translateX: 5 }],
    },
    titleBox: {
      flex: 1,
    },
    title: {},
  });
};

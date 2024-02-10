import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

type HeaderProps = {
  title?: string;
};

export const Header = ({ title }: HeaderProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View style={styles.continer}>
      <Icon
        type="font"
        size={theme.fontSize.xlg + 5}
        style={styles.logo}
        name="headphone"
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
      transform: [{ rotate: '180deg' }, { translateX: -22 }, { translateY: 0 }],
    },
    titleBox: {
      flex: 1,
    },
    title: {},
  });
};

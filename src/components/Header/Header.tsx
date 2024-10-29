import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useNavigation, useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { IconTypes } from '../../constants/typeConstant';

type HeaderProps = {
  title?: string;
  titleNode?: ReactNode;
  rightIcon?: string;
  searchabel?: boolean;
  rightOnClick?: () => void;
  goBack?: boolean;
};

export const Header = ({
  title,
  titleNode,
  goBack,
  rightIcon,
  searchabel = true,
  rightOnClick,
}: HeaderProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const navigation = useNavigation();

  return (
    <View style={styles.continer}>
      {goBack ? (
        <PressableIcon
          onPress={() => navigation.goBack()}
          size={theme.fontSize.lg}
          name="arrow-left"
        />
      ) : (
        <Icon
          type={IconTypes.FONTISTOICON}
          size={theme.fontSize.xlg + 5}
          style={styles.logo}
          name="headphone"
          color={theme.colors.text}
        />
      )}

      <View style={styles.titleBox}>
        {titleNode ? (
          titleNode
        ) : (
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
        )}
      </View>
      {searchabel && (
        <PressableIcon
          onPress={() => {
            if (rightOnClick) {
              rightOnClick();
            } else {
              console.log('SEARCHING.....');
              navigation.navigate('SearchSongs' as never);
            }
          }}
          size={theme.fontSize.lg}
          name={rightIcon ?? 'magnifier'}
          color={theme.colors.text}
        />
      )}
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
      transform: [{ rotate: '180deg' }, { translateX: -10 }, { translateY: 0 }],
    },
    titleBox: {
      flex: 1,
    },
    title: {},
  });
};

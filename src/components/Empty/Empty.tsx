import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { StyleSheet, View } from 'react-native';
import Text from '../Text/Text';
import Avatar from '../Avatar/Avatar';
import { IMAGE_TYPE } from '../../constants/listOptions';

type EmptyProps = {
  image: string;
  title: string;
  message: string;
};

const Empty = ({ image, title, message }: EmptyProps) => {
  const theme = useTheme() as ITheme;
  //   const { colors } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Avatar
          type={IMAGE_TYPE.require}
          style={styles.imageStyle}
          image={image}
        />
        <Text center lg color={theme.colors.textDark}>
          {title}
        </Text>
        <Text center light md color={theme.colors.textLight}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageContainer: {
      gap: theme.padding.four,
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 0.7 * theme.screen.width,
    },
    imageStyle: {
      height: 140,
      width: 160,
      marginBottom: theme.padding.xlg,
    },
  });
};

export default Empty;

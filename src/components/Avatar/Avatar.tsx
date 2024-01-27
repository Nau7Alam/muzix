import React, { useMemo } from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';

type AvatarProps = {
  image?: string;
} & ImageProps;

const Avatar = ({ image, style }: AvatarProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <Image
      style={[styles.coverImage, style]}
      source={
        image
          ? { uri: image }
          : require('../../../assets/images/music_placeholder.png')
      }
      resizeMode="cover"
    />
  );
};

const createStyle = (theme: ITheme) => {
  const { borderRadius, colors } = theme;
  return StyleSheet.create({
    coverImage: {
      height: 50,
      width: 50,
      borderRadius: borderRadius.ten,
    },
    selectedCoverImage: {
      height: 55,
      width: 55,
      borderRadius: borderRadius.full,
      borderColor: colors.cardDark,
      borderWidth: borderRadius.six,
    },
  });
};

export default Avatar;

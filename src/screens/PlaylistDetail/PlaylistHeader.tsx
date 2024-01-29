import React, { useMemo } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useNavigation, useTheme } from '@react-navigation/native';
import PressableIcon from '../../components/PressabelIcon/PressableIcon';
import Text from '../../components/Text/Text';
import { addS } from '../../helpers/utitlities';

type HeaderProps = {
  title: string;
  coverImage?: string;
  songCount: string | number;
  duration: string;
};

export const PlaylistHeader = ({
  title,
  coverImage,
  songCount,
  duration,
}: HeaderProps) => {
  const theme = useTheme() as ITheme;
  const navigation = useNavigation();
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View style={styles.continer}>
      <View style={styles.optionBox}>
        <PressableIcon
          onPress={() => navigation.goBack()}
          size={theme.fontSize.lg}
          name="arrow-left"
          color={theme.colors.white}
        />

        <PressableIcon
          onPress={() => console.log('SEARCH')}
          size={theme.fontSize.lg}
          name="magnifier"
          color={theme.colors.white}
        />
      </View>
      <ImageBackground
        resizeMode={'cover'}
        source={
          coverImage
            ? { uri: coverImage }
            : require('../../../assets/images/music_placeholder.png')
        }
        style={styles.titleBox}
      >
        <View style={styles.titelOver}>
          <Text
            numberOfLines={1}
            lg
            center
            semiBold
            color={theme.colors.white}
            style={styles.title}
          >
            {title ? title : 'Muzix'}
          </Text>
          <Text
            numberOfLines={1}
            sm
            center
            medium
            color={theme.colors.textSecondary}
            style={styles.title}
          >
            Duration : {duration + '・' + addS(songCount, 'Song')}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PlaylistHeader;

const createStyle = (theme: ITheme) => {
  const { colors, padding, screen } = theme;
  return StyleSheet.create({
    continer: {
      backgroundColor: colors.card,
    },
    optionBox: {
      position: 'absolute',
      top: 0,
      width: screen.width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1,
    },
    titleBox: {
      width: screen.width,
      height: screen.height * 0.34,
      position: 'relative',
    },
    titelOver: {
      height: '100%',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.2)',
      paddingHorizontal: padding.xlg,
      paddingVertical: padding.six,
    },
    title: {
      width: '90%',
    },
  });
};

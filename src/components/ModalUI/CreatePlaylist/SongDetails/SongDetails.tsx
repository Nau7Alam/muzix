import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../../../theme/theme.interface';
import Text from '../../../Text/Text';
import { ISong } from '../../../../interfaces/player/music.interface';
import Avatar from '../../../Avatar/Avatar';
import { IMAGE_TYPE } from '../../../../constants/listOptions';
import { secondsToHms } from '../../../../helpers/utitlities';
import Icon from '../../../Icon/Icon';

type SongDetailsProps = {
  song: ISong | null;
};
const SongDetails = ({ song }: SongDetailsProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <ScrollView style={styles.continer}>
      <View style={styles.coverImageBox}>
        <Avatar
          style={styles.coverImageStyle}
          type={IMAGE_TYPE.url}
          image={song?.cover}
        />
        {song?.favourit ? (
          <Icon
            style={styles.heartStyle}
            name="heart-fill"
            type="octa"
            color={theme.colors.primaryDark}
            size={theme.fontSize.xxlg}
          />
        ) : null}
      </View>

      <Text style={styles.textStyle} md semiBold color={theme.colors.primary}>
        <Text xs semiBold color={theme.colors.cardDark}>
          Song Name
        </Text>
        {'\n'}
        {song?.title}
      </Text>
      <Text style={styles.textStyle} sm regular color={theme.colors.textLight}>
        <Text xs semiBold color={theme.colors.cardDark}>
          Album
        </Text>
        {'\n'}
        {song?.album}
      </Text>
      <Text style={styles.textStyle} sm regular color={theme.colors.textLight}>
        <Text xs semiBold color={theme.colors.cardDark}>
          Artist
        </Text>
        {'\n'}
        {song?.artist}
      </Text>
      <Text style={styles.textStyle} sm regular color={theme.colors.textLight}>
        <Text xs semiBold color={theme.colors.cardDark}>
          Genre
        </Text>
        {'\n'}
        {song?.genre}
      </Text>
      <Text style={styles.textStyle} sm regular color={theme.colors.textLight}>
        <Text xs semiBold color={theme.colors.cardDark}>
          File Path
        </Text>
        {'\n'}
        {song?.url}
      </Text>
      <Text style={styles.textStyle} sm regular color={theme.colors.textLight}>
        <Text xs semiBold color={theme.colors.cardDark}>
          Duration
        </Text>
        {'\n'}
        {secondsToHms((song?.duration ?? 0) / 1000)}
      </Text>
    </ScrollView>
  );
};

const createStyle = (theme: ITheme) => {
  const { padding, screen } = theme;
  return StyleSheet.create({
    continer: {
      paddingHorizontal: padding.md,
      maxHeight: screen.height * 0.6,
    },
    coverImageBox: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: padding.xlg,
    },
    coverImageStyle: {
      height: 140,
      width: 140,
    },
    textStyle: {
      paddingBottom: padding.lg,
    },
    heartStyle: { bottom: 20, left: 67 },
  });
};

export default SongDetails;

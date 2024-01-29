import React, { Fragment } from 'react';
import { Image, View } from 'react-native';
import Text from '../Text/Text';
import { activeSongSelector } from '../../reducers/playerReducer';
import { useAppSelector } from '../../hooks/stateHooks';

import { ISong } from '../../interfaces/player/music.interface';
import { ITheme } from '../../theme/theme.interface';

export interface CarouselMusicItemProps {
  music: ISong;
  styles: any;
  theme: ITheme;
}

const CarouselMusicItem = ({
  music,
  styles,
  theme,
}: CarouselMusicItemProps) => {
  const activeSong = useAppSelector(activeSongSelector);
  return (
    <View style={styles.itemContainer} key={music.id}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: music.cover }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      {activeSong?.id === music.id && (
        <Fragment>
          <Text lg center semiBold color={theme.colors.text} numberOfLines={2}>
            {music.title}
          </Text>
          <Text
            sm
            center
            color={theme.colors.textSecondary}
            style={styles.artist}
          >
            {music.artist}
          </Text>
        </Fragment>
      )}
    </View>
  );
};

export default CarouselMusicItem;

import React, { Fragment, useMemo, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet } from 'react-native';
import { ISong } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import {
  activeSongSelector,
  allSongSelector,
} from '../../reducers/playerReducer';
import { useAppSelector } from '../../hooks/stateHooks';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import AlbumHeader from './AlbumHeader';
import { secondsToHms } from '../../helpers/utitlities';

const PlaylistDetail = ({ navigation, route }: any) => {
  const [_selectedSong, setSelectedSong] = useState<null | string>(null);

  const activeAlbum = route?.params?.album;
  const songs = useAppSelector(allSongSelector);
  const songsInAlbum = songs.filter(song => song.album === activeAlbum?.album);
  const activeSong = useAppSelector(activeSongSelector);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onSongSelect = (song: ISong) => {
    setSelectedSong(song.id);
  };

  const onSongClick = async (song: ISong) => {
    if (activeSong?.id === song.id) {
      navigation.navigate('Player');
      return;
    }
    addAndPlayCurrentTrack({ track: song, tracks: songsInAlbum });
    navigation.navigate('Player');
  };
  const onSongOptionClick = () => {};
  // const onSongFavClick = () => {};

  return (
    <Fragment>
      <AlbumHeader
        title={activeAlbum?.album}
        coverImage={activeAlbum.cover}
        songCount={activeAlbum.numberOfSongs}
        artist={activeAlbum.artist}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={songsInAlbum}
        renderItem={({ item: song }: { item: ISong }) => {
          const duration = secondsToHms((song.duration ?? 0) / 1000);
          return (
            <ListItem
              key={song.id}
              title={song.title}
              subTitle={song.artist + '・' + duration}
              onClick={() => onSongClick(song)}
              onSelect={() => onSongSelect(song)}
              coverImage={song.cover}
              selected={activeSong?.id === song.id}
              onOptionClick={onSongOptionClick}
              // onSecondaryOptionClick={onSongFavClick}
            />
          );
        }}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps={'handled'}
      />
    </Fragment>
  );
};

const createStyle = ({ padding }: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      paddingTop: padding.four,
      paddingBottom: 50,
    },
  });
};

export default PlaylistDetail;

import React, { Fragment, useMemo, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet } from 'react-native';
import { IMusic } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import {
  activeSongSelector,
  allSongSelector,
  setActiveSong,
} from '../../reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import AlbumHeader from './AlbumHeader';

const AlbumDetail = ({ navigation, route }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | string>(null);

  const activeAlbum = route?.params?.album;
  console.log('PARAM ******', { ...activeAlbum, cover: 'COVER IMAGE' });
  const dispatch = useAppDispatch();
  const songs = useAppSelector(allSongSelector);
  const songsInAlbum = songs.filter(song => song.album === activeAlbum?.album);
  const activeSong = useAppSelector(activeSongSelector);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onSongSelect = (song: IMusic) => {
    setSelectedSong(song.id);
  };

  const onSongClick = (song: IMusic) => {
    if (selectedSong !== song.id) {
      setSelectedSong(null);
    }
    addAndPlayCurrentTrack(song);
    dispatch(setActiveSong(song));
    navigation.navigate('Player');
  };
  const onSongOptionClick = () => {};
  const onSongFavClick = () => {};

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
        renderItem={({ item: song }: { item: IMusic }) => (
          <ListItem
            key={song.id}
            title={song.title}
            subTitle={song.artist}
            onItemClick={() => onSongClick(song)}
            onItemSelect={() => onSongSelect(song)}
            coverImage={song.cover}
            selected={activeSong?.id === song.id}
            onOptionClick={onSongOptionClick}
            onSecondaryOptionClick={onSongFavClick}
          />
        )}
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

export default AlbumDetail;
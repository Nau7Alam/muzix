import React, { Fragment, useMemo, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet } from 'react-native';
import { ISong } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { activeSongSelector } from '../../reducers/playerReducer';
import { useAppSelector } from '../../hooks/stateHooks';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import PlaylistHeader from './PlaylistHeader';
import { playlistSelector } from '../../reducers/playlistReducer';
import { RootState } from '../../store';
import { secondsToHms } from '../../helpers/utitlities';

const PlaylistDetail = ({ navigation, route }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | string>(null);
  const playlistId = route?.params?.playlist;
  const activePlaylist = useAppSelector((state: RootState) =>
    playlistSelector(state, playlistId)
  );

  console.log('activePlaylist', activePlaylist);
  const totalPlaylistDuration = activePlaylist.songs.reduce(
    (currentResult: number, currentItem: ISong) =>
      currentResult + (currentItem?.duration ?? 0) / 1000,
    0
  );
  const activeSong = useAppSelector(activeSongSelector);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onSongSelect = (song: ISong) => {
    setSelectedSong(song.id);
  };

  const onSongClick = async (song: ISong) => {
    if (selectedSong !== song.id) {
      setSelectedSong(null);
    }
    await addAndPlayCurrentTrack({ track: song, tracks: activePlaylist.songs });
    navigation.navigate('Player');
  };
  const onSongOptionClick = () => {};
  // const onSongFavClick = () => {};

  return (
    <Fragment>
      <PlaylistHeader
        title={activePlaylist?.name}
        // coverImage={activePlaylist.cover}
        songCount={activePlaylist.songs.length}
        duration={secondsToHms(totalPlaylistDuration)}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={activePlaylist.songs}
        renderItem={({ item: song }: { item: ISong }) => (
          <ListItem
            key={song.id}
            title={song.title}
            subTitle={song.artist}
            onClick={() => onSongClick(song)}
            onSelect={() => onSongSelect(song)}
            coverImage={song.cover}
            selected={activeSong?.id === song.id}
            onOptionClick={onSongOptionClick}
            // onSecondaryOptionClick={onSongFavClick}
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

export default PlaylistDetail;

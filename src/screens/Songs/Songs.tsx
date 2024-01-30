import React, { useCallback, useMemo, useRef, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet, View } from 'react-native';
import { ISong } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { useTrackSongs } from '../../hooks/trackHooks';
import {
  activeSongSelector,
  allSongSelector,
  setActiveSong,
  setActiveSongList,
} from '../../reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import Text from '../../components/Text/Text';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import Layout from '../../components/Layout/Layout';
import BottomSheetUI from '../../components/BottomSheetUI/BottomSheetUI';
import OptionList from '../../components/BottomSheetUI/OptionList/OptionList';
import { SONG_OPTIONS, SONG_OPERATION } from '../../constants/listOptions';
import {
  addToPlaylist,
  allPlaylistSelector,
} from '../../reducers/playlistReducer';

const Songs = ({ navigation }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | ISong>(null);
  const { isPlayerReady } = useTrackSongs();

  const dispatch = useAppDispatch();
  const songs = useAppSelector(allSongSelector);
  const playlist = useAppSelector(allPlaylistSelector);
  const playlistArray = Object.keys(playlist).map(p => ({ name: p, value: p }));
  const activeSong = useAppSelector(activeSongSelector);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onSongSelect = (song: ISong) => {
    setSelectedSong(song);
  };

  const onSongClick = (song: ISong) => {
    if (selectedSong?.id !== song.id) {
      setSelectedSong(null);
    }
    addAndPlayCurrentTrack(song);
    dispatch(setActiveSong(song));
    dispatch(setActiveSongList(songs));
    navigation.navigate('Player');
  };

  const onSongOptionClick = (song: ISong) => {
    console.log(song.title);
    setSelectedSong(song);
    toggleSongModal();
  };
  const onSongFavClick = (song: ISong) => {
    console.log(song.title);
  };

  // Conversation filter modal
  const songModalSnapPoints = useMemo(
    () => [theme.screen.height - 350, theme.screen.height - 350],
    [theme.screen.height]
  );

  // Filter by assignee type
  const songOptionModal = useRef<any>(null);
  const playlistModal = useRef<any>(null);

  const toggleSongModal = useCallback(() => {
    songOptionModal.current.present() || songOptionModal.current?.dismiss();
  }, []);

  const togglePlaylistModal = useCallback(() => {
    playlistModal.current.present() || playlistModal.current?.dismiss();
  }, []);

  const closeSongModal = useCallback(() => {
    songOptionModal.current?.dismiss();
  }, []);

  const closePlaylistModal = useCallback(() => {
    playlistModal.current?.dismiss();
  }, []);

  const onSelectSongOption = async (item: any) => {
    closeSongModal();
    console.log(item.value);
    switch (item.value) {
      case SONG_OPERATION.add_to_playlist:
        togglePlaylistModal();
        break;
      case SONG_OPERATION.play:
        onSongClick(selectedSong!);
        break;
      default:
        console.log('FROM SWITCH');
        break;
    }
  };

  const onSelectPlaylist = async (item: any) => {
    dispatch(addToPlaylist({ name: item.value, song: selectedSong }));
    setSelectedSong(null);
    closePlaylistModal();
  };

  if (!isPlayerReady) {
    return (
      <View style={styles.loaderBox}>
        <Text xxxlg center>
          NOT READY
        </Text>
      </View>
    );
  }

  return (
    <Layout style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={songs}
        renderItem={({ item: song }: { item: ISong }) => (
          <ListItem
            key={song.id}
            title={song.title}
            subTitle={song.artist}
            onClick={() => onSongClick(song)}
            onSelect={() => onSongSelect(song)}
            coverImage={song.cover}
            selected={activeSong?.id === song.id}
            onOptionClick={() => onSongOptionClick(song)}
            onSecondaryOptionClick={() => onSongFavClick(song)}
          />
        )}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps={'handled'}
      />
      <BottomSheetUI
        bottomSheetModalRef={songOptionModal}
        initialSnapPoints={songModalSnapPoints}
        showHeader
        headerTitle={selectedSong?.title ?? ''}
        subTitle={selectedSong?.artist + '・' + selectedSong?.album}
        coverImage={selectedSong?.cover ?? ''}
        closeFilter={closeSongModal}
        children={
          <OptionList
            items={SONG_OPTIONS}
            onChangeFilter={onSelectSongOption}
            leftIcon={'shuriken'}
            colors={theme.colors}
          />
        }
      />
      <BottomSheetUI
        bottomSheetModalRef={playlistModal}
        initialSnapPoints={songModalSnapPoints}
        showHeader
        headerTitle={'Select Playlist'}
        closeFilter={closePlaylistModal}
        children={
          <OptionList
            items={playlistArray}
            onChangeFilter={onSelectPlaylist}
            leftIcon={'shimmer'}
            colors={theme.colors}
          />
        }
      />
    </Layout>
  );
};

const createStyle = ({ padding }: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    loaderBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: {
      paddingBottom: padding.xxlg + 30,
    },
  });
};

export default Songs;

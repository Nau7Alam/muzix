import React, { useCallback, useMemo, useRef, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet } from 'react-native';
import { ISong } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import {
  activeSongSelector,
  addToActiveSongList,
  allSongSelector,
  blockSong,
  toggleFavouritSong,
} from '../../reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import Layout from '../../components/Layout/Layout';
import BottomSheetUI from '../../components/BottomSheetUI/BottomSheetUI';
import OptionList from '../../components/BottomSheetUI/OptionList/OptionList';
import { SONG_OPTIONS, SONG_OPERATION } from '../../constants/listOptions';
import {
  addToPlaylist,
  allPlaylistSelector,
  toggleFavourite,
} from '../../reducers/playlistReducer';
import Empty from '../../components/Empty/Empty';
import ModalUI from '../../components/ModalUI/ModalUI';
import Confirm from '../../components/ModalUI/CreatePlaylist/Confirm/Confirm';
import SongDetails from '../../components/ModalUI/CreatePlaylist/SongDetails/SongDetails';
import { secondsToHms } from '../../helpers/utitlities';

const Songs = ({ navigation }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | ISong>(null);
  const [confirmBlocked, setConfirmBlocked] = useState(false);
  const [songDetail, setSongDetail] = useState(false);

  const dispatch = useAppDispatch();
  const songs = useAppSelector(allSongSelector);
  const playlist = useAppSelector(allPlaylistSelector);
  const playlistArray = Object.keys(playlist).map(p => ({
    name: playlist[p].name,
    value: p,
  }));
  const activeSong = useAppSelector(activeSongSelector);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onSongSelect = (song: ISong) => {
    setSelectedSong(song);
  };

  const onSongClick = async (song: ISong) => {
    if (activeSong?.id === song.id) {
      navigation.navigate('Player');
      return;
    }
    await addAndPlayCurrentTrack({ track: song, tracks: songs });
    navigation.navigate('Player');
  };

  const onSongOptionClick = (song: ISong) => {
    setSelectedSong(song);
    toggleSongModal();
  };
  const onSongFavClick = (song: ISong) => {
    dispatch(toggleFavouritSong({ isPlaying: false, song }));
    dispatch(toggleFavourite({ song }));
  };

  // Conversation filter modal
  const modalSnapPoints = useMemo(
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
      case SONG_OPERATION.add_to_blocklist:
        toggleConfirmBlockModal();
        break;
      case SONG_OPERATION.add_to_queue:
        dispatch(addToActiveSongList({ song: selectedSong }));
        break;
      case SONG_OPERATION.detail:
        setSongDetail(true);
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

  const closeConfirmBlockModal = () => {
    setConfirmBlocked(false);
    setSelectedSong(null);
  };

  const toggleConfirmBlockModal = () => {
    setConfirmBlocked(!confirmBlocked);
  };

  const onBlockSong = () => {
    console.log('BLOCKING SONG ', selectedSong?.id);
    dispatch(blockSong({ song: selectedSong }));
    setSelectedSong(null);
    toggleConfirmBlockModal();
  };

  const onCloseSongDetailModel = () => {
    setSongDetail(false);
    setSelectedSong(null);
  };

  return (
    <Layout style={styles.container}>
      {!songs.length ? (
        <Empty
          image={require('../../../assets/images/no_songs.png')}
          title="No Soung Found."
          message={'No Song was found on this device memory.'}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={songs.filter(s => !s.blocked)}
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
                secondaryOptionIcon={song.favourit ? 'heart-fill' : 'heart'}
                selected={activeSong?.id === song.id}
                onOptionClick={() => onSongOptionClick(song)}
                onSecondaryOptionClick={() => onSongFavClick(song)}
              />
            );
          }}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
        />
      )}

      <BottomSheetUI
        bottomSheetModalRef={songOptionModal}
        initialSnapPoints={modalSnapPoints}
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
        initialSnapPoints={modalSnapPoints}
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
      <ModalUI
        visible={confirmBlocked}
        title={'Block Song'}
        onClose={closeConfirmBlockModal}
        children={
          <Confirm
            title={selectedSong?.title ?? ''}
            message="Do you want to block this song?"
            onYes={onBlockSong}
            onNo={closeConfirmBlockModal}
          />
        }
      />

      <ModalUI
        visible={songDetail}
        title={'Song Details'}
        onClose={onCloseSongDetailModel}
        children={<SongDetails song={selectedSong} />}
      />
    </Layout>
  );
};

const createStyle = ({}: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {},
  });
};

export default Songs;

import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet } from 'react-native';
import { ISong } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import {
  activeSongSelector,
  addToActiveSongList,
  blockSong,
} from '../../reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import PlaylistHeader from './PlaylistHeader';
import {
  addToPlaylist,
  allPlaylistSelector,
  playlistSelector,
} from '../../reducers/playlistReducer';
import { RootState } from '../../store';
import { secondsToHms } from '../../helpers/utitlities';
import Empty from '../../components/Empty/Empty';
import Layout from '../../components/Layout/Layout';
import BottomSheetUI from '../../components/BottomSheetUI/BottomSheetUI';
import OptionList from '../../components/BottomSheetUI/OptionList/OptionList';
import ModalUI from '../../components/ModalUI/ModalUI';
import Confirm from '../../components/ModalUI/CreatePlaylist/Confirm/Confirm';
import SongDetails from '../../components/ModalUI/CreatePlaylist/SongDetails/SongDetails';
import { SONG_OPERATION, SONG_OPTIONS } from '../../constants/listOptions';

const PlaylistDetail = ({ navigation, route }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | ISong>(null);
  const [confirmBlocked, setConfirmBlocked] = useState(false);
  const [songDetail, setSongDetail] = useState(false);
  const playlistId = route?.params?.playlist;
  const activePlaylist = useAppSelector((state: RootState) =>
    playlistSelector(state, playlistId)
  );
  const dispatch = useAppDispatch();

  const playlist = useAppSelector(allPlaylistSelector);
  const playlistArray = Object.keys(playlist).map(p => ({
    name: playlist[p].name,
    value: p,
  }));

  const totalPlaylistDuration = activePlaylist.songs.reduce(
    (currentResult: number, currentItem: ISong) =>
      currentResult + (currentItem?.duration ?? 0) / 1000,
    0
  );
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
    await addAndPlayCurrentTrack({ track: song, tracks: activePlaylist.songs });
    navigation.navigate('Player');
  };
  const onSongOptionClick = (song: ISong) => {
    setSelectedSong(song);
    toggleSongModal();
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
    <Fragment>
      {!activePlaylist.songs.length ? (
        <Layout title={activePlaylist?.name}>
          <Empty
            image={require('../../../assets/images/no_songs.png')}
            title="Empty Playlist."
            message={`No Songs is added to this Playlist "${activePlaylist.name}". You can add songs to a playlist from Songs, Album or other Playlists`}
          />
        </Layout>
      ) : (
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
                  onOptionClick={() => onSongOptionClick(song)}
                />
              );
            }}
            keyExtractor={item => item.id}
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode="on-drag"
          />
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
        </Fragment>
      )}
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
      paddingBottom: 10,
    },
  });
};

export default PlaylistDetail;

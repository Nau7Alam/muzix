import React, { useCallback, useMemo, useRef, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import {
  allPlaylistSelector,
  deletePlaylist,
} from '../../reducers/playlistReducer';
import ListItem from '../../components/ListItem/ListItem';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import { addS } from '../../helpers/utitlities';
import PressableIcon from '../../components/PressabelIcon/PressableIcon';
import ModalUI from '../../components/ModalUI/ModalUI';
import CreatePlaylistForm from '../../components/ModalUI/CreatePlaylist/CreatePlaylistForm/CreatePlaylistForm';
import {
  PLAYLIST_OPERATIONS,
  PLAYLIST_OPTIONS,
} from '../../constants/listOptions';
import BottomSheetUI from '../../components/BottomSheetUI/BottomSheetUI';
import OptionList from '../../components/BottomSheetUI/OptionList/OptionList';
import Confirm from '../../components/ModalUI/CreatePlaylist/Confirm/Confirm';

const Playlists = ({ navigation }: any) => {
  const playlists = useAppSelector(allPlaylistSelector);
  const playlistNames = Object.keys(playlists);
  const [createPlaylistModal, setCreatePlaylaylistModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();

  const onCratePlaylist = () => {
    console.log('CREATE PLAYLIST!!!');
    setCreatePlaylaylistModal(!createPlaylistModal);
  };

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onPlaylistClick = (playlist: any) => {
    navigation.navigate('PlaylistDetail', { playlist });
  };

  const playlistOptionModal = useRef<any>(null);

  const togglePlaylistModal = useCallback(() => {
    playlistOptionModal.current.present() ||
      playlistOptionModal.current?.dismiss();
  }, []);

  const closePlaylistModal = useCallback(() => {
    playlistOptionModal.current?.dismiss();
  }, []);

  const toggleModal = () => {
    setConfirmDelete(!confirmDelete);
  };

  const onPlaylistOptionClick = (name: string) => {
    console.log('WHAT DO YOU WANT ???', name);
    setSelectedPlaylist(name);
    togglePlaylistModal();
  };

  const onSelectPlaylistOption = (option: any) => {
    console.log(option);
    closePlaylistModal();
    switch (option.value) {
      case PLAYLIST_OPERATIONS.add_to_queue:
        break;
      case PLAYLIST_OPERATIONS.play:
        break;
      case PLAYLIST_OPERATIONS.delete:
        toggleModal();
        break;
      default:
        console.log('FROM SWITCH');
        break;
    }
  };

  const onDeletePlaylist = () => {
    console.log('DELETE PLAYLIST ', selectedPlaylist);
    dispatch(deletePlaylist(selectedPlaylist));
    setSelectedPlaylist('');
    toggleModal();
  };
  const modalSnapPoints = useMemo(
    () => [theme.screen.height - 350, theme.screen.height - 350],
    [theme.screen.height]
  );

  return (
    <Layout title="Playlists">
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={playlistNames}
        renderItem={({ item: name }) => (
          <ListItem
            key={name}
            subTitle={addS(playlists[name].length, 'Song')}
            title={name}
            titleStyle={styles.playlistTitle}
            coverImageStyle={styles.playlistImage}
            onClick={() => onPlaylistClick(name)}
            onOptionClick={() => onPlaylistOptionClick(name)}
          />
        )}
        keyExtractor={item => item}
        keyboardShouldPersistTaps={'handled'}
      />
      <PressableIcon
        onPress={onCratePlaylist}
        name="plus"
        color={theme.colors.white}
        size={36}
        style={styles.createPlaylistButton}
      />
      <ModalUI
        visible={createPlaylistModal}
        title="Create Playlist"
        onClose={onCratePlaylist}
        children={
          <CreatePlaylistForm list={playlistNames} onSubmit={onCratePlaylist} />
        }
      />
      <ModalUI
        visible={confirmDelete}
        title={selectedPlaylist}
        onClose={onCratePlaylist}
        children={
          <Confirm
            title="Delete Playlist ?"
            message="Do you want to delete playlist?"
            onYes={onDeletePlaylist}
            onNo={toggleModal}
          />
        }
      />
      <BottomSheetUI
        bottomSheetModalRef={playlistOptionModal}
        initialSnapPoints={modalSnapPoints}
        showHeader
        headerTitle={selectedPlaylist}
        closeFilter={closePlaylistModal}
        children={
          <OptionList
            items={PLAYLIST_OPTIONS}
            onChangeFilter={onSelectPlaylistOption}
            leftIcon={'nuke'}
            colors={theme.colors}
          />
        }
      />
    </Layout>
  );
};

const createStyle = (theme: ITheme) => {
  const { borderRadius, fontSize, fontWeight, colors, padding } = theme;
  return StyleSheet.create({
    listContainer: {
      paddingBottom: 3 * padding.xxlg,
    },
    playlistTitle: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.regular,
    },
    playlistImage: {
      height: 60,
      width: 60,
      borderRadius: borderRadius.full,
    },
    createPlaylistButton: {
      backgroundColor: colors.textSecondaryDark,
      position: 'absolute',
      borderRadius: borderRadius.md,
      bottom: 15,
      right: 15,
      elevation: 2,
    },
  });
};

export default Playlists;

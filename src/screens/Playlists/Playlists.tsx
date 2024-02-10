import React, { useCallback, useMemo, useRef, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import {
  allPlaylistSelector,
  createPlaylist,
  deletePlaylist,
  renamePlaylist,
} from '../../reducers/playlistReducer';
import ListItem from '../../components/ListItem/ListItem';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import { addS } from '../../helpers/utitlities';
import PressableIcon from '../../components/PressabelIcon/PressableIcon';
import ModalUI from '../../components/ModalUI/ModalUI';
import CreatePlaylistForm from '../../components/ModalUI/CreatePlaylist/CreateRenameForm/CreateRenameForm';
import {
  PLAYLIST_OPERATIONS,
  PLAYLIST_OPTIONS,
} from '../../constants/listOptions';
import BottomSheetUI from '../../components/BottomSheetUI/BottomSheetUI';
import OptionList from '../../components/BottomSheetUI/OptionList/OptionList';
import Confirm from '../../components/ModalUI/CreatePlaylist/Confirm/Confirm';

const Playlists = ({ navigation }: any) => {
  const playlists = useAppSelector(allPlaylistSelector);
  const playlistKeys = Object.keys(playlists);
  const [playlistName, setPlaylistName] = useState('');
  const [createPlaylistModal, setCreatePlaylaylistModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();

  const togglePlaylistForm = () => {
    setCreatePlaylaylistModal(!createPlaylistModal);
  };

  const closePlaylistForm = () => {
    setCreatePlaylaylistModal(false);
    setPlaylistName('');
    setSelectedPlaylist('');
  };

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onPlaylistClick = (playlist: any) => {
    navigation.navigate('PlaylistDetail', { playlist });
  };

  const playlistOptionModal = useRef<any>(null);

  const togglePlaylistOptionsModal = useCallback(() => {
    playlistOptionModal.current.present() ||
      playlistOptionModal.current?.dismiss();
  }, []);

  const closePlaylistOptionsModal = useCallback(() => {
    playlistOptionModal.current?.dismiss();
  }, []);

  const toggleConfirmModal = () => {
    setConfirmDelete(!confirmDelete);
  };
  const closeConfirmModal = () => {
    setConfirmDelete(false);
    setPlaylistName('');
    setSelectedPlaylist('');
  };

  const onPlaylistOptionClick = (name: string) => {
    setSelectedPlaylist(name);
    togglePlaylistOptionsModal();
  };

  const onSelectPlaylistOption = (option: any) => {
    console.log('Selected Operation ', option);
    closePlaylistOptionsModal();
    switch (option.value) {
      case PLAYLIST_OPERATIONS.add_to_queue:
        break;
      case PLAYLIST_OPERATIONS.play:
        break;
      case PLAYLIST_OPERATIONS.delete:
        toggleConfirmModal();
        break;
      case PLAYLIST_OPERATIONS.rename:
        setPlaylistName(playlists[selectedPlaylist].name);
        togglePlaylistForm();
        break;
      default:
        console.log('FROM SWITCH');
        break;
    }
  };

  const onFormSubmit = () => {
    console.log('FORM SUBMITTED !!!', selectedPlaylist, playlistName);
    if (!selectedPlaylist && playlistName?.length) {
      dispatch(createPlaylist({ name: playlistName }));
      closePlaylistForm();
    } else if (selectedPlaylist && playlistName?.length) {
      dispatch(renamePlaylist({ key: selectedPlaylist, name: playlistName }));
      closePlaylistForm();
    }
  };

  const onDeletePlaylist = () => {
    dispatch(deletePlaylist(selectedPlaylist));
    setSelectedPlaylist('');
    toggleConfirmModal();
  };
  const modalSnapPoints = useMemo(
    () => [theme.screen.height - 350, theme.screen.height - 350],
    [theme.screen.height]
  );

  return (
    <Layout title="Playlists">
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={playlistKeys}
        renderItem={({ item: key }) => (
          <ListItem
            key={key}
            subTitle={addS(playlists[key].songs?.length, 'Song')}
            title={playlists[key].name}
            titleStyle={styles.playlistTitle}
            coverImageStyle={styles.playlistImage}
            onClick={() => onPlaylistClick(key)}
            onOptionClick={
              playlists[key].isDeletable
                ? () => onPlaylistOptionClick(key)
                : undefined
            }
          />
        )}
        keyExtractor={item => item}
        keyboardShouldPersistTaps={'handled'}
      />
      <PressableIcon
        onPress={togglePlaylistForm}
        name="plus"
        color={theme.colors.white}
        size={36}
        style={styles.createPlaylistButton}
      />
      <ModalUI
        visible={createPlaylistModal}
        title={`${selectedPlaylist ? 'Rename' : 'Create'} Playlist`}
        onClose={closePlaylistForm}
        children={
          <CreatePlaylistForm
            rename={!!selectedPlaylist}
            field1={playlistName}
            onChangeField1={text => setPlaylistName(text)}
            onSubmit={onFormSubmit}
          />
        }
      />
      <ModalUI
        visible={confirmDelete}
        title={'Delete Playlist'}
        onClose={closeConfirmModal}
        children={
          <Confirm
            title={selectedPlaylist}
            message="Do you want to delete playlist?"
            onYes={onDeletePlaylist}
            onNo={closeConfirmModal}
          />
        }
      />
      <BottomSheetUI
        bottomSheetModalRef={playlistOptionModal}
        initialSnapPoints={modalSnapPoints}
        showHeader
        headerTitle={selectedPlaylist}
        closeFilter={closePlaylistOptionsModal}
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

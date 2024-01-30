import React, { useMemo, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../hooks/stateHooks';
import { allPlaylistSelector } from '../../reducers/playlistReducer';
import ListItem from '../../components/ListItem/ListItem';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import { addS } from '../../helpers/utitlities';
import PressableIcon from '../../components/PressabelIcon/PressableIcon';
import ModalUI from '../../components/ModalUI/ModalUI';
import CreatePlaylistForm from '../../components/ModalUI/CreatePlaylist/CreatePlaylistForm';

const Playlists = ({ navigation }: any) => {
  const playlists = useAppSelector(allPlaylistSelector);
  const playlistNames = Object.keys(playlists);
  const [createPlaylistModal, setCreatePlaylaylistModal] = useState(false);

  const onCratePlaylist = () => {
    console.log('CREATE PLAYLIST!!!');
    setCreatePlaylaylistModal(!createPlaylistModal);
  };

  console.log(playlistNames);
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onPlaylistClick = (playlist: any) => {
    navigation.navigate('PlaylistDetail', { playlist });
  };

  const onPlaylistOptionClick = (name: string) => {
    console.log('WHAT DO YOU WANT ???', name);
  };

  return (
    <Layout title="Playlists">
      <FlatList
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

      <ModalUI
        visible={createPlaylistModal}
        title="Create Playlist"
        onClose={onCratePlaylist}
        children={
          <CreatePlaylistForm list={playlistNames} onSubmit={onCratePlaylist} />
        }
      />
      <PressableIcon
        onPress={onCratePlaylist}
        name="plus"
        color={theme.colors.white}
        size={36}
        style={styles.createPlaylistButton}
      />
    </Layout>
  );
};

const createStyle = (theme: ITheme) => {
  const { borderRadius, fontSize, fontWeight, colors } = theme;
  return StyleSheet.create({
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
      backgroundColor: colors.primaryDark,
      position: 'absolute',
      borderRadius: borderRadius.six,
      bottom: 60,
      right: 10,
    },
  });
};

export default Playlists;

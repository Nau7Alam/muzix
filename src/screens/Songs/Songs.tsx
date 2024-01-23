import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet, View } from 'react-native';
import { IMusic } from '../../interfaces/player/music.interface';
import Header from '../../components/Header/Header';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { useTrackSongs } from '../../hooks/trackHooks';
import {
  activeSongSelector,
  allSongSelector,
  setActiveSong,
} from '../../reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import Text from '../../components/Text/Text';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';

const Songs = ({ navigation }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | string>(null);
  const { isPlayerReady } = useTrackSongs();

  const dispatch = useAppDispatch();
  const songs = useAppSelector(allSongSelector);
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

  if (!isPlayerReady) {
    return (
      <View>
        <Text xxxlg center>
          {' '}
          NOT READY
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={songs}
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
    </SafeAreaView>
  );
};

const createStyle = (_theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContainer: {
      paddingTop: 10,
      paddingBottom: 70,
    },
  });
};

export default Songs;

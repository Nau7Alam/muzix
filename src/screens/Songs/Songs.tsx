import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { staticSongs } from '../../constants/musicList';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet } from 'react-native';
import { IMusic } from '../../interfaces/player/music.interface';
import Header from '../../components/Header/Header';
import { getLocalSongs } from '../../helpers/permission';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';

const Songs = () => {
  const [selectedSong, setSelectedSong] = useState<null | string>(null);
  const [songs, setSongs] = useState<IMusic[]>(staticSongs);
  const onSongSelect = (songId: string) => {
    setSelectedSong(songId);
  };

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  useEffect(() => {
    getLocalSongs()
      .then(result => {
        const idMappedSongs: IMusic[] =
          result?.map(i => ({
            id: uuidv4(),
            ...i,
          })) ?? [];
        songs && setSongs(songs?.concat(...idMappedSongs));
      })
      .catch(() => {
        console.log('ERROR OCCUREED');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSongClick = (songId: string) => {
    if (selectedSong !== songId) {
      setSelectedSong(null);
    }
  };
  const onSongOptionClick = () => {};
  const onSongFavClick = () => {};
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
            onItemClick={() => onSongClick(song.id)}
            onItemSelect={() => onSongSelect(song.id)}
            coverImage={song.cover}
            selected={selectedSong === song.id}
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
      paddingBottom: 70,
    },
  });
};

export default Songs;

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { songs } from '../../constants/musicList';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList } from 'react-native';
import { IMusic } from '../../interfaces/player/music.interface';
import Header from '../../components/Header/Header';

const Songs = () => {
  const [selectedSong, setSelectedSong] = useState<null | string>(null);
  const onSongSelect = (songId: string) => {
    setSelectedSong(songId);
  };
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
        data={songs}
        renderItem={({ item: song }: { item: IMusic }) => (
          <ListItem
            key={song.id}
            title={song.title}
            subTitle={song.artist}
            onItemClick={() => onSongClick(song.id)}
            onItemSelect={() => onSongSelect(song.id)}
            coverImage={song.coverImage}
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

export default Songs;

import React from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { IAlbum } from '../../interfaces/player/music.interface';
import { addS } from '../../helpers/utitlities';
import Layout from '../../components/Layout/Layout';
import Empty from '../../components/Empty/Empty';
import { FlatList } from 'react-native';
import { useAppSelector } from '../../hooks/stateHooks';
import { selectAllAlbums } from '../../reducers/playerReducer';

const Albums = ({ navigation }: { navigation: any }) => {
  const albums = useAppSelector(selectAllAlbums);

  const onAlbumClick = (album: IAlbum) => {
    navigation.navigate('AlbumDetail', { album });
  };

  return (
    <Layout title="Albums">
      {!albums.length ? (
        <Empty
          image={require('../../../assets/images/no_songs.png')}
          title="No Album Found."
          message={'No Songs or Album was found on this device memory.'}
        />
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={albums}
          renderItem={({ item: album }) => (
            <ListItem
              key={album.id}
              title={album.album}
              coverImage={album.cover}
              subTitle={album.artist + '・' + addS(album.numberOfSongs, 'Song')}
              onClick={() => onAlbumClick(album)}
            />
          )}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
        />
      )}
    </Layout>
  );
};

export default Albums;

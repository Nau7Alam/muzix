import React, { useEffect, useState } from 'react';
import { getLocalAlbumsByArtist } from '../../helpers/localMedia';
import ListItem from '../../components/ListItem/ListItem';
import { IAlbum } from '../../interfaces/player/music.interface';
import { addS } from '../../helpers/utitlities';
import Layout from '../../components/Layout/Layout';
import Empty from '../../components/Empty/Empty';
import { FlatList } from 'react-native';

const Albums = ({ navigation }: { navigation: any }) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const onAlbumClick = (album: IAlbum) => {
    navigation.navigate('AlbumDetail', { album });
  };

  useEffect(() => {
    (async () => {
      const localAlbums = await getLocalAlbumsByArtist();
      localAlbums?.length && setAlbums(localAlbums);
    })();
  }, []);

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

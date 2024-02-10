import React, { useEffect, useState } from 'react';
import { getLocalAlbumsByArtist } from '../../helpers/localMedia';
import ListItem from '../../components/ListItem/ListItem';
import { IAlbum } from '../../interfaces/player/music.interface';
import { addS } from '../../helpers/utitlities';
import Layout from '../../components/Layout/Layout';
import Empty from '../../components/Empty/Empty';

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

  if (!albums.length) {
    return (
      <Empty
        image={require('../../../assets/images/no_songs.png')}
        title="No Album Found."
        message={'No Songs or Album was found on this device memory.'}
      />
    );
  }

  return (
    <Layout title="Albums">
      {albums.map(album => {
        return (
          <ListItem
            key={album.id}
            title={album.album}
            coverImage={album.cover}
            subTitle={album.artist + '・' + addS(album.numberOfSongs, 'Song')}
            onClick={() => onAlbumClick(album)}
          />
        );
      })}
    </Layout>
  );
};

export default Albums;

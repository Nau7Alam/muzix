import React, { useEffect, useState } from 'react';
import { getLocalAlbumsByArtist } from '../../helpers/localMedia';
import ListItem from '../../components/ListItem/ListItem';
import { IAlbum } from '../../interfaces/player/music.interface';
import { addS } from '../../helpers/utitlities';
import Layout from '../../components/Layout/Layout';

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

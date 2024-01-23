import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getLocalAlbumsByArtist } from '../../helpers/localMedia';
import ListItem from '../../components/ListItem/ListItem';
import { IAlbum } from '../../interfaces/player/music.interface';
import Header from '../../components/Header/Header';

const Albums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  useEffect(() => {
    (async () => {
      const localAlbums = await getLocalAlbumsByArtist();
      localAlbums?.length && setAlbums(localAlbums);
    })();
  }, []);
  return (
    <View>
      <Header title="Albums" />
      {albums.map(album => {
        //"numberOfSongs", "album", "id", "artist", "cover"
        console.log(Object.keys(album), { ...album, cover: '' });
        return (
          <ListItem
            key={album.id}
            title={album.album}
            coverImage={album.cover}
            subTitle={album.artist + '・' + album.numberOfSongs + ' Song'}
            onItemClick={() => console.log('Openning Item')}
            onOptionClick={() => console.log('Whats the option')}
          />
        );
      })}
    </View>
  );
};

export default Albums;

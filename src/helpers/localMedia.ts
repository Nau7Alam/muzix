import {
  SortSongFields,
  SortSongOrder,
  getAlbums,
  getAll,
  searchSongs,
} from 'react-native-get-music-files';
import { checkPermission } from './permission';
import { IAlbum, ISong } from '../interfaces/player/music.interface';
import { sortAlbum, sortSong } from './utitlities';
import { staticSongs } from '../constants/musicList';
import { setAllAlbums, setAllSong } from '../reducers/playerReducer';
import { store } from '../store';

export const getLocalSongs = async () => {
  const hasPermission = await checkPermission();
  if (hasPermission) {
    const songsOrError = await getAll({
      // limit: 10, //optional
      // offset: 0, //optional
      coverQuality: 100,
      minSongDuration: 1000,
      sortBy: SortSongFields.DURATION,
      sortOrder: SortSongOrder.ASC,
    });
    if (typeof songsOrError === 'string') {
      console.log('ERROR ::: ', songsOrError);
      return;
    }
    return sortSong(songsOrError as ISong[]);
  }
};

export const getLocalAlbumsByArtist = async (artist?: string) => {
  const hasPermission = await checkPermission();
  if (hasPermission) {
    const albumsOrError = await getAlbums({
      // limit: 10,
      // offset: 0,
      coverQuality: 100,
      artist: artist ?? '',
      sortOrder: SortSongOrder.ASC,
    });

    if (typeof albumsOrError === 'string') {
      console.log('ERROR ::: ', albumsOrError);
      return;
    }
    return sortAlbum(albumsOrError as IAlbum[]);
  }
};

export const searchSongsByKey = async (searchKey?: string) => {
  const hasPermission = await checkPermission();
  if (hasPermission) {
    const resultsOrError = await searchSongs({
      // limit: 10,
      // offset: 0,
      coverQuality: 50,
      searchBy: searchKey ?? '',
      sortBy: SortSongFields.TITLE,
      sortOrder: SortSongOrder.DESC,
    });

    if (typeof resultsOrError === 'string') {
      console.log('ERROR ::: ', resultsOrError);
      return;
    }
    return sortSong(resultsOrError as ISong[]);
  }
};

export const loadLocalData = () => {
  let unmounted = false;
  let idMappedSongs: ISong[];
  (async () => {
    if (unmounted) {
      return;
    }
    try {
      const result = await getLocalSongs();
      const albums = await getLocalAlbumsByArtist();
      idMappedSongs =
        result?.map(song => ({
          ...song,
          id: song.artist + song.album,
          favourit: false,
          blocked: false,
        })) ?? [];

      store.dispatch(setAllSong([...idMappedSongs, ...staticSongs]));
      store.dispatch(setAllAlbums(albums));
    } catch (error) {
      console.log('ERROR OCCUREED', error);
    }
  })();
};

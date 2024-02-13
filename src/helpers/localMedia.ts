import {
  SortSongFields,
  SortSongOrder,
  getAlbums,
  getAll,
  searchSongs,
} from 'react-native-get-music-files';
import { checkPermission } from './permission';
import { IAlbum } from '../interfaces/player/music.interface';

export const getLocalSongs = async () => {
  const hasPermission = await checkPermission();
  if (hasPermission) {
    const songsOrError = await getAll({
      // limit: 10, optional
      // offset: 0, optional
      coverQuality: 100,
      minSongDuration: 1000,
      sortBy: SortSongFields.TITLE,
      sortOrder: SortSongOrder.ASC,
    });
    if (typeof songsOrError === 'string') {
      console.log('ERROR ::: ', songsOrError);
      return;
    }
    return songsOrError;
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
      sortOrder: SortSongOrder.DESC,
    });

    if (typeof albumsOrError === 'string') {
      console.log('ERROR ::: ', albumsOrError);
      return;
    }
    return albumsOrError as IAlbum[];
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
    return resultsOrError;
  }
};

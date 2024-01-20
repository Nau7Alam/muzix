import {
  SortSongFields,
  SortSongOrder,
  getAlbums,
  getAll,
  searchSongs,
} from 'react-native-get-music-files';
import { checkPermission, getPermission } from './permission';

export const getLocalSongs = async () => {
  const hasPermission = await checkPermission();
  if (!hasPermission) {
    console.log('Request PERMISSION');
    getPermission();
  } else {
    const songsOrError = await getAll({
      limit: 20,
      offset: 0,
      coverQuality: 50,
      minSongDuration: 1000,
      sortBy: SortSongFields.TITLE,
      sortOrder: SortSongOrder.DESC,
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
  if (!hasPermission) {
    console.log('Request PERMISSION');
    getPermission();
  } else {
    const albumsOrError = await getAlbums({
      limit: 10,
      offset: 0,
      coverQuality: 50,
      artist: artist ?? '',
      sortOrder: SortSongOrder.DESC,
    });

    if (typeof albumsOrError === 'string') {
      console.log('ERROR ::: ', albumsOrError);
      return;
    }
    return albumsOrError;
  }
};

export const searchSongsByKey = async (searchKey?: string) => {
  const hasPermission = await checkPermission();
  if (!hasPermission) {
    console.log('Request PERMISSION');
    getPermission();
  } else {
    const resultsOrError = await searchSongs({
      limit: 10,
      offset: 0,
      coverQuality: 50,
      searchBy: searchKey ?? '',
      sortBy: SortSongFields.DURATION,
      sortOrder: SortSongOrder.DESC,
    });

    if (typeof resultsOrError === 'string') {
      console.log('ERROR ::: ', resultsOrError);
      return;
    }
    return resultsOrError;
  }
};
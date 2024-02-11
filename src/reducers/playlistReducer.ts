import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ISong } from '../interfaces/player/music.interface';
import Toast from 'react-native-toast-message';

const initialState: any = {
  favourites: {
    name: 'Favourites',
    songs: [],
    isDeletable: false,
  },
  mostPlayed: {
    name: 'Most Played',
    songs: [],
    isDeletable: false,
  },
  recentlyPlayed: {
    name: 'Recently Played',
    songs: [],
    isDeletable: false,
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, { payload }) => {
      state[payload.name] = {
        name: payload.name,
        songs: [],
        isDeletable: true,
      };
    },
    addToPlaylist: (state, { payload }) => {
      const isPresent = state[payload.name]?.songs.some(
        (song: ISong) => song.id === payload.song.id
      );
      console.log(
        'Payload',
        payload.name,
        payload.song.title,
        state[payload.name]?.name,
        isPresent
      );
      if (isPresent) {
        Toast.show({
          type: 'error',
          text1: 'Song Present',
          text2: 'Song is already present in the playlist',
        });
      } else {
        state[payload.name]?.songs.unshift(payload.song);
      }
    },
    deletePlaylist: (state, { payload }) => {
      state[payload].isDeletable && delete state[payload];
    },
    renamePlaylist: (state, { payload }) => {
      if (state[payload.key].isDeletable) {
        state[payload.key] = {
          ...state[payload.key],
          name: payload.name,
        };
      }
    },
    toggleFavourite: (state, { payload }) => {
      const isPresent = state.favourites?.songs.some(
        (song: ISong) => song.id === payload.song.id
      );
      console.log('Payload', payload.song.id, { isPresent });
      if (isPresent) {
        state.favourites.songs = state.favourites.songs.filter(
          (song: ISong) => song.id !== payload.song.id
        );
      } else {
        state.favourites.songs.unshift({ ...payload.song, favourit: true });
      }
    },
  },
});

export const {
  createPlaylist,
  addToPlaylist,
  deletePlaylist,
  renamePlaylist,
  toggleFavourite,
} = playlistSlice.actions;

export const allPlaylistSelector = (state: RootState) => state.playlist;
export const playlistSelector = (state: RootState, name: string) =>
  state.playlist[name];

export default playlistSlice.reducer;

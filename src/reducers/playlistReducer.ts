import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ISong } from '../interfaces/player/music.interface';
import { WarningToast } from '../helpers/toast';

const initialState: any = {
  playlists: {
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
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, { payload }) => {
      state.playlists[payload.name] = {
        name: payload.name,
        songs: [],
        isDeletable: true,
      };
    },
    addToPlaylist: (state, { payload }) => {
      const isPresent = state.playlists[payload.name]?.songs.some(
        (song: ISong) => song.id === payload.song.id
      );
      console.log(
        'Payload',
        payload.name,
        payload.song.title,
        state.playlists[payload.name]?.name,
        isPresent
      );
      if (isPresent) {
        WarningToast(
          payload.song.title,
          'Song is already present in the playlist'
        );
      } else {
        state.playlists[payload.name]?.songs.unshift(payload.song);
      }
    },
    deletePlaylist: (state, { payload }) => {
      state.playlists[payload].isDeletable && delete state[payload];
    },
    renamePlaylist: (state, { payload }) => {
      if (state[payload.key].isDeletable) {
        state.playlists[payload.key] = {
          ...state[payload.key],
          name: payload.name,
        };
      }
    },
    toggleFavourite: (state, { payload }) => {
      const isPresent = state.playlists.favourites?.songs.some(
        (song: ISong) => song.id === payload.song.id
      );
      console.log('Payload', payload.song.id, { isPresent });
      if (isPresent) {
        state.playlists.favourites.songs =
          state.playlists.favourites.songs.filter(
            (song: ISong) => song.id !== payload.song.id
          );
      } else {
        state.playlists.favourites.songs.unshift({
          ...payload.song,
          favourit: true,
        });
      }
    },
  },
  // extraReducers: builder => {
  //   // CHECK REHYDRATION
  //   // builder.addCase(REHYDRATE, (state, action: any) => {
  //   //   console.log('REHYDRATED STATE ', Object.keys(state.songs));
  //   //   console.log('REHYDRATED ACTION', action);
  //   // });
  // },
});

export const {
  createPlaylist,
  addToPlaylist,
  deletePlaylist,
  renamePlaylist,
  toggleFavourite,
} = playlistSlice.actions;

export const allPlaylistSelector = (state: RootState) =>
  state.playlist.playlists;
export const playlistSelector = (state: RootState, name: string) =>
  state.playlist.playlists[name];

export default playlistSlice.reducer;

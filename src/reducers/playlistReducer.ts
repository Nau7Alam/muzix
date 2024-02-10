import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
      state[payload.name].songs.unshift(payload.song);
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
  },
});

export const { createPlaylist, addToPlaylist, deletePlaylist, renamePlaylist } =
  playlistSlice.actions;

export const allPlaylistSelector = (state: RootState) => state.playlist;
export const playlistSelector = (state: RootState, name: string) =>
  state.playlist[name];

export default playlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: any = {
  Favourites: [],
  'Most Played': [],
  'Recently Played': [],
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      state[action.payload] = [];
    },
    addToPlaylist: (state, action) => {
      state[action.payload.name].unshift(action.payload.song);
    },
    deletePlaylist: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { createPlaylist, addToPlaylist, deletePlaylist } =
  playlistSlice.actions;

export const allPlaylistSelector = (state: RootState) => state.playlist;
export const playlistSelector = (state: RootState, name: string) =>
  state.playlist[name];

export default playlistSlice.reducer;

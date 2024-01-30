import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ISong } from '../interfaces/player/music.interface';

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
    deleteFromPlaylist: (state, action) => {
      state[action.payload.name] = state.filter(
        (song: ISong) => song.id !== action.payload.id
      );
    },
  },
});

export const { createPlaylist, addToPlaylist } = playlistSlice.actions;

export const allPlaylistSelector = (state: RootState) => state.playlist;
export const playlistSelector = (state: RootState, name: string) =>
  state.playlist[name];

export default playlistSlice.reducer;

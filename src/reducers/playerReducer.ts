import { createSlice } from '@reduxjs/toolkit';
import { IMusic } from '../interfaces/player/music.interface';
import { RootState } from '../store';

interface PlayerStateType {
  songs: IMusic[];
  activeSong: IMusic | null;
}
const initialState: PlayerStateType = {
  songs: [],
  activeSong: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setAllSong: (state, action) => {
      state.songs = action.payload;
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload;
    },
  },
});

export const { setAllSong, setActiveSong } = playerSlice.actions;

export const allSongSelector = (state: RootState) => state.player.songs;
export const activeSongSelector = (state: RootState) => state.player.activeSong;

export default playerSlice.reducer;

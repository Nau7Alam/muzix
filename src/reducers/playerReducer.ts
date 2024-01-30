import { createSlice } from '@reduxjs/toolkit';
import { ISong } from '../interfaces/player/music.interface';
import { RootState } from '../store';

interface PlayerStateType {
  songs: ISong[];
  activeSong: ISong | null;
  activeSongList: ISong[] | null;
}
const initialState: PlayerStateType = {
  songs: [],
  activeSong: null,
  activeSongList: [],
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
    setActiveSongList: (state, action) => {
      state.activeSongList = action.payload;
    },
  },
});

export const { setAllSong, setActiveSong, setActiveSongList } =
  playerSlice.actions;

export const allSongSelector = (state: RootState) => state.player.songs;
export const activeSongSelector = (state: RootState) => state.player.activeSong;
export const activeSongListSelector = (state: RootState) =>
  state.player.activeSongList;

export default playerSlice.reducer;

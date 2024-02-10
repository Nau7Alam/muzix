import { createSlice } from '@reduxjs/toolkit';
import { ISong } from '../interfaces/player/music.interface';
import { RootState } from '../store';

interface PlayerStateType {
  songs: ISong[];
  activeSong: ISong | null;
  activeSongList: ISong[] | null;
  repeatMode: boolean;
  toShuffel: boolean;
}
const initialState: PlayerStateType = {
  songs: [],
  activeSong: null,
  activeSongList: null,
  repeatMode: false,
  toShuffel: false,
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
    toggleRepeatMode: state => {
      state.repeatMode = !state.repeatMode;
    },
    toggleShuffelMode: state => {
      state.toShuffel = !state.toShuffel;
      state.repeatMode = false;
    },
    toggleFavouritSong: (state, { payload }) => {
      if (state.activeSong && payload.isPlaying) {
        state.activeSong.favourit = !payload.song.favourit;
      }
      state.songs.forEach(song => {
        if (song.id === payload.song.id) {
          song.favourit = !song.favourit;
        }
      });
      state.activeSongList?.forEach(song => {
        if (song.id === payload.song.id) {
          song.favourit = !song.favourit;
        }
      });
    },
  },
});

export const {
  setAllSong,
  setActiveSong,
  setActiveSongList,
  toggleRepeatMode,
  toggleShuffelMode,
  toggleFavouritSong,
} = playerSlice.actions;

export const allSongSelector = (state: RootState) => state.player.songs;
export const activeSongSelector = (state: RootState) => state.player.activeSong;
export const activeSongListSelector = (state: RootState) =>
  state.player.activeSongList;
export const selectRepeatMode = (state: RootState) => state.player.repeatMode;
export const selectShuffelMode = (state: RootState) => state.player.toShuffel;

export default playerSlice.reducer;

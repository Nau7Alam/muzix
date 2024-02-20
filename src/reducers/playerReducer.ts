import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IAlbum, ISong } from '../interfaces/player/music.interface';
import { RootState } from '../store';
import Toast from 'react-native-toast-message';

interface PlayerStateType {
  songs: ISong[];
  albums: IAlbum[];
  activeSong: ISong | null;
  activeSongList: ISong[] | null;
  repeatMode: boolean;
  toShuffel: boolean;
  isPlaying: boolean;
}
const initialState: PlayerStateType = {
  songs: [],
  albums: [],
  activeSong: null,
  activeSongList: null,
  repeatMode: false,
  toShuffel: false,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayState: (state, { payload }) => {
      state.isPlaying = payload;
    },
    setAllSong: (state, action) => {
      state.songs = action.payload;
    },
    setAllAlbums: (state, action) => {
      state.albums = action.payload;
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
    blockSong: (state, { payload }) => {
      if (state.activeSong && payload.isPlaying) {
        state.activeSong.blocked = true;
      }
      state.songs.forEach(song => {
        if (song.id === payload.song.id) {
          song.blocked = true;
        }
      });
      state.activeSongList?.forEach(song => {
        if (song.id === payload.song.id) {
          song.blocked = true;
        }
      });
    },
    addToActiveSongList: (state, { payload }) => {
      const isPresent = state.activeSongList?.some(
        (song: ISong) => song.id === payload.song.id
      );
      if (isPresent) {
        Toast.show({
          type: 'error',
          text1: payload.song.title,
          text2: 'Song is already in queue!',
          visibilityTime: 1500,
        });
      } else {
        state?.activeSongList?.push(payload.song);
      }
    },
  },
});

export const {
  setPlayState,
  setAllSong,
  setAllAlbums,
  setActiveSong,
  setActiveSongList,
  toggleRepeatMode,
  toggleShuffelMode,
  toggleFavouritSong,
  blockSong,
  addToActiveSongList,
} = playerSlice.actions;

export const playStateSelector = (state: RootState) => state.player.isPlaying;

// MEMOIZED SONGs SELECTOR
const unblockedSongs = (state: RootState) => state.player.songs;
export const allSongSelector = createSelector([unblockedSongs], songs =>
  songs.filter(s => !s.blocked)
);

export const activeSongSelector = (state: RootState) => state.player.activeSong;

//MEMOIZED ACTIVE SONG LIST
const unblockedSongListSelector = (state: RootState) =>
  state.player.activeSongList;
export const activeSongListSelector = createSelector(
  [unblockedSongListSelector],
  activeList => activeList?.filter(s => !s.blocked)
);

export const selectAllAlbums = (state: RootState) => state.player.albums;
export const selectRepeatMode = (state: RootState) => state.player.repeatMode;
export const selectShuffelMode = (state: RootState) => state.player.toShuffel;

export default playerSlice.reducer;

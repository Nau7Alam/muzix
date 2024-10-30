import TrackPlayer, { Track } from 'react-native-track-player';
import { ISong } from '../interfaces/player/music.interface';
import { store } from '../store';
import {
  setActiveSong,
  setActiveSongList,
  setPlayState,
} from '../reducers/playerReducer';

type addTrackProps = {
  track: ISong;
  tracks?: ISong[];
};

export const addAndPlayCurrentTrack = async ({
  track,
  tracks,
}: addTrackProps) => {
  console.log('TRACK *****zzzzz', track.title.substring(1, 30));
  try {
    store.dispatch(setActiveSong(track));
    store.dispatch(setPlayState(true));
    tracks && store.dispatch(setActiveSongList(tracks));
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
    await TrackPlayer.play();
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

export const addCurrentTrack = async ({ track, tracks }: addTrackProps) => {
  try {
    store.dispatch(setActiveSong(track));
    tracks && store.dispatch(setActiveSongList(tracks));
    console.log('ADDED TRACK *****zzzzz ', track.title);
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

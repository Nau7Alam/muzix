import TrackPlayer, { Track } from 'react-native-track-player';
import { ISong } from '../interfaces/player/music.interface';
import { store } from '../store';
import { setActiveSong, setActiveSongList } from '../reducers/playerReducer';

type addTrackProps = {
  track: ISong;
  tracks?: ISong[];
};

export const addAndPlayCurrentTrack = async ({
  track,
  tracks,
}: addTrackProps) => {
  console.log('TRACK *****', track.title);
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
    await TrackPlayer.play();
    store.dispatch(setActiveSong(track));
    tracks && store.dispatch(setActiveSongList(tracks));
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

export const addCurrentTrack = async ({ track, tracks }: addTrackProps) => {
  try {
    console.log('AOND ', track.title);
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
    store.dispatch(setActiveSong(track));
    tracks && store.dispatch(setActiveSongList(tracks));
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

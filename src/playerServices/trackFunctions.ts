import TrackPlayer, { Track } from 'react-native-track-player';
import { ISong } from '../interfaces/player/music.interface';

export const addAndPlayCurrentTrack = async (track: ISong) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
    await TrackPlayer.play();
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

export const addCurrentTrack = async (track: ISong) => {
  try {
    console.log('AOND ', track);
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

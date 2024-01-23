import TrackPlayer, { Track } from 'react-native-track-player';
import { IMusic } from '../interfaces/player/music.interface';

export const addAndPlayCurrentTrack = async (track: IMusic) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
    await TrackPlayer.play();
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

export const addCurrentTrack = async (track: IMusic) => {
  try {
    console.log('AOND ', track);
    await TrackPlayer.reset();
    await TrackPlayer.add(track as Track);
  } catch (e) {
    console.log('ERROR ::::', e);
  }
};

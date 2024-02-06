import TrackPlayer, { Track } from 'react-native-track-player';

import { staticSongs } from '../constants/musicList';
// @ts-expect-error – sure we can import this
import localTrack from '../../assets/resources/pure.m4a';
// @ts-expect-error – sure we can import this
import localArtwork from '../../assets/resources/artwork.jpg';
import { ISong } from '../interfaces/player/music.interface';

export const QueueInitialTracksService = async (
  localSongs: ISong[]
): Promise<void> => {
  await TrackPlayer.reset();
  await TrackPlayer.add([
    ...(localSongs as Track[]),
    {
      id: 'resourceId 00',
      url: localTrack,
      title: 'Pure (Demo)',
      artist: 'David Chavez',
      artwork: localArtwork,
      duration: 28,
      cover: 'https://rntp.dev/example/smooth-jazz-24-7.jpeg',
      album: '',
      genre: '',
    },
    ...(staticSongs as Track[]),
  ]);
};

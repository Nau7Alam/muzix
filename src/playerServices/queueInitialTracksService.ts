import TrackPlayer, { Track } from 'react-native-track-player';

import { staticSongs } from '../constants/musicList';
// @ts-expect-error – sure we can import this
import localTrack from '../../assets/resources/pure.m4a';
// @ts-expect-error – sure we can import this
import localArtwork from '../../assets/resources/artwork.jpg';

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add([
    ...(staticSongs as Track[]),
    {
      id: '12345667776',
      url: localTrack,
      title: 'Pure (Demo)',
      artist: 'David Chavez',
      artwork: localArtwork,
      duration: 28,
      cover: 'https://rntp.dev/example/smooth-jazz-24-7.jpeg',
      album: '',
      genre: '',
    },
  ]);
};

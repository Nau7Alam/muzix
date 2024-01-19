import { useEffect, useState } from 'react';
import { SetupService } from '../playerServices/setupServices';
import TrackPlayer from 'react-native-track-player';
import { QueueInitialTracksService } from '../playerServices/queueInitialTracksService';
import { getLocalSongs } from '../helpers/permission';
import { IMusic } from '../interfaces/player/music.interface';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const useTrackSongs = () => {
  const [isPlayerReady, setPlayerReady] = useState<boolean>(false);
  useEffect(() => {
    let unmounted = false;
    let idMappedSongs: IMusic[];
    (async () => {
      await SetupService();
      if (unmounted) {
        return;
      }
      try {
        const result = await getLocalSongs();
        idMappedSongs =
          result?.map(song => ({
            id: uuidv4(),
            ...song,
          })) ?? [];
        console.log('MAPPED SONGS', Object.keys(idMappedSongs[0]));
        const queue = await TrackPlayer.getQueue();
        // await TrackPlayer.reset();
        if (!queue.length) {
          QueueInitialTracksService(idMappedSongs);
        }
        const queueRest = await TrackPlayer.getQueue();
        console.log(queueRest.map(i => i.title));
        console.log(
          'First $$$$$ PLAY QUEUE ',
          queue[queueRest.length - 1].title,
          queue.length
        );
        console.log(
          'LAST $$$$$ PLAY QUEUE ',
          queueRest[0].title,
          queueRest.length
        );
        setPlayerReady(true);
      } catch (error) {
        console.log('ERROR OCCUREED', error);
      }
    })();
    () => {
      unmounted = true;
    };
  }, []);
  return { isPlayerReady };
};

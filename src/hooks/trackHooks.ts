import { useEffect, useState } from 'react';
import { SetupService } from '../playerServices/setupServices';
import { getLocalSongs } from '../helpers/localMedia';
import { ISong } from '../interfaces/player/music.interface';
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from './stateHooks';
import { staticSongs } from '../constants/musicList';
import { setAllSong } from '../reducers/playerReducer';

export const useTrackSongs = () => {
  const [isPlayerReady, setPlayerReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unmounted = false;
    let idMappedSongs: ISong[];
    (async () => {
      await SetupService();
      if (unmounted) {
        return;
      }
      try {
        const result = await getLocalSongs();
        idMappedSongs =
          result?.map(song => ({
            id: song.artist + song.album,
            ...song,
            favourit: false,
          })) ?? [];

        dispatch(setAllSong([...idMappedSongs, ...staticSongs]));
        setPlayerReady(true);
      } catch (error) {
        console.log('ERROR OCCUREED', error);
      }
    })();
    () => {
      unmounted = true;
    };
  }, [dispatch]);
  return { isPlayerReady };
};

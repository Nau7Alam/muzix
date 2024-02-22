import { useEffect, useState } from 'react';
import { SetupService } from '../playerServices/setupServices';

export const useSetup = () => {
  const [isPlayerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      if (unmounted) {
        return;
      }
      try {
        await SetupService();
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

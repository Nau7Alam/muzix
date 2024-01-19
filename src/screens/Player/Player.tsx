import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';
import PlayerProgress from '../../components/PlayerProgress/PlayerProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { useTrackSongs } from '../../hooks/trackHooks';
import Text from '../../components/Text/Text';

const Player = () => {
  const theme: ITheme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const { position, duration } = useProgress();
  const onProgress = (value: any) => {
    console.log('HELLO WORLD', value[0]);
    TrackPlayer.seekTo(value[0]);
  };
  const { isPlayerReady } = useTrackSongs();
  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;

  console.log('PLAYING ???', isPlaying);
  console.log('Progress', { duration, position });

  const playSong = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };
  const onNext = async () => {
    await TrackPlayer.skipToNext();
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex) {
      let trackObject = await TrackPlayer.getTrack(trackIndex);
      console.log(`Title >>>>>>>>>>>>>>>>>> ${trackObject?.title}`);
    }
  };

  const onBack = async () => {
    await TrackPlayer.skipToPrevious();
  };

  if (!isPlayerReady) {
    return (
      <View>
        <Text xxxlg center>
          {' '}
          NOT READY
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ActivePlayer />
      <PlayerProgress
        progress={position}
        lenght={duration}
        onProgressChange={onProgress}
        onPlayControl={playSong}
        onForwardControl={onNext}
        onBackwardCongrol={onBack}
      />
    </SafeAreaView>
  );
};

const createStyle = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
};

export default Player;

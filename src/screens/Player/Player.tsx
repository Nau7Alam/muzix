import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';
import PlayerProgress from '../../components/PlayerProgress/PlayerProgress';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { useAppSelector } from '../../hooks/stateHooks';
import {
  activeSongListSelector,
  activeSongSelector,
  allSongSelector,
} from '../../reducers/playerReducer';
import { getIndexOfSong } from '../../helpers/utitlities';
import {
  addAndPlayCurrentTrack,
  addCurrentTrack,
} from '../../playerServices/trackFunctions';
import Layout from '../../components/Layout/Layout';

const Player = () => {
  const theme: ITheme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const { position, duration } = useProgress();
  const songs = useAppSelector(allSongSelector);
  const activeSongList = useAppSelector(activeSongListSelector) ?? songs;
  const activeSong = useAppSelector(activeSongSelector) ?? songs[0];
  const activeSongIndex = getIndexOfSong(activeSongList, activeSong);
  const carouselRef = useRef<any>(null);

  const onProgress = (value: any) => {
    TrackPlayer.seekTo(value[0]);
  };

  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;

  const playSong = async () => {
    const currentQueue = await TrackPlayer.getQueue();
    !currentQueue.length &&
      addCurrentTrack({ track: activeSong, tracks: activeSongList });
    console.log('PLAYLING', isPlaying);
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const onSongSlide = async (index: number) => {
    const activeOnCarousel = activeSongList[index];
    await addAndPlayCurrentTrack({ track: activeOnCarousel });
  };

  const onNext = async () => {
    if (activeSongIndex <= activeSongList.length - 2) {
      const nextSong = activeSongList[activeSongIndex + 1];
      carouselRef.current?.snapToNext();
      await addAndPlayCurrentTrack({ track: nextSong });
    }
  };

  const onBack = async () => {
    if (activeSongIndex > 0) {
      const previousSong = activeSongList[activeSongIndex - 1];
      carouselRef.current.snapToPrev();
      await addAndPlayCurrentTrack({ track: previousSong });
    }
  };

  return (
    <Layout style={styles.container}>
      <ActivePlayer
        ref={carouselRef}
        activeIndex={activeSongIndex}
        songs={activeSongList}
        onSlideChange={onSongSlide}
      />
      <PlayerProgress
        isPlaying={isPlaying}
        progress={position}
        lenght={duration}
        onProgressChange={onProgress}
        onPlayControl={playSong}
        onForwardControl={onNext}
        onBackwardCongrol={onBack}
      />
    </Layout>
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

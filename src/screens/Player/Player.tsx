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
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import {
  activeSongSelector,
  allSongSelector,
  setActiveSong,
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
  const activeSong = useAppSelector(activeSongSelector) ?? songs[0];
  const activeSongIndex = getIndexOfSong(songs, activeSong);
  const dispatch = useAppDispatch();
  const carouselRef = useRef<any>(null);

  const onProgress = (value: any) => {
    TrackPlayer.seekTo(value[0]);
  };

  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;

  const playSong = async () => {
    const currentQueue = await TrackPlayer.getQueue();
    !currentQueue.length && addCurrentTrack(activeSong);
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const onSongSlide = (index: number) => {
    const activeOnCarousel = songs[index];
    addAndPlayCurrentTrack(activeOnCarousel);
    dispatch(setActiveSong(activeOnCarousel));
  };

  const onNext = async () => {
    if (activeSongIndex <= songs.length - 2) {
      const nextSong = songs[activeSongIndex + 1];
      carouselRef.current?.snapToNext();
      addAndPlayCurrentTrack(nextSong);
      dispatch(setActiveSong(nextSong));
    }
  };

  const onBack = async () => {
    if (activeSongIndex > 0) {
      const previousSong = songs[activeSongIndex - 1];
      carouselRef.current.snapToPrev();
      addAndPlayCurrentTrack(previousSong);
      dispatch(setActiveSong(previousSong));
    }
  };

  return (
    <Layout style={styles.container}>
      <ActivePlayer
        ref={carouselRef}
        activeIndex={activeSongIndex}
        songs={songs}
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

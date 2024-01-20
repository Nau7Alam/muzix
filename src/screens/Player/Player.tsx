import React, { useMemo, useRef } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import {
  activeSongSelector,
  allSongSelector,
  setActiveSong,
} from '../../reducers/playerReducer';
import { getIndexOfSong } from '../../helpers/utitlities';
import { addCurrentTrack } from '../../playerServices/trackFunctions';

const Player = () => {
  const theme: ITheme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const { position, duration } = useProgress();
  const { isPlayerReady } = useTrackSongs();
  const songs = useAppSelector(allSongSelector);
  const activeSong = useAppSelector(activeSongSelector) ?? songs[0];
  const activeSongIndex = getIndexOfSong(songs, activeSong!);
  const dispatch = useAppDispatch();

  const onProgress = (value: any) => {
    TrackPlayer.seekTo(value[0]);
  };
  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;

  console.log('INDEX OF >>>>>>>>>>>', activeSongIndex);

  const playSong = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const onSongSlide = (index: number) => {
    console.log('INDEX >>>>', index);
    const activeOnCarousel = songs[index];
    addCurrentTrack(activeOnCarousel);
    dispatch(setActiveSong(activeOnCarousel));
  };

  const onNext = async () => {
    if (activeSongIndex <= songs.length - 2) {
      const nextSong = songs[activeSongIndex + 1];
      console.log('NEXT SONG ', nextSong.title);
      carouselRef.current?.snapToNext();
      addCurrentTrack(nextSong);
      dispatch(setActiveSong(nextSong));
    }
  };

  const onBack = async () => {
    if (activeSongIndex > 0) {
      const previousSong = songs[activeSongIndex - 1];
      console.log('PREVIOUS SONG ', previousSong.title);
      carouselRef.current.snapToPrev();
      addCurrentTrack(previousSong);
      dispatch(setActiveSong(previousSong));
    }
  };

  const carouselRef = useRef<any>(null);

  if (!isPlayerReady) {
    return (
      <View>
        <Text xxxlg center>
          NOT READY
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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

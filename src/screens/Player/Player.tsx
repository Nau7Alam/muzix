import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';
import PlayerProgress from '../../components/PlayerProgress/PlayerProgress';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import {
  activeSongListSelector,
  activeSongSelector,
  allSongSelector,
  playStateSelector,
  setPlayState,
  toggleFavouritSong,
} from '../../reducers/playerReducer';
import { getIndexOfSong, songPresentInList } from '../../helpers/utitlities';
import {
  addAndPlayCurrentTrack,
  addCurrentTrack,
} from '../../playerServices/trackFunctions';
import Layout from '../../components/Layout/Layout';
import {
  playlistSelector,
  toggleFavourite,
} from '../../reducers/playlistReducer';
import { RootState } from '../../store';
import { WarningToast } from '../../helpers/toast';

const Player = () => {
  const dispatch = useAppDispatch();
  const theme: ITheme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const carouselRef = useRef<any>(null);
  const { position, duration } = useProgress();

  const isPlaying = useAppSelector(playStateSelector);
  const songs = useAppSelector(allSongSelector);
  const activeSongList = useAppSelector(activeSongListSelector) ?? songs;
  const activeSong = useAppSelector(activeSongSelector) ?? songs[0];
  const favouriteSongs = useAppSelector((state: RootState) =>
    playlistSelector(state, 'favourites')
  );
  const activeSongIndex = getIndexOfSong(activeSongList, activeSong);

  const onProgress = (value: any) => {
    TrackPlayer.seekTo(value[0]);
  };

  const playSong = async () => {
    const currentQueue = await TrackPlayer.getQueue();
    !currentQueue.length &&
      addCurrentTrack({ track: activeSong, tracks: activeSongList });
    if (isPlaying) {
      dispatch(setPlayState(false));
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
      dispatch(setPlayState(true));
    }
  };

  const onSongSlide = async (index: number) => {
    const activeOnCarousel = activeSongList[index];
    await addAndPlayCurrentTrack({ track: activeOnCarousel });
  };

  const onNext = async () => {
    if (activeSongIndex <= activeSongList.length - 2) {
      carouselRef.current?.snapToNext();
    } else {
      WarningToast('End!', 'Last song in the queue!');
    }
  };

  const onBack = async () => {
    if (activeSongIndex > 0) {
      carouselRef.current.snapToPrev();
    } else {
      WarningToast('First!', 'First song in the queue!');
    }
  };

  const onFavourit = () => {
    dispatch(toggleFavouritSong({ isPlaying: true, song: activeSong }));
    dispatch(toggleFavourite({ song: activeSong }));
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
        isFavourite={
          activeSong.favourit ||
          songPresentInList(activeSong, favouriteSongs.songs)
        }
        progress={position}
        lenght={duration}
        onFavourit={onFavourit}
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
      paddingBottom: 0,
    },
  });
};

export default Player;

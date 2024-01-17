import React, { useEffect, useMemo } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';
import PlayerProgress from '../../components/PlayerProgress/PlayerProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SetupService } from '../../playerServices/setupServices';
import TrackPlayer from 'react-native-track-player';

// @ts-expect-error – sure we can import this
import localTrack from '../../../assets/resources/pure.m4a';

// @ts-expect-error – sure we can import this
import localArtwork from '../../../assets/resources/artwork.jpg';
import { staticSongs } from '../../constants/musicList';

const Player = () => {
  const theme: ITheme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const playSong = async () => {
    await TrackPlayer.play();
  };
  const stopSong = async () => {
    await TrackPlayer.pause();
  };
  useEffect(() => {
    SetupService().then(
      () => {
        const firstSong = staticSongs[1];
        TrackPlayer.add(firstSong);
      }
      // TrackPlayer.add({
      //   id: '12345667776',
      //   url: localTrack,
      //   title: 'Pure (Demo)',
      //   artist: 'David Chavez',
      //   artwork: localArtwork,
      //   duration: 28,
      //   cover: 'https://rntp.dev/example/smooth-jazz-24-7.jpeg',
      //   album: '',
      //   genre: '',
      // })
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={playSong} title="Play" color="blue" />
      <Button onPress={stopSong} title="Stop" color="red" />
      <Header />
      <ActivePlayer />
      <PlayerProgress />
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

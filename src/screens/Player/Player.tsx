import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';
import PlayerProgress from '../../components/PlayerProgress/PlayerProgress';
import { SafeAreaView } from 'react-native-safe-area-context';

const Player = () => {
  const theme: ITheme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
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

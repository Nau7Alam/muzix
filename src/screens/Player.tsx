import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import Header from '../components/Header/Header';
import ActivePlayer from '../components/ActivePlayer/ActivePlayer';
import PlayerProgress from '../components/PlayerProgress/PlayerProgress';

const Player = () => {
  const theme: ITheme = useTheme() as ITheme;
  console.log('THEME', theme.fontSize);
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View style={styles.container}>
      <Header />
      <ActivePlayer />
      <PlayerProgress />
    </View>
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

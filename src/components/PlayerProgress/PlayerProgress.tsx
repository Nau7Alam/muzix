import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import ProgressBar from './ProgressBar';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import {
  selectRepeatMode,
  selectShuffelMode,
  toggleRepeatMode,
  toggleShuffelMode,
} from '../../reducers/playerReducer';

interface PlayerProgressProps {
  isPlaying: boolean;
  isFavourite: boolean;
  progress: number;
  lenght: number;
  onProgressChange: (e: any) => void;
  onPlayControl: () => void;
  onForwardControl: () => void;
  onBackwardCongrol: () => void;
  onFavourit: () => void;
}

export const PlayerProgress = ({
  isPlaying,
  isFavourite,
  progress,
  lenght,
  onProgressChange,
  onPlayControl,
  onForwardControl,
  onBackwardCongrol,
  onFavourit,
}: PlayerProgressProps) => {
  const theme = useTheme() as ITheme;
  const { colors, fontSize } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const repeatMode = useAppSelector(selectRepeatMode);
  const shuffelMode = useAppSelector(selectShuffelMode);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.continer}>
      <View style={styles.musicOptions}>
        <PressableIcon
          onPress={() => dispatch(toggleRepeatMode())}
          size={fontSize.lg}
          name="refresh"
          color={repeatMode ? colors.primaryDark : colors.icon}
        />
        <PressableIcon
          onPress={onFavourit}
          iconType="octa"
          name={isFavourite ? 'heart-fill' : 'heart'}
          size={fontSize.xlg}
          color={isFavourite ? colors.primaryDark : colors.icon}
        />
        <PressableIcon
          onPress={() => dispatch(toggleShuffelMode())}
          size={fontSize.lg}
          name="shuffle"
          color={shuffelMode ? colors.primaryDark : colors.icon}
        />
      </View>
      <ProgressBar
        progress={progress}
        lenght={lenght}
        onProgressChange={onProgressChange}
      />
      <View style={styles.musicButtons}>
        <PressableIcon
          onPress={onBackwardCongrol}
          size={fontSize.lg}
          name="control-rewind"
          color={colors.icon}
        />
        <PressableIcon
          onPress={onPlayControl}
          style={styles.playButton}
          name={isPlaying ? 'control-pause' : 'control-play'}
          size={fontSize.xxlg}
          color={colors.iconDark}
        />
        <PressableIcon
          onPress={onForwardControl}
          size={fontSize.lg}
          name="control-forward"
          color={colors.icon}
        />
      </View>
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { margin, padding, colors, borderRadius } = theme;
  return StyleSheet.create({
    continer: {
      paddingHorizontal: padding.ten,
      flex: 4,
      justifyContent: 'space-evenly',
    },
    musicOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: padding.lg,
    },
    musicButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButton: {
      backgroundColor: colors.card,
      height: 80,
      width: 80,
      borderRadius: borderRadius.full,
      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: margin.xxlg,
    },
  });
};

export default PlayerProgress;

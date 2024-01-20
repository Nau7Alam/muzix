import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import ProgressBar from './ProgressBar';

interface PlayerProgressProps {
  isPlaying: boolean;
  progress: number;
  lenght: number;
  onProgressChange: (e: any) => void;
  onPlayControl: () => void;
  onForwardControl: () => void;
  onBackwardCongrol: () => void;
}

export const PlayerProgress = ({
  isPlaying,
  progress,
  lenght,
  onProgressChange,
  onPlayControl,
  onForwardControl,
  onBackwardCongrol,
}: PlayerProgressProps) => {
  const [pressCount, setPressCount] = useState(0);
  const theme = useTheme() as ITheme;
  const { colors, fontSize } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const onShare = () => {
    const rounded = Number((pressCount + 0.1).toFixed(1));
    setPressCount(rounded);
  };
  return (
    <View style={styles.continer}>
      <View style={styles.musicOptions}>
        <PressableIcon
          onPress={onShare}
          size={fontSize.lg}
          name="refresh"
          color={colors.icon}
        />
        <PressableIcon
          onPress={onShare}
          name="heart"
          size={fontSize.lg}
          color={colors.icon}
        />
        <PressableIcon
          onPress={onShare}
          size={fontSize.lg}
          name="shuffle"
          color={colors.icon}
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
          buttonStyle={styles.playButton}
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

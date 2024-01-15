import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import ProgressBar from './ProgressBar';

export const PlayerProgress = () => {
  const [pressCount, setPressCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const onProgress = (value: any) => {
    setProgress(value);
  };
  const onPlay = () => {
    console.log('PRESSED !!');
    const rounded = Number((pressCount + 0.1).toFixed(1));
    setPressCount(rounded);
  };
  return (
    <View style={styles.continer}>
      <View style={styles.musicOptions}>
        <PressableIcon
          onPress={onPlay}
          size={theme.fontSize.lg}
          name="reload"
          color={theme.colors.border}
        />
        <PressableIcon
          onPress={onPlay}
          name="heart"
          size={theme.fontSize.xxlg}
          color={theme.colors.border}
        />
        <PressableIcon
          onPress={onPlay}
          size={theme.fontSize.lg}
          name="shuffle"
          color={theme.colors.border}
        />
      </View>
      <ProgressBar progress={progress} onProgressChange={onProgress} />
      <View style={styles.musicButtons}>
        <PressableIcon
          onPress={onPlay}
          size={theme.fontSize.lg}
          name="control-rewind"
          color={theme.colors.border}
        />
        <PressableIcon
          onPress={onPlay}
          buttonStyle={styles.playButton}
          name="control-pause"
          size={theme.fontSize.xxlg}
          color={theme.colors.border}
        />
        <PressableIcon
          onPress={onPlay}
          size={theme.fontSize.lg}
          name="control-forward"
          color={theme.colors.border}
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

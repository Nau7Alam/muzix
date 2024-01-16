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
  const { colors, fontSize } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const onProgress = (value: any) => {
    setProgress(value);
  };
  const onPlay = () => {
    const rounded = Number((pressCount + 0.1).toFixed(1));
    setPressCount(rounded);
  };
  return (
    <View style={styles.continer}>
      <View style={styles.musicOptions}>
        <PressableIcon
          onPress={onPlay}
          size={fontSize.lg}
          name="refresh"
          color={colors.icon}
        />
        <PressableIcon
          onPress={onPlay}
          name="heart"
          size={fontSize.lg}
          color={colors.icon}
        />
        <PressableIcon
          onPress={onPlay}
          size={fontSize.lg}
          name="shuffle"
          color={colors.icon}
        />
      </View>
      <ProgressBar progress={progress} onProgressChange={onProgress} />
      <View style={styles.musicButtons}>
        <PressableIcon
          onPress={onPlay}
          size={fontSize.lg}
          name="control-rewind"
          color={colors.icon}
        />
        <PressableIcon
          onPress={onPlay}
          buttonStyle={styles.playButton}
          name="control-pause"
          size={fontSize.xxlg}
          color={colors.iconDark}
        />
        <PressableIcon
          onPress={onPlay}
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

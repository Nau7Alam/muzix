import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import ProgressBar from './ProgressBar';

export const PlayerProgress = () => {
  const [pressCount, setPressCount] = useState(0);
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const onPlay = () => {
    console.log('PRESSED !!');
    const rounded = Number((pressCount + 0.1).toFixed(1));
    setPressCount(rounded);
  };
  return (
    <View style={styles.continer}>
      <Text style={{ fontSize: theme.fontSize.xxlg, marginBottom: 20 }}>
        Click Count : {pressCount}
      </Text>
      <ProgressBar progress={0.5} />
      <View style={styles.musicButtons}>
        <PressableIcon
          onPress={onPlay}
          size={theme.fontSize.lg}
          name="control-rewind"
          color={theme.colors.text}
        />
        <PressableIcon
          onPress={onPlay}
          buttonStyle={styles.playButton}
          name="control-pause"
          size={theme.fontSize.xxlg}
          color={theme.colors.text}
        />
        <PressableIcon
          onPress={onPlay}
          size={theme.fontSize.lg}
          name="control-forward"
          color={theme.colors.text}
        />
      </View>
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { margin, padding, colors, borderRadius } = theme;
  return StyleSheet.create({
    continer: {
      padding: padding.lg,
    },
    musicButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: margin.lg,
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

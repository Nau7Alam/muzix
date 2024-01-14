import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';

type ProgressBarProps = {
  progress: number;
};
const ProgressBar = ({ progress }: ProgressBarProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{progress}</Text>
      <Pressable style={[styles.dot]} />
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { colors, padding, borderRadius, fontSize } = theme;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.borderLight,
      height: padding.four,
      borderRadius: borderRadius.two,
    },
    dot: {
      position: 'absolute',
      backgroundColor: colors.border,
      width: fontSize.md,
      height: fontSize.md,
      borderRadius: borderRadius.lg,
      top: -6,
    },
    text: {
      position: 'absolute',
      top: 20,
    },
  });
};
export default ProgressBar;

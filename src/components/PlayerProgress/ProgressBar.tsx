import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { Slider } from '@miblanchard/react-native-slider';
import Text from '../Text/Text';
import { secondsToHms } from '../../helpers/utitlities';

type ProgressBarProps = {
  progress: number;
  lenght: number;
  onProgressChange: (val: any) => void;
};
const ProgressBar = ({
  lenght,
  progress,
  onProgressChange,
}: ProgressBarProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View style={[styles.container]}>
      <Text center xxs color={theme.colors.border} style={styles.text}>
        {secondsToHms(progress)}
      </Text>
      <Slider
        containerStyle={styles.sliderBox}
        value={progress}
        maximumValue={lenght}
        onValueChange={(value: any) => onProgressChange(value)}
        minimumTrackTintColor={theme.colors.border}
        maximumTrackTintColor={theme.colors.borderLight}
        thumbTintColor={theme.colors.border}
        thumbTouchSize={{ width: 20, height: 20 }}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        trackClickable
      />
      <Text center xxs color={theme.colors.border} style={styles.text}>
        {secondsToHms(lenght)}
      </Text>
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { padding, borderRadius } = theme;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderBox: {
      flex: 1,
    },
    track: {
      height: padding.four - 1,
    },
    thumb: {
      height: borderRadius.md,
      width: borderRadius.md,
    },
    text: {
      width: 40,
    },
  });
};
export default ProgressBar;

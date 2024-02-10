import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { StyleSheet, View } from 'react-native';
import Icon from '../Icon/Icon';
import { Switch as RNSwitch } from 'react-native-switch';

const SwitchIcon = ({ active }: any) => {
  const { colors } = useTheme() as ITheme;
  // const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View>
      <Icon
        type="font"
        name={active ? 'day-sunny' : 'night-clear'}
        color={active ? colors.white : colors.textDark}
        size={18}
      />
    </View>
  );
};

type SwitchProps = {
  value: boolean;
  onChange: (val: boolean) => void;
  type?: string;
};

const Switch = ({ value, onChange }: SwitchProps) => {
  const theme = useTheme() as ITheme;
  const { colors } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <RNSwitch
      value={value}
      onValueChange={onChange}
      disabled={false}
      activeText={'On'}
      inActiveText={'Off'}
      circleSize={27}
      barHeight={34}
      circleBorderWidth={2}
      backgroundActive={colors.primaryDark}
      backgroundInactive={colors.borderDark}
      circleActiveColor={colors.primary}
      circleInActiveColor={colors.border}
      renderInsideCircle={() => <SwitchIcon active={value} />} // custom component to render inside the Switch circle (Text, Image, etc.)
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      // eslint-disable-next-line react-native/no-inline-styles
      innerCircleStyle={{
        ...styles.innerCircleStyle,
        borderColor: value ? colors.white : colors.textDark,
      }} // style for inner animated circle for what you (may) be rendering inside the circle
      outerCircleStyle={{}} // style for outer animated circle
      containerStyle={{
        ...styles.switchContainer,
        borderColor: value ? colors.primaryLight : colors.borderLight,
      }}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2.2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={1.7} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2.3} // multiplied by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
  );
};
const createStyle = (_theme: ITheme) => {
  return StyleSheet.create({
    switchContainer: { borderWidth: 2 },
    innerCircleStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default Switch;

import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { StyleSheet, View } from 'react-native';
import Text from '../Text/Text';
import Switch from './Switch';
import Icon from '../Icon/Icon';
import { IconTypes } from '../../constants/typeConstant';

type SwitchOptionProps = {
  label: string;
  isActive: boolean;
  icon: string;
  onChange: (val: boolean) => void;
};

const SwitchOption = ({
  label,
  icon,
  isActive,
  onChange,
}: SwitchOptionProps) => {
  const theme = useTheme() as ITheme;
  //   const { colors } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Icon
          name={icon}
          type={IconTypes.MCICONS}
          color={theme.colors.black}
          size={theme.fontSize.xxlg}
        />
        <Text md>{label}</Text>
      </View>

      <Switch type="theme" value={isActive} onChange={onChange} />
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: theme.padding.four,
    },
    labelContainer: {
      flexDirection: 'row',
      gap: theme.padding.four,
      alignItems: 'center',
    },
  });
};

export default SwitchOption;

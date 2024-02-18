import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import { IColors, ITheme } from '../../../theme/theme.interface';

const createStyles = (theme: ITheme) => {
  const { padding, borderRadius, colors } = theme;
  return StyleSheet.create({
    bottomSheet: {
      flex: 1,
      paddingHorizontal: padding.six,
    },
    bottomSheetView: {
      marginTop: padding.six,
      paddingBottom: padding.lg,
    },
    bottomSheetItem: {
      flexDirection: 'row',
      gap: padding.lg,
      paddingVertical: padding.lg,
      paddingHorizontal: padding.lg,
      borderBottomWidth: 0.4,
      borderRadius: borderRadius.eight,
      alignItems: 'center',
      borderBottomColor: colors.borderLight,
    },
  });
};

type OptionListProps = {
  leftIcon: string;
  items: any[];
  onChangeFilter: (val?: string | number) => void;
  colors: IColors;
};

const OptionList = ({
  colors,
  leftIcon,
  items,
  onChangeFilter,
}: OptionListProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.bottomSheetView}>
        {items.map(item => (
          <Pressable
            key={item.value}
            style={[styles.bottomSheetItem]}
            onPress={() => {
              onChangeFilter(item);
            }}
          >
            {leftIcon && (
              <Icon
                type="material"
                name={item.icon ?? leftIcon}
                color={colors.black}
                size={theme.fontSize.lg}
              />
            )}
            <Text numberOfLines={1} md color={colors.text}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OptionList;

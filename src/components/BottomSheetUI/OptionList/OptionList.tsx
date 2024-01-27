import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import { IColors, ITheme } from '../../../theme/theme.interface';

const createStyles = (theme: ITheme) => {
  const { padding, borderRadius } = theme;
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
    },
  });
};

type OptionListProps = {
  activeValue: string | number;
  leftIcon: string;
  items: any[];
  onChangeFilter: (val?: string | number) => void;
  colors: IColors;
};

const OptionList = ({
  colors,
  activeValue,
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
            style={[
              {
                borderBottomColor: colors.borderLight,
                backgroundColor:
                  activeValue === item.value
                    ? colors.primaryLight
                    : colors.cardLight,
              },
              styles.bottomSheetItem,
            ]}
            onPress={() => {
              onChangeFilter(item);
            }}
          >
            {leftIcon && (
              <Icon
                type="material"
                name={leftIcon}
                color={colors.black}
                size={24}
              />
            )}
            <Text numberOfLines={1} md color={colors.text}>
              {item.name}, {activeValue} {item.value} HELLO WORLD IS WORKING
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OptionList;

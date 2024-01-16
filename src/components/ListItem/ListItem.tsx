import React, { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Image,
  View,
  GestureResponderEvent,
} from 'react-native';
import Text from '../Text/Text';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';

type ListItemProps = {
  title: string;
  subTitle: string;
  coverImage: string;
  selected?: boolean;
  onItemSelect?: () => void;
  onItemClick: () => void;
  onOptionClick: () => void;
  onSecondaryOptionClick?: () => void;
};

const ListItem = ({
  title,
  coverImage,
  subTitle,
  selected,
  onItemClick,
  onItemSelect,
  onOptionClick,
  onSecondaryOptionClick,
}: ListItemProps) => {
  const theme = useTheme() as ITheme;
  const { colors, fontSize } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <Pressable
      onPress={onItemClick}
      style={{
        ...styles.continer,
        ...(selected && styles.selectedStyle),
      }}
      onLongPress={(_event: GestureResponderEvent) =>
        !!onItemSelect && onItemSelect()
      }
    >
      <Image
        style={{
          ...styles.coverImage,
          ...(selected && styles.selectedCoverImage),
        }}
        source={{ uri: coverImage }}
      />
      <View style={styles.titleBox}>
        <Text numberOfLines={1} md semiBold color={colors.text}>
          {title} This is an additional text for the song were length is checked
        </Text>
        <Text numberOfLines={1} xs color={colors.textLight}>
          {subTitle}
        </Text>
        {/* <Text color={colors.textLight} xxs bold>
          {selected ? 'SELECTED' : 'NOT SELECTED'}
        </Text> */}
      </View>
      <View style={styles.optionBox}>
        {!!onSecondaryOptionClick && (
          <PressableIcon
            name="heart"
            onPress={onSecondaryOptionClick}
            color={selected ? colors.primaryDark : colors.primary}
            size={fontSize.lg}
            style={styles.iconStyle}
          />
        )}
        <PressableIcon
          name="options-vertical"
          color={selected ? colors.icon : colors.iconDark}
          onPress={onOptionClick}
          size={fontSize.lg}
          style={styles.iconStyle}
        />
      </View>
    </Pressable>
  );
};

export default ListItem;

const createStyle = (theme: ITheme) => {
  const { padding, borderRadius, margin, colors } = theme;
  return StyleSheet.create({
    continer: {
      marginHorizontal: margin.four,
      marginLeft: margin.ten,
      marginRight: margin.zero,
      paddingVertical: padding.six,
      paddingHorizontal: padding.eight,
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedStyle: {
      backgroundColor: colors.primary,
      borderTopLeftRadius: borderRadius.full,
      borderBottomLeftRadius: borderRadius.full,
    },
    coverImage: {
      height: 55,
      width: 55,
      borderRadius: borderRadius.ten,
    },
    selectedCoverImage: {
      height: 60,
      width: 60,
      borderRadius: borderRadius.full,
      borderColor: colors.cardDark,
      borderWidth: borderRadius.six,
    },
    titleBox: {
      flex: 1,
      justifyContent: 'space-around',
      gap: padding.four,
      padding: padding.ten,
    },
    optionBox: {
      flexDirection: 'row',
    },
    iconStyle: {
      padding: padding.four,
    },
  });
};

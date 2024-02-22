import React, { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ImageStyle,
} from 'react-native';
import Text from '../Text/Text';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Avatar from '../Avatar/Avatar';
import { IMAGE_TYPE } from '../../constants/listOptions';

type ListItemProps = {
  title: string;
  subTitle?: string;
  coverImage?: string;
  selected?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  coverImageStyle?: StyleProp<ImageStyle>;
  secondaryOptionIcon?: string;
  onClick: () => void;
  onSelect?: () => void;
  onOptionClick?: () => void;
  onSecondaryOptionClick?: () => void;
};

const ListItem = ({
  title,
  coverImage,
  subTitle,
  selected,
  titleStyle,
  coverImageStyle,
  secondaryOptionIcon,
  onClick,
  onSelect,
  onOptionClick,
  onSecondaryOptionClick,
}: ListItemProps) => {
  const theme = useTheme() as ITheme;
  const { colors, fontSize } = theme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <Pressable
      onPress={onClick}
      style={{
        ...styles.continer,
        ...(selected && styles.selectedStyle),
      }}
      onLongPress={(_event: GestureResponderEvent) => !!onSelect && onSelect()}
    >
      <Avatar
        style={[
          selected && styles.selectedCoverImage,
          !!coverImageStyle && (coverImageStyle as Object),
        ]}
        type={
          typeof coverImage === 'string' ? IMAGE_TYPE.url : IMAGE_TYPE.require
        }
        image={coverImage}
      />
      <View style={styles.titleBox}>
        <Text
          numberOfLines={1}
          md
          semiBold
          color={colors.text}
          style={[titleStyle]}
        >
          {title}
        </Text>
        <Text numberOfLines={1} xs color={colors.textLight}>
          {subTitle}
        </Text>
      </View>
      {!!onOptionClick && (
        <View style={styles.optionBox}>
          {!!onSecondaryOptionClick && (
            <PressableIcon
              name={secondaryOptionIcon ?? 'settings'}
              onPress={onSecondaryOptionClick}
              color={selected ? colors.primaryDark : colors.primary}
              size={fontSize.base + 4}
              iconType="octa"
              style={styles.iconStyle}
            />
          )}
          <PressableIcon
            name="options-vertical"
            color={selected ? colors.icon : colors.iconDark}
            onPress={onOptionClick}
            size={fontSize.base + 4}
            style={styles.iconStyle}
          />
        </View>
      )}
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
      paddingVertical: padding.four,
      paddingHorizontal: padding.six,
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedStyle: {
      backgroundColor: colors.primary,
      borderTopLeftRadius: borderRadius.full,
      borderBottomLeftRadius: borderRadius.full,
    },
    selectedCoverImage: {
      height: 55,
      width: 55,
      borderRadius: borderRadius.full,
      borderColor: colors.cardDark,
      borderWidth: borderRadius.six,
    },
    titleBox: {
      flex: 1,
      justifyContent: 'space-around',
      alignSelf: 'center',
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

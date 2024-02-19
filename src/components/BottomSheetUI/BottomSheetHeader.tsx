import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { IColors, ITheme } from '../../theme/theme.interface';
import Avatar from '../Avatar/Avatar';

type BottomSheetModalHeaderProps = {
  title: string;
  subTitle?: string;
  coverImage?: string;
  colors: IColors;
  closeModal: () => void;
};

const BottomSheetModalHeader = ({
  title,
  subTitle,
  coverImage,
  closeModal,
  colors,
}: BottomSheetModalHeaderProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerBox}>
        <Avatar style={[styles.coverImageStyle]} image={coverImage} />
        <View style={styles.titleBox}>
          <Text numberOfLines={1} md bold color={colors.textDark}>
            {title}
          </Text>
          {!!subTitle && (
            <Text numberOfLines={2} xs semiBold color={colors.textLight}>
              {subTitle}
            </Text>
          )}
        </View>
      </View>
      <Pressable style={styles.closeButton} onPress={closeModal}>
        <Icon
          type="font"
          name="close"
          color={colors.danger}
          size={theme.fontSize.lg}
        />
      </Pressable>
    </View>
  );
};

const createStyles = (theme: ITheme) => {
  const { padding, colors } = theme;
  return StyleSheet.create({
    headerContainer: {
      paddingBottom: padding.lg,
      paddingTop: padding.two,
      paddingHorizontal: padding.ten,
      borderBottomColor: colors.border,
      borderBottomWidth: 0.4,
      flexDirection: 'row',
      width: '100%',
    },
    headerBox: {
      flexDirection: 'row',
      gap: padding.ten,
      alignItems: 'center',
      flex: 1,
    },
    titleBox: { flex: 1 },
    coverImageStyle: {
      height: 45,
      width: 45,
    },
    closeButton: {
      paddingLeft: padding.ten,
      paddingVertical: padding.four,
    },
  });
};

export default BottomSheetModalHeader;

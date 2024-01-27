import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { IColors, ITheme } from '../../theme/theme.interface';

type BottomSheetModalHeaderProps = {
  title: string;
  closeModal: () => void;
  colors: IColors;
};

const BottomSheetModalHeader = ({
  title,
  closeModal,
  colors,
}: BottomSheetModalHeaderProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text md bold color={colors.textDark} style={styles.headerTitle}>
          {title}
        </Text>
      </View>
      <Pressable style={styles.closeButton} onPress={closeModal}>
        <View
          style={[
            {
              backgroundColor: colors.cardLight,
              borderColor: colors.borderLight,
            },
            styles.closeButtonView,
          ]}
        >
          <Icon type="font" name="close" color={colors.danger} size={16} />
        </View>
      </Pressable>
    </View>
  );
};

const createStyles = (theme: ITheme) => {
  const { padding, colors, borderRadius } = theme;
  return StyleSheet.create({
    headerContainer: {
      paddingBottom: padding.lg,
      paddingTop: padding.two,
      paddingHorizontal: padding.eight,
      borderBottomColor: colors.border,
      borderBottomWidth: 0.4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerTitle: {
      textAlign: 'center',
    },
    closeButton: {
      paddingLeft: padding.four,
      paddingVertical: padding.two,
    },
    closeButtonView: {
      padding: padding.two,
      borderRadius: borderRadius.full,
      borderWidth: 0.5,
    },
  });
};

export default BottomSheetModalHeader;

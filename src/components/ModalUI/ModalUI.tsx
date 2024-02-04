import { useTheme } from '@react-navigation/native';
import React, { ReactNode, useMemo } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import PressableIcon from '../PressabelIcon/PressableIcon';
import Text from '../Text/Text';
import Toast from 'react-native-toast-message';

type ModalUIProps = {
  children: ReactNode;
  title: string;
  visible: boolean;
  onClose: () => void;
};

const ModalUI = ({ children, visible, title, onClose }: ModalUIProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.continer}>
        <View style={styles.modelContainer}>
          <PressableIcon
            onPress={onClose}
            name="close"
            color={theme.colors.white}
            size={21}
            style={styles.close}
          />
          <Text
            style={styles.titleStyle}
            lg
            semiBold
            center
            color={theme.colors.white}
          >
            {title}
          </Text>
          {children}
        </View>
      </Pressable>
      <Toast />
    </Modal>
  );
};

const createStyle = (theme: ITheme) => {
  const { colors, padding, screen, borderRadius } = theme;
  return StyleSheet.create({
    continer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    modelContainer: {
      width: screen.width * 0.9,
      backgroundColor: colors.black,
      padding: padding.lg,
      borderRadius: borderRadius.ten,
      elevation: 4,
      gap: padding.eight,
      top: -65,
    },
    titleStyle: {
      paddingBottom: padding.xlg,
    },
    close: { alignSelf: 'flex-end', padding: 0 },
  });
};

export default ModalUI;

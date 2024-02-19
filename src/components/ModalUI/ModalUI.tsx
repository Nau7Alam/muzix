import { useTheme } from '@react-navigation/native';
import React, { ReactNode, useMemo } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
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
        <Pressable
          onPress={e => e.stopPropagation()}
          style={styles.modelContainer}
        >
          <PressableIcon
            onPress={onClose}
            name="close"
            color={theme.colors.white}
            size={theme.fontSize.lg}
            style={styles.close}
          />
          <Text
            style={styles.titleStyle}
            md
            semiBold
            center
            color={theme.colors.white}
          >
            {title}
          </Text>
          {children}
        </Pressable>
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
      backgroundColor: 'rgba(0,0,0,0.26)',
    },
    modelContainer: {
      width: screen.width * 0.9,
      backgroundColor: colors.textDark,
      padding: padding.lg,
      borderRadius: borderRadius.ten,
      elevation: 4,
      gap: padding.eight,
      top: -padding.xlg,
    },
    titleStyle: {
      paddingBottom: padding.xlg,
    },
    close: { alignSelf: 'flex-end', padding: 0 },
  });
};

export default ModalUI;

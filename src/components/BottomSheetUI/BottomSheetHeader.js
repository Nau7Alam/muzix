import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const createStyles = theme => {
  const { padding, colors, borderRadius } = theme;
  return StyleSheet.create({
    headerContainer: {
      paddingBottom: padding.lg,
      paddingTop: padding.micro,
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

const propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  colors: PropTypes.object,
};

const BottomSheetModalHeader = ({ title, closeModal, colors }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.headerContainer}>
      <Text md bold color={colors.textDark} style={styles.headerTitle}>
        {title}
      </Text>
      <Pressable style={styles.closeButton} onPress={closeModal}>
        <View
          style={[
            {
              backgroundColor: colors.backgroundLight,
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

BottomSheetModalHeader.propTypes = propTypes;
export default BottomSheetModalHeader;

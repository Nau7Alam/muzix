import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal as BottomSheetModalLibrary,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import BottomSheetModalHeader from './BottomSheetHeader';

const createStyles = theme => {
  const { padding } = theme;
  return StyleSheet.create({
    handleStyle: {
      paddingBottom: padding.two,
      paddingTop: padding.four,
    },
  });
};

const BottomSheetUI = ({
  children,
  headerTitle,
  closeFilter,
  showHeader,
  initialSnapPoints,
  bottomSheetModalRef,
  onDismiss,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        pressBehavior={'close'}
        opacity={0.5}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModalLibrary
      index={1}
      ref={bottomSheetModalRef}
      onChange={props => {}}
      snapPoints={initialSnapPoints}
      backgroundStyle={{ backgroundColor: colors.card }}
      handleIndicatorStyle={{ backgroundColor: colors.textSecondaryDark }}
      handleStyle={styles.handleStyle}
      topInset={60}
      backdropComponent={renderBackdrop}
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enablePanDownToClose
      onDismiss={onDismiss}
    >
      {showHeader && (
        <BottomSheetModalHeader
          title={headerTitle}
          closeModal={closeFilter}
          colors={colors}
        />
      )}
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </BottomSheetModalLibrary>
  );
};

BottomSheetUI.propTypes = {
  children: PropTypes.element.isRequired,
  bottomSheetModalRef: PropTypes.object.isRequired,
  showHeader: PropTypes.bool,
  onDismiss: PropTypes.func,
  initialSnapPoints: PropTypes.array,
  closeFilter: PropTypes.func,
  headerTitle: PropTypes.string,
};

export default BottomSheetUI;

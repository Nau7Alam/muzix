import React, { ReactNode, useCallback, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal as BottomSheetModalLibrary,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import BottomSheetModalHeader from './BottomSheetHeader';
import { ITheme } from '../../theme/theme.interface';

const createStyles = (theme: ITheme) => {
  const { padding } = theme;
  return StyleSheet.create({
    handleStyle: {
      paddingBottom: padding.two,
      paddingTop: padding.four,
    },
  });
};

type BottomSheetUIProps = {
  bottomSheetModalRef: any;
  headerTitle: string;
  children: ReactNode;
  showHeader: boolean;
  initialSnapPoints: any[];
  onDismiss?: () => void;
  closeFilter: () => void;
};

const BottomSheetUI = ({
  children,
  headerTitle,
  closeFilter,
  showHeader,
  initialSnapPoints,
  bottomSheetModalRef,
  onDismiss,
}: BottomSheetUIProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  const renderBackdrop = useCallback(
    (props: any) => (
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
      onChange={_props => {}}
      snapPoints={initialSnapPoints}
      backgroundStyle={{ backgroundColor: colors.cardLight }}
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

export default BottomSheetUI;

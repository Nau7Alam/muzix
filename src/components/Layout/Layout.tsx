import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header/Header';
import { StyleSheet, ViewProps } from 'react-native';

type LayoutProps = {
  title?: string;
  children: ReactNode;
  goBack?: boolean;
  rightIcon?: string;
  rightOnClick?: () => void;
} & ViewProps;

const Layout = ({
  title,
  children,
  style: customStyle,
  goBack,
  rightIcon,
  rightOnClick,
  ...rest
}: LayoutProps) => {
  return (
    <SafeAreaView style={[styles.flex, customStyle]} {...rest}>
      <Header
        title={title}
        goBack={goBack}
        rightIcon={rightIcon}
        rightOnClick={rightOnClick}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, paddingBottom: 0 },
});

export default Layout;

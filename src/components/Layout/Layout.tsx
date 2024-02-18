import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header/Header';
import { StyleSheet, ViewProps } from 'react-native';

type LayoutProps = {
  title?: string;
  children: ReactNode;
} & ViewProps;

const Layout = ({
  title,
  children,
  style: customStyle,
  ...rest
}: LayoutProps) => {
  return (
    <SafeAreaView style={[styles.flex, customStyle]} {...rest}>
      <Header title={title} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, paddingBottom: 0 },
});

export default Layout;

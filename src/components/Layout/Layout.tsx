import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header/Header';
import { ViewProps } from 'react-native';

type LayoutProps = {
  title?: string;
  children: ReactNode;
} & ViewProps;

const Layout = ({ title, children, ...rest }: LayoutProps) => {
  return (
    <SafeAreaView {...rest}>
      <Header title={title} />
      {children}
    </SafeAreaView>
  );
};

export default Layout;

import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header/Header';
import { StyleSheet, ViewProps } from 'react-native';

type LayoutProps = {
  title?: string;
  children: ReactNode;
  titleNode?: ReactNode;
  goBack?: boolean;
  rightIcon?: string;
  searchabel?: boolean;
  rightOnClick?: () => void;
} & ViewProps;

const Layout = ({
  title,
  titleNode,
  children,
  style: customStyle,
  goBack,
  rightIcon,
  searchabel,
  rightOnClick,
  ...rest
}: LayoutProps) => {
  return (
    <SafeAreaView style={[styles.flex, customStyle]} {...rest}>
      <Header
        title={title}
        titleNode={titleNode}
        goBack={goBack}
        rightIcon={rightIcon}
        rightOnClick={rightOnClick}
        searchabel={searchabel}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, paddingBottom: 0 },
});

export default Layout;

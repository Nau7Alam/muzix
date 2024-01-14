import React from 'react';
import { Router } from './router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="pink" />
      <Router />
    </SafeAreaProvider>
  );
};

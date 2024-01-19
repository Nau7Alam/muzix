import React from 'react';
import { Router } from './router';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="pink" />
        <Router />
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

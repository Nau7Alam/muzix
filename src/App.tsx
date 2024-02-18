import React from 'react';
import { Router } from './router';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './helpers/toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar barStyle="dark-content" backgroundColor="pink" />
            <Router />
          </PersistGate>
        </Provider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

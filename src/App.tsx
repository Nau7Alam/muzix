import React, { useEffect } from 'react';
import { Router } from './router';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { loadLocalData } from './helpers/localMedia';
import { StyleSheet } from 'react-native';

export const App = () => {
  useEffect(() => {
    loadLocalData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

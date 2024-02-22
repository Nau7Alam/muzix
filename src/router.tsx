import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { LightThemes } from './theme/light';
import { DarkThemes } from './theme/dark';
import Player from './screens/Player/Player';
import { HomeBottomTab } from './navigators/BottomTab';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BootSplash from 'react-native-bootsplash';
import SearchSongs from './screens/SearchSongs/SearchSongs';
import { useSetup } from './hooks/setupHook';
import Loader from './components/Loader/Loader';

const Stack = createStackNavigator();

export const Router = () => {
  const styles = useMemo(() => createStyle(), []);
  const { isPlayerReady } = useSetup();
  const isLight = useColorScheme() === 'light';

  if (!isPlayerReady) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <SafeAreaView style={styles.container}>
        <NavigationContainer
          theme={isLight ? LightThemes : DarkThemes}
          onReady={() => {
            BootSplash.hide();
          }}
        >
          <BottomSheetModalProvider>
            <Stack.Navigator
              initialRouteName="HomeTabs"
              // initialRouteName="SearchSongs"
              screenOptions={{ headerShown: false, gestureEnabled: true }}
            >
              <Stack.Screen name="HomeTabs" component={HomeBottomTab} />
              <Stack.Screen name="Player" component={Player} />
              <Stack.Screen name="SearchSongs" component={SearchSongs} />
            </Stack.Navigator>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const createStyle = () => {
  return StyleSheet.create({
    container: { flex: 1 },
    loaderBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

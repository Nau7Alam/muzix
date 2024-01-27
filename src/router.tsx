import { NavigationContainer } from '@react-navigation/native';
import React, { useMemo } from 'react';
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
import Songs from './screens/Songs/Songs';
import { HomeBottomTab } from './navigators/BottomTab';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createStackNavigator();

export const Router = () => {
  const styles = useMemo(() => createStyle(), []);
  const isLight = useColorScheme() === 'light';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <SafeAreaView style={styles.container}>
        <NavigationContainer theme={isLight ? LightThemes : DarkThemes}>
          <BottomSheetModalProvider>
            <Stack.Navigator
              initialRouteName="HomeTabs"
              screenOptions={{ headerShown: false, gestureEnabled: true }}
            >
              <Stack.Screen name="HomeTabs" component={HomeBottomTab} />
              <Stack.Screen name="Player" component={Player} />
              <Stack.Screen name="Songs" component={Songs} />
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
  });
};

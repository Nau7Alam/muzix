import React from 'react';
import { Platform, View, Text } from 'react-native';

export const AppDetails = () => {
  return (
    <View>
      <Text>OS : {Platform.OS}</Text>
      <Text>Version : {Platform.Version}</Text>
      <Text>
        React Native Version : {Platform.constants.reactNativeVersion.major}
      </Text>
      <Text>isTV : {Platform.isTV ? 'Is TV' : 'Not TV'}</Text>
      <Text>
        isTesting : {Platform.isTesting ? 'Is Testing' : 'Not Testing'}
      </Text>
    </View>
  );
};

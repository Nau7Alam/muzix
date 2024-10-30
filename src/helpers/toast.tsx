/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Text from '../components/Text/Text';
import { View } from 'react-native';

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export const SuccessToast = (
  title: string,
  message: string,
  duration?: number
) => {
  return Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    visibilityTime: duration ?? 1300,
  });
};

export const WarningToast = (
  title: string,
  message: string,
  duration?: number
) => {
  return Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: duration ?? 1300,
  });
};

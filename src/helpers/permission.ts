import { Alert, PermissionsAndroid } from 'react-native';

export const getPermission = async () => {
  const readPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
  );
  if (readPermission === PermissionsAndroid.RESULTS.GRANTED) {
    return;
  } else {
    Alert.alert('Muzix', 'Muzix require Storage permission.', [
      { text: 'Ok', onPress: () => getPermission() },
    ]);
  }
};

export const checkPermission = async () => {
  const isGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
  );
  console.log('CHECK PERMISSION ', isGranted);
  return isGranted;
};

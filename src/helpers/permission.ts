import { Alert as RNAlert, PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

export const getPermission = async () => {
  try {
    const readPermission = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    if (
      readPermission[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED ||
      readPermission[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      Toast.show({
        type: 'success',
        text1: 'Muzix',
        text2: 'Permission Granted!',
        visibilityTime: 1000,
      });
      return true;
    } else {
      Toast.show({
        type: 'error',
        text1: 'Muzix',
        text2: 'Permission Not Granted! ' + readPermission,
        visibilityTime: 1000,
      });
      RNAlert.alert('Muzix', 'Muzix Requires Storage Permission.', [
        { text: 'Ok', onPress: () => getPermission() },
      ]);
      return false;
    }
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: 'Muzix',
      text2: 'ERROR occurred! ' + err,
      visibilityTime: 1000,
    });
    return false;
  }
};

export const checkPermission = async () => {
  let isGranted =
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
    )) ||
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ));
  if (!isGranted) {
    isGranted = await getPermission();
  }
  return isGranted;
};

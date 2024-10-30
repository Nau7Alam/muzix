import { Alert as RNAlert, PermissionsAndroid } from 'react-native';
import { SuccessToast, WarningToast } from './toast';

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
      SuccessToast('Muzix', 'Permission Granted!');
      return true;
    } else {
      WarningToast('Muzix', 'Permission Not Granted!' + readPermission);
      RNAlert.alert('Muzix', 'Muzix Requires Storage Permission.', [
        { text: 'Ok', onPress: () => getPermission() },
      ]);
      return false;
    }
  } catch (err) {
    WarningToast('Muzix', 'ERROR occurred! ' + err);
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

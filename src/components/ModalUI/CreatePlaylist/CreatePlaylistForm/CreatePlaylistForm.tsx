import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../../../theme/theme.interface';
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '../../../../hooks/stateHooks';
import { createPlaylist } from '../../../../reducers/playlistReducer';

const CreatePlaylistForm = ({ onSubmit, list }: any) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onPlaylistNameEnter = (name: string) => {
    console.log(name);
    setNewPlaylistName(name);
  };

  const onFormSubmit = () => {
    console.log('FORM SUBMITTED !!!');
    if (!list.includes(newPlaylistName)) {
      dispatch(createPlaylist(newPlaylistName));
      onPlaylistNameEnter('');
      onSubmit();
    } else {
      console.log('Playlist already present!');
      Toast.show({
        type: 'error',
        text1: 'Hello',
        text2: 'Playlist already present! 👋',
        visibilityTime: 10000,
      });
    }
  };

  return (
    <View style={styles.continer}>
      <Input
        type="primary"
        value={newPlaylistName}
        onChange={onPlaylistNameEnter}
      />
      <Button title="Create" type="primary" onClick={onFormSubmit} />
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { padding } = theme;
  return StyleSheet.create({
    continer: {
      gap: padding.lg,
    },
  });
};

export default CreatePlaylistForm;

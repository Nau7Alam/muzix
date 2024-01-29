import React, { useMemo } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../hooks/stateHooks';
import { allPlaylistSelector } from '../../reducers/playlistReducer';
import ListItem from '../../components/ListItem/ListItem';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { addS } from '../../helpers/utitlities';

const Playlists = ({ navigation }: any) => {
  const playlists = useAppSelector(allPlaylistSelector);
  const playlistNames = Object.keys(playlists);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onPlaylistClick = (playlist: any) => {
    navigation.navigate('PlaylistDetail', { playlist });
  };

  return (
    <Layout title="Playlists">
      {playlistNames.map(name => {
        return (
          <ListItem
            key={name}
            subTitle={addS(playlists[name].length, 'Song')}
            title={name}
            titleStyle={styles.playlistTitle}
            coverImageStyle={styles.playlistImage}
            onClick={() => onPlaylistClick(name)}
          />
        );
      })}
    </Layout>
  );
};

const createStyle = (theme: ITheme) => {
  const { borderRadius, fontSize, fontWeight } = theme;
  return StyleSheet.create({
    playlistTitle: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.regular,
    },
    playlistImage: {
      height: 60,
      width: 60,
      borderRadius: borderRadius.full,
    },
  });
};

export default Playlists;

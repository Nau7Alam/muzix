import React, { useCallback, useMemo, useRef, useState } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { FlatList, StyleSheet, View } from 'react-native';
import { IMusic } from '../../interfaces/player/music.interface';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import { useTrackSongs } from '../../hooks/trackHooks';
import {
  activeSongSelector,
  allSongSelector,
  setActiveSong,
} from '../../reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import Text from '../../components/Text/Text';
import { addAndPlayCurrentTrack } from '../../playerServices/trackFunctions';
import Layout from '../../components/Layout/Layout';
import BottomSheetUI from '../../components/BottomSheetUI/BottomSheetUI';
import ConversationFilter from '../../components/BottomSheetUI/ConversationFilter/ConversationFilter';
import { ASSIGNEE_TYPES } from '../../constants/musicList';

const Songs = ({ navigation }: any) => {
  const [selectedSong, setSelectedSong] = useState<null | IMusic>(null);
  const { isPlayerReady } = useTrackSongs();

  const dispatch = useAppDispatch();
  const songs = useAppSelector(allSongSelector);
  const activeSong = useAppSelector(activeSongSelector);
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const onSongSelect = (song: IMusic) => {
    setSelectedSong(song);
  };

  const onSongClick = (song: IMusic) => {
    if (selectedSong?.id !== song.id) {
      setSelectedSong(null);
    }
    addAndPlayCurrentTrack(song);
    dispatch(setActiveSong(song));
    navigation.navigate('Player');
  };
  const onSongOptionClick = (song: IMusic) => {
    console.log(song.title);
    setSelectedSong(song);
    toggleConversationAssigneeModal();
  };
  const onSongFavClick = (song: IMusic) => {
    console.log(song.title);
  };

  // Conversation filter modal
  const conversationFilterModalSnapPoints = useMemo(
    () => [theme.screen.height - 350, theme.screen.height - 350],
    [theme.screen.height]
  );

  // Filter by assignee type
  const conversationAssigneeModal = useRef<any>(null);

  const toggleConversationAssigneeModal = useCallback(() => {
    conversationAssigneeModal.current.present() ||
      conversationAssigneeModal.current?.dismiss();
  }, []);
  const closeConversationAssigneeModal = useCallback(() => {
    conversationAssigneeModal.current?.dismiss();
  }, []);

  const onSelectAssigneeType = async (item: any) => {
    closeConversationAssigneeModal();
    console.log('CLLLLLLOOSEE ', item);
  };

  if (!isPlayerReady) {
    return (
      <View>
        <Text xxxlg center>
          NOT READY
        </Text>
      </View>
    );
  }

  return (
    <Layout style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={songs}
        renderItem={({ item: song }: { item: IMusic }) => (
          <ListItem
            key={song.id}
            title={song.title}
            subTitle={song.artist}
            onClick={() => onSongClick(song)}
            onSelect={() => onSongSelect(song)}
            coverImage={song.cover}
            selected={activeSong?.id === song.id}
            onOptionClick={() => onSongOptionClick(song)}
            onSecondaryOptionClick={() => onSongFavClick(song)}
          />
        )}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps={'handled'}
      />
      <BottomSheetUI
        bottomSheetModalRef={conversationAssigneeModal}
        initialSnapPoints={conversationFilterModalSnapPoints}
        showHeader
        headerTitle={'Song options'}
        closeFilter={closeConversationAssigneeModal}
        children={
          <ConversationFilter
            activeValue={'unassigned'}
            items={ASSIGNEE_TYPES}
            onChangeFilter={onSelectAssigneeType}
            leftIcon={'check'}
            colors={theme.colors}
          />
        }
      />
    </Layout>
  );
};

const createStyle = ({ padding }: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      paddingBottom: padding.xxlg + 30,
    },
  });
};

export default Songs;

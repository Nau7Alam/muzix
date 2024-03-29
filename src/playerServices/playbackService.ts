/* eslint-disable @typescript-eslint/no-unused-vars */
import TrackPlayer, { Event } from 'react-native-track-player';
import { store } from '../store';
import { getIndexOfSong, randomNumber } from '../helpers/utitlities';
import { addAndPlayCurrentTrack } from './trackFunctions';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    //console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    //console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    //console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    //console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    //console.log('Event.RemoteJumpForward', event);
    TrackPlayer.seekBy(event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    //console.log('Event.RemoteJumpBackward', event);
    TrackPlayer.seekBy(-event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    //console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    //console.log('Event.RemoteDuck', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    console.log('Event.PlaybackQueueEnded ', event);
    const { activeSong, activeSongList, repeatMode, toShuffel } =
      store.getState().player;

    if (activeSongList && activeSong) {
      const activeSongIndex = getIndexOfSong(activeSongList, activeSong);
      if (activeSongIndex < activeSongList.length - 1) {
        addAndPlayCurrentTrack({
          track:
            activeSongList[
              repeatMode
                ? activeSongIndex
                : toShuffel
                ? randomNumber(0, activeSongList.length)
                : activeSongIndex + 1
            ],
          tracks: activeSongList,
        });
      }
    }
  });

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, event => {
    //console.log('Event.PlaybackActiveTrackChanged', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackPlayWhenReadyChanged, event => {
    //console.log('Event.PlaybackPlayWhenReadyChanged', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    //console.log('Event.PlaybackState', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, event => {
    //console.log('[Deprecated] Event.PlaybackMetadataReceived', event);
  });

  TrackPlayer.addEventListener(Event.MetadataChapterReceived, event => {
    //console.log('Event.MetadataChapterReceived', event);
  });

  TrackPlayer.addEventListener(Event.MetadataTimedReceived, event => {
    //console.log('Event.MetadataTimedReceived', event);
  });

  TrackPlayer.addEventListener(Event.MetadataCommonReceived, event => {
    //console.log('Event.MetadataCommonReceived', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
    //console.log('Event.PlaybackProgressUpdated', event);
  });

  TrackPlayer.addEventListener(
    Event.PlaybackMetadataReceived,
    async ({ title, artist }) => {
      const activeTrack = await TrackPlayer.getActiveTrack();
      TrackPlayer.updateNowPlayingMetadata({
        artist: [title, artist].filter(Boolean).join(' - '),
        title: activeTrack?.title,
        artwork: activeTrack?.artwork,
      });
    }
  );
}

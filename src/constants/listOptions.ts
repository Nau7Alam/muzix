export enum SONG_OPERATION {
  play = 'play',
  add_to_queue = 'add_to_queue',
  add_to_playlist = 'add_to_playlist',
  detail = 'detail',
  share = 'share',
  add_to_blacklist = 'add_to_blacklist',
  delete = 'delete',
}

export enum PLAY_MODES {
  song = 'songs',
  playlist = 'playlist',
  album = 'album',
}

export const SONG_OPTIONS = [
  {
    value: SONG_OPERATION.play,
    name: 'Play',
  },
  {
    value: SONG_OPERATION.add_to_queue,
    name: 'Add to Playing Queue',
  },
  {
    value: SONG_OPERATION.add_to_playlist,
    name: 'Add to Playlist',
  },
  {
    value: SONG_OPERATION.detail,
    name: 'Detail',
  },
  {
    value: SONG_OPERATION.share,
    name: 'Share',
  },
  {
    value: SONG_OPERATION.add_to_blacklist,
    name: 'Add to Blacklist',
  },
  {
    value: SONG_OPERATION.delete,
    name: 'Delete',
  },
];

export const ASSIGNEE_TYPES2 = [
  {
    value: 'fav',
    name: 'Favourite',
  },
  {
    value: 'mostHeard',
    name: 'Most Heard',
  },
  {
    value: 'recentHeard',
    name: 'Recently Heard',
  },
];

export enum SONG_OPERATION {
  play = 'play',
  add_to_queue = 'add_to_queue',
  add_to_playlist = 'add_to_playlist',
  detail = 'detail',
  share = 'share',
  add_to_blocklist = 'add_to_blocklist',
  delete = 'delete',
}

export enum PLAY_MODES {
  song = 'songs',
  playlist = 'playlist',
  album = 'album',
}

export enum ALERT_TYPE {
  success = 'success',
  info = 'info',
  error = 'error',
}

export enum PLAYLIST_OPERATIONS {
  play = 'play',
  add_to_queue = 'add to queue',
  delete = 'delete',
  rename = 'rename',
}

export const SONG_OPTIONS = [
  {
    value: SONG_OPERATION.play,
    name: 'Play',
  },
  {
    value: SONG_OPERATION.add_to_queue,
    name: 'Add to Queue',
  },
  {
    value: SONG_OPERATION.add_to_playlist,
    name: 'Add to Playlist',
  },
  {
    value: SONG_OPERATION.detail,
    name: 'Detail',
  },
  // {
  //   value: SONG_OPERATION.share,
  //   name: 'Share',
  // },
  {
    value: SONG_OPERATION.add_to_blocklist,
    name: 'Add to Blacklist',
  },
  {
    value: SONG_OPERATION.delete,
    name: 'Delete',
  },
];

export const PLAYLIST_OPTIONS = [
  {
    value: PLAYLIST_OPERATIONS.play,
    name: 'Play',
  },
  {
    value: PLAYLIST_OPERATIONS.add_to_queue,
    name: 'Add to queue',
  },
  {
    value: PLAYLIST_OPERATIONS.delete,
    name: 'Delete Playlist',
  },
  {
    value: PLAYLIST_OPERATIONS.rename,
    name: 'Rename Playlist',
  },
];

export enum IMAGE_TYPE {
  url = 'url',
  require = 'require',
}

export interface IMusic {
  id: string;
  title: string;
  artist: string;
  size?: string;
  url: string;
  album?: string;
  duration?: number;
  genre?: string;
  cover: string;
}

export interface IAlbum {
  id: string;
  url: string;
  album: string;
  artist: string;
  numberOfSongs: string;
  cover: string;
}

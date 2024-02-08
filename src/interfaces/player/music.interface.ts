export interface ISong {
  id: string;
  title: string;
  artist: string;
  size?: string;
  cover: string;
  url: string;
  album?: string;
  duration?: number;
  genre?: string;
  favourit: boolean;
}

export interface IAlbum {
  id: string;
  url: string;
  album: string;
  artist: string;
  numberOfSongs: string;
  cover: string;
}

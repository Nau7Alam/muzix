import { IAlbum, ISong } from '../interfaces/player/music.interface';

export const getIndexOfSong = (list: ISong[], song: ISong) => {
  return list.findIndex(item => item.id === song.id);
};

export function secondsToHms(d: number) {
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  //   var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  //   var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  //   var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  var hDisplay = h > 0 ? h + ':' : '';
  var mDisplay = m > 0 ? `${m < 10 ? '0' + m : m}` + ':' : '00:';
  var sDisplay = s > 0 ? `${s < 10 ? '0' + s : s}` : '00';
  return hDisplay + mDisplay + sDisplay;
}

export const addS = (count: any, text: string) => {
  return Number(count) > 1 ? `${count} ${text}s` : `${count} ${text}`;
};

export const randomNumber = (min: number, max: number) => {
  const value = Math.floor(Math.random() * (max - min) + min);
  return value >= max ? value - 1 : value;
};

export const sortAlbum = (list: IAlbum[]) => {
  return list.sort((a, b) => a.album.localeCompare(b.album));
};

export const sortSong = (list: ISong[]) => {
  return list.sort((a, b) => a.title.localeCompare(b.title));
};

export const songPresent = (song: ISong, list: ISong[]) => {
  return list.some(s => s.id === song.id);
};

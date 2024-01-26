import { IMusic } from '../interfaces/player/music.interface';

export const getIndexOfSong = (list: IMusic[], song: IMusic) => {
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

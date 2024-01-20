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
  var mDisplay = m > 0 ? m.toString() + ':' : '0:';
  var sDisplay = s > 0 ? s.toString() : '0';
  return hDisplay + mDisplay + sDisplay;
}

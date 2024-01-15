import { IMusic } from '../../interfaces/player/music.interface';
import { ITheme } from '../../theme/theme.interface';

export interface CarouselMusicItemProps {
  music: IMusic;
  styles: any;
  theme: ITheme;
}

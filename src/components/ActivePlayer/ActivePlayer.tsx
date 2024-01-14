import React, { Fragment, useMemo } from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { songs } from '../../constants/musicList';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { CarouselMusicItemProps } from './ActivePlayer.interface';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const SONG_IMAGE_SIZE = Math.round(ITEM_WIDTH * 0.8);

const CarouselMusicItem = ({ item }: CarouselMusicItemProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View style={styles.container} key={item.id}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: item.coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
    </View>
  );
};

const ActivePlayer = () => {
  const isCarousel = React.useRef(null);

  return (
    <Fragment>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={songs}
        renderItem={CarouselMusicItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={2}
        useScrollView={true}
      />
    </Fragment>
  );
};

export default ActivePlayer;

const createStyle = (theme: ITheme) => {
  const { colors, borderRadius, fontSize, fontWeight, padding } = theme;
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius.eight,
      width: ITEM_WIDTH,
      paddingBottom: padding.xxlg,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 0,
    },
    imageBox: {
      borderRadius: borderRadius.full,
      overflow: 'hidden',
      padding: padding.ten,
      margin: padding.ten,
      elevation: 6,
      alignSelf: 'center',
      backgroundColor: colors.card,
    },
    image: {
      width: SONG_IMAGE_SIZE,
      height: SONG_IMAGE_SIZE,
      borderRadius: borderRadius.full,
    },
    title: {
      color: colors.text,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.bold,
      paddingLeft: padding.xlg,
      paddingRight: padding.xlg,
      textAlign: 'center',
    },
    artist: {
      color: '#222',
      fontSize: fontSize.default,
      paddingLeft: padding.xlg,
      paddingRight: padding.xlg,
      textAlign: 'center',
    },
  });
};

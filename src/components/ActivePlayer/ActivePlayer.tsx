import React, { Fragment, useMemo } from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Image } from 'react-native';
import { songs } from '../../constants/musicList';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { CarouselMusicItemProps } from './ActivePlayer.interface';

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
  const { screen } = useTheme() as ITheme;
  const itemWidth = screen.width * 0.7;

  return (
    <Fragment>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={songs}
        renderItem={CarouselMusicItem}
        sliderWidth={screen.width}
        itemWidth={itemWidth}
        inactiveSlideShift={2}
        useScrollView={true}
      />
    </Fragment>
  );
};

export default ActivePlayer;

const createStyle = (theme: ITheme) => {
  const { colors, borderRadius, fontSize, fontWeight, padding, screen } = theme;
  const itemWidth = screen.width * 0.7;
  const coverImageWidth = screen.width * 0.8;

  return StyleSheet.create({
    container: {
      borderRadius: borderRadius.eight,
      width: itemWidth,
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
      width: coverImageWidth,
      height: coverImageWidth,
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

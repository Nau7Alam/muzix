import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Image } from 'react-native';
import { songs } from '../../constants/musicList';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { CarouselMusicItemProps } from './ActivePlayer.interface';

const CarouselMusicItem = ({ styles, music }: CarouselMusicItemProps) => {
  return (
    <View style={styles.itemContainer} key={music.id}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: music.coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>{music.title}</Text>
      <Text style={styles.artist}>{music.artist}</Text>
    </View>
  );
};

const ActivePlayer = () => {
  const isCarousel = React.useRef(null);
  const theme = useTheme() as ITheme;
  const screenWidth = theme.screen.width;
  const itemWidth = screenWidth * 0.65;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={songs}
        renderItem={({ item }) => (
          <CarouselMusicItem styles={styles} music={item} />
        )}
        sliderWidth={screenWidth}
        itemWidth={itemWidth}
        inactiveSlideShift={2}
        useScrollView={true}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default ActivePlayer;

const createStyle = (theme: ITheme) => {
  const {
    colors,
    borderRadius,
    fontSize,
    fontWeight,
    padding,
    margin,
    screen,
  } = theme;
  const itemWidth = screen.width * 0.65;
  const coverImageWidth = itemWidth * 0.82;

  return StyleSheet.create({
    itemContainer: {
      width: itemWidth,
      paddingBottom: padding.xxlg,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      padding: padding.four,
    },
    imageBox: {
      borderRadius: borderRadius.full,
      backgroundColor: colors.card,
      padding: padding.ten,
      overflow: 'hidden',
      alignSelf: 'center',
      elevation: 6,
      marginTop: margin.lg,
      marginBottom: margin.xxlg,
    },
    image: {
      width: coverImageWidth,
      height: coverImageWidth,
      borderRadius: borderRadius.full,
    },
    title: {
      color: colors.text,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semiBold,
      textAlign: 'center',
    },
    artist: {
      marginTop: margin.ten,
      color: colors.textLight,
      fontSize: fontSize.sm,
      textAlign: 'center',
    },
  });
};

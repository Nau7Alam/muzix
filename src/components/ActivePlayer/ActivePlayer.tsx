import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { IMusic } from '../../interfaces/player/music.interface';
import CarouselMusicItem from './CarouselMusicItem';

type ActivePlayerProps = {
  activeIndex: number;
  songs: IMusic[];
  onSlideChange: (n: number) => void;
};

const ActivePlayer = forwardRef(
  ({ activeIndex, songs, onSlideChange }: ActivePlayerProps, ref: any) => {
    const theme = useTheme() as ITheme;
    const screenWidth = theme.screen.width;
    const itemWidth = screenWidth * 0.65;
    const styles = useMemo(() => createStyle(theme), [theme]);

    return (
      <View style={styles.container}>
        <Carousel
          layout="default"
          ref={ref}
          data={songs}
          renderItem={({ item }) => (
            <CarouselMusicItem styles={styles} theme={theme} music={item} />
          )}
          getItemLayout={(_data, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
          initialNumToRender={0}
          firstItem={activeIndex}
          inactiveSlideShift={40}
          inactiveSlideOpacity={0.6}
          sliderWidth={screenWidth}
          itemWidth={itemWidth}
          useScrollView={true}
          hasParallaxImages={true}
          onSnapToItem={index => onSlideChange(index)}
        />
      </View>
    );
  }
);

export default ActivePlayer;

const createStyle = (theme: ITheme) => {
  const { colors, borderRadius, padding, margin, screen } = theme;
  const itemWidth = screen.width * 0.65;
  const coverImageWidth = itemWidth * 0.82;

  return StyleSheet.create({
    container: {
      flex: 6,
    },
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
    artist: {
      marginTop: margin.ten,
    },
  });
};

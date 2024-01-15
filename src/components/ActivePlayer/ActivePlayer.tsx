import React, { useMemo } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Image } from 'react-native';
import { songs } from '../../constants/musicList';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';
import { CarouselMusicItemProps } from './ActivePlayer.interface';
import Text from '../Text/Text';

const CarouselMusicItem = ({
  music,
  styles,
  theme,
}: CarouselMusicItemProps) => {
  return (
    <View style={styles.itemContainer} key={music.id}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: music.coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text lg center semiBold color={theme.colors.text}>
        {music.title}
      </Text>
      <Text sm center color={theme.colors.textLight} style={styles.artist}>
        {music.artist}
      </Text>
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
          <CarouselMusicItem styles={styles} theme={theme} music={item} />
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
  const { colors, borderRadius, padding, margin, screen } = theme;
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
    artist: {
      marginTop: margin.ten,
    },
  });
};

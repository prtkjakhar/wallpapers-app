import SkeletonLoader from '@/components/Skeleton';
import { SplitView } from '@/components/SplitView';
import { Wallpaper, useWallpapers } from '@/hooks/useWallpapers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

const TOPBAR_HEIGHT = 250;
const { width } = Dimensions.get('window');

interface CarouselRenderItemProps {
  index: number;
  item: Wallpaper;
}

export default function WallpaperHome() {
  const [searchTerm, setSearchTerm] = useState('mobile wallpapers');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const { wallpapers, isLoading, error } = useWallpapers(debouncedSearchTerm);
  const scrollY = useSharedValue(0);
  const theme = useColorScheme() ?? 'light';

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timer); // Cleanup timer on unmount or searchTerm change
  }, [searchTerm]);

  // Updated animated styles to properly handle scaling
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-TOPBAR_HEIGHT, 0, TOPBAR_HEIGHT],
      [1.5, 1, 0.8],
      'clamp'
    );

    // Calculate the adjusted height based on scroll position
    const height = Math.max(0, TOPBAR_HEIGHT - scrollY.value);

    return {
      height,
      transform: [{ scale }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [-TOPBAR_HEIGHT, TOPBAR_HEIGHT / 2, TOPBAR_HEIGHT],
      [1, 1, 0],
      'clamp'
    ),
  }));

  const renderCarouselItem = useCallback(
    ({ index, item }: CarouselRenderItemProps): any => {
      const imageUri = item?.src?.landscape;
      if (!imageUri) return null;

      return (
        <View style={styles.carouselItemContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.gradientOverlay}>
            <Animated.View style={textAnimatedStyle}>
              <Text style={styles.photographerText}>{item.photographer}</Text>
            </Animated.View>
          </LinearGradient>
        </View>
      );
    },
    [textAnimatedStyle]
  );

  const handleScroll = useCallback(
    (yOffset: number) => {
      scrollY.value = withSpring(yOffset, {
        damping: 15,
        stiffness: 90,
      });
    },
    [scrollY]
  );

  const renderSplitView = useMemo(() => (
    <SplitView wallpapers={wallpapers} onScroll={handleScroll} />
  ), [wallpapers]);

  if (isLoading) return <SkeletonLoader />;
  if (error)
    return (
      <Text style={styles.errorText}>
        Error fetching wallpapers: {error.message}
      </Text>
    );

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <Carousel<Wallpaper>
          loop
          width={width}
          height={TOPBAR_HEIGHT}
          autoPlay={true}
          data={wallpapers}
          scrollAnimationDuration={2000}
          renderItem={renderCarouselItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: Colors[theme].background,
          }}
        />
      </Animated.View>

      <TextInput
        style={[
          styles.searchBox,
          {
            backgroundColor: Colors[theme].background,
            color: Colors[theme].text,
            borderColor: Colors[theme].text,
          },
        ]}
        placeholder="Search wallpapers..."
        placeholderTextColor={Colors[theme].text}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <View style={styles.splitViewContainer}>
        {renderSplitView}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  headerContainer: {
    overflow: 'hidden',
  },
  carouselItemContainer: {
    flex: 1,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: TOPBAR_HEIGHT,
  },
  gradientOverlay: {
    position: 'absolute',
    zIndex: 10,
    height: TOPBAR_HEIGHT / 2,
    width: '100%',
    bottom: 0,
  },
  photographerText: {
    color: 'white',
    paddingTop: TOPBAR_HEIGHT / 3,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
  splitViewContainer: {
    borderRadius: 20,
    flex: 1
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

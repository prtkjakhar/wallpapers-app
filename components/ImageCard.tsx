import { Wallpaper } from '@/hooks/useWallpapers';
import { View, Image, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { truncate } from 'lodash';

export function ImageCard({
  wallpaper,
  onPress,
}: {
  wallpaper: Wallpaper;
  onPress: () => void;
}) {
  const theme = useColorScheme() ?? 'light';
  return (
    <Pressable onPress={onPress}>
      <View>
      <Image source={{ uri: wallpaper.src.portrait }} style={styles.image} />
      <View style={styles.labelContainer}>
        <ThemedText style={styles.label}>{truncate(wallpaper.photographer, { length: 20, omission: '...' })}</ThemedText>
        <View style={styles.iconContainer}>
          <Ionicons
            name={'heart'}
            size={18}
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
        </View>
      </View>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 220,
    borderRadius: 20,
  },
  labelContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  label: {
    color: 'white',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

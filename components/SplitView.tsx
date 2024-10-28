import { ThemedView } from '@/components/ThemedView';
import { ImageCard } from '@/components/ImageCard';
import { FlatList, StyleSheet, View } from 'react-native';
import { Wallpaper } from '@/hooks/useWallpapers';
import { useState } from 'react';
import DownloadPicture from './BottomSheet';

export function SplitView({
  wallpapers,
  onScroll,
}: {
  wallpapers: Wallpaper[];
  onScroll?: (yOffset: number) => void;
}) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(
    null
  );

  return (
    <>
      <FlatList
        onScroll={(e) => {
          const yOffset = e.nativeEvent.contentOffset.y;
          onScroll?.(yOffset);
        }}
        data={(() => {
          const validWallpapers = wallpapers.filter(
            (w) => w.src && w.src.portrait
          );
          const pairedWallpapers = [];
          for (let i = 0; i < validWallpapers.length; i += 2) {
            pairedWallpapers.push([validWallpapers[i], validWallpapers[i + 1]]);
          }
          return pairedWallpapers;
        })()}
        renderItem={({ item: [first, second] }) => (
          <ThemedView style={styles.container}>
            <ThemedView style={styles.innerContainer}>
              <View style={styles.imageContainer}>
                <ImageCard
                  onPress={() => setSelectedWallpaper(first)}
                  wallpaper={first}
                />
              </View>
            </ThemedView>
            <ThemedView style={styles.innerContainer}>
              {second && (
                <View style={styles.imageContainer}>
                  <ImageCard
                    onPress={() => setSelectedWallpaper(second)}
                    wallpaper={second}
                  />
                </View>
              )}
            </ThemedView>
          </ThemedView>
        )}
        keyExtractor={(item) => item[0].id}
      />
      {selectedWallpaper && (
          <DownloadPicture
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 4,
  },
  imageContainer: {
    paddingVertical: 10,
  },
});

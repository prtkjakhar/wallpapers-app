import React, { useCallback, useRef } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Button,
  useColorScheme,
  Pressable,
  View,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpapers';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export const DownloadPicture = ({
  onClose,
  wallpaper,
}: {
  onClose: () => void;
  wallpaper: Wallpaper;
}) => {
  const theme = useColorScheme() ?? 'light';
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  // renders
  return (
    <BottomSheet
      snapPoints={['95%']}
      enablePanDownToClose
      onClose={onClose}
      ref={bottomSheetRef}
      handleIndicatorStyle={{ height: 0 }}
      handleStyle={{ display: 'none' }}
      onChange={handleSheetChanges}>
      <BottomSheetView style={[styles.contentContainer, { flex: 1 }]}>
        <ThemedView style={{ flex: 1 }}>
          <Image
            style={styles.image}
            source={{
              uri: wallpaper.src.portrait,
            }}
          />
          <View style={styles.topBar}>
            <Ionicons
              onPress={onClose}
              name={'close'}
              size={24}
              color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
            />
            <View style={styles.topBarInner}>
              <Ionicons
                name={'heart'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
              />
              <Ionicons
                name={'share'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{ paddingLeft: 4 }}
              />
            </View>
          </View>
          <ThemedView style={styles.textContainer}>
            <ThemedText style={styles.text}>
              {wallpaper.photographer}
            </ThemedText>
          </ThemedView>
          <DownloadButton url={wallpaper.src.portrait} />
        </ThemedView>
      </BottomSheetView>
    </BottomSheet>
  );
};

function DownloadButton({ url }: { url: string }) {
  const theme = useColorScheme() ?? 'light';
  // console.log(url);
  return (
    <Pressable
      onPress={async () => {
        let date = new Date().getTime();
        let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
        try {
          await FileSystem.downloadAsync(url, fileUri);
          const response = await MediaLibrary.requestPermissionsAsync(true);
          if (response.granted) {
            MediaLibrary.createAssetAsync(fileUri);
            alert('Image saved');
          } else {
            console.error('permission not granted');
          }
        } catch (err) {
          console.log('FS Err: ', err);
        }
      }}
      style={{
        backgroundColor:
          theme === 'light' ? Colors.light.background : Colors.dark.background,
        padding: 10,
        marginHorizontal: 40,
        marginVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme === 'light' ? Colors.light.text : Colors.dark.icon,
      }}>
      <Ionicons
        name={'download'}
        size={24}
        color={theme === 'light' ? Colors.light.text : Colors.dark.icon}
        style={{ paddingRight: 4 }}
      />
      <Text
        style={{
          fontSize: 20,
          color: theme === 'light' ? Colors.light.text : Colors.dark.text,
          fontWeight: '600',
        }}>
        Download
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: '100%',
  },
  image: {
    height: '70%',
    borderRadius: 15,
  },
  topBar: {
    position: 'absolute',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  topBarInner: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 20,
  },
});

export default DownloadPicture;

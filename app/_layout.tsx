import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
      <SafeAreaView style={styles.container}>
          <GestureHandlerRootView style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
          </Stack>
          <Toast />
          </GestureHandlerRootView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
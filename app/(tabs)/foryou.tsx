import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SplitView } from '@/components/SplitView';
import { useWallpapers } from '@/hooks/useWallpapers';
import SkeletonLoader from '@/components/Skeleton';
import { Colors } from '@/constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function () {
  const theme = useColorScheme() ?? 'light';
  return (
    <Tab.Navigator
      style={{flex: 1}}
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[theme].indicator
        }
      }}>
      <Tab.Screen name="Library" component={SettingsScreen} />
      <Tab.Screen name="Liked" component={SettingsScreen} />
      <Tab.Screen name="Suggested" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function SettingsScreen() {
  const { wallpapers, isLoading, error } = useWallpapers();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <Text>Error fetching wallpapers: {error.message}</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <SplitView wallpapers={wallpapers} />
    </View>
  );
}

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import {
  Appearance,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function () {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header />
      <ThemedView style={{ flex: 1 }}>
        <LoginButtons />
        <ThemeSelector />
        <About />
      </ThemedView>
    </ThemedView>
  );
}

function About() {
  return (
    <ThemedView style={styles.margin}>
      <ThemedText style={styles.textBig}>About</ThemedText>
      <ThemedView style={{ marginTop: 10 }}>
        <Pressable>
          <ThemedText style={{ margin: 10, fontSize: 18 }}>Account</ThemedText>
        </Pressable>
        <Pressable>
          <ThemedText style={{ margin: 10, fontSize: 18 }}>
            Privacy Policy
          </ThemedText>
        </Pressable>
        <Pressable>
          <ThemedText style={{ margin: 10, fontSize: 18 }}>
            Terms of Service
          </ThemedText>
        </Pressable>
        <Pressable>
          <ThemedText style={{ margin: 10, fontSize: 18 }}>Licenses</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

function ThemeSelector() {
  return (
    <ThemedView style={styles.margin}>
      <ThemedText style={styles.textBig}>Settings</ThemedText>
      <ThemedText>Theme</ThemedText>
      <ThemedView style={styles.themeSelectorContainer}>
        <ThemeButton title="Dark" selected={false} colorScheme="dark" />
        <ThemeButton title="Light" selected={false} colorScheme="light" />
        <ThemeButton title="System" selected={false} colorScheme={null} />
      </ThemedView>
    </ThemedView>
  );
}

function ThemeButton({
  title,
  selected,
  colorScheme,
}: {
  title: string;
  selected: boolean;
  colorScheme: 'light' | 'dark' | null;
}) {
  const theme = useColorScheme() ?? 'light';
  return (
    <Pressable
      style={{
        padding: 10,
        borderColor: theme === 'light' ? Colors.light.text : Colors.dark.icon,
        borderWidth: 1,
        borderRadius: 5,
        flex: 0.3,
      }}
      onPress={() => {
        Appearance.setColorScheme(colorScheme);
      }}>
      <ThemedText style={{ textAlign: 'center', width: '100%' }}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

function Header() {
  return (
    <View style={styles.topBar}>
      <ThemedText style={styles.textBig}>Panels</ThemedText>
      <ThemedText>Sign in to save your data</ThemedText>
    </View>
  );
}

function LoginButtons() {
  const theme = useColorScheme() ?? 'light';
  return (
    <>
      <AuthButton
        label="Sign In"
        icon={
          <Ionicons
            name={'logo-google'}
            size={24}
            color={theme === 'light' ? Colors.light.text : Colors.dark.icon}
          />
        }
      />
      <AuthButton
        label="Sign In"
        icon={
          <Ionicons
            name={'logo-apple'}
            size={24}
            color={theme === 'light' ? Colors.light.text : Colors.dark.icon}
          />
        }
      />
    </>
  );
}

function AuthButton({ icon, label }: { icon: any; label: string }) {
  const theme = useColorScheme() ?? 'light';
  return (
    <Pressable
      onPress={() => {
        Toast.show({
          type: 'info',
          text1: 'Coming Soon! ⏳'
        })
      }}
      style={{
        backgroundColor:
          theme === 'light' ? Colors.light.background : Colors.dark.background,
        padding: 10,
        marginHorizontal: 40,
        marginVertical: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme === 'light' ? Colors.light.text : Colors.dark.icon,
      }}>
      {icon}
      <Text
        style={{
          fontSize: 20,
          color: theme === 'light' ? Colors.light.text : Colors.dark.text,
          fontWeight: '600',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topBar: {
    padding: 20,
  },
  textBig: {
    fontSize: 25,
    fontWeight: 600,
  },
  themeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  margin: {
    padding: 20,
  },
});

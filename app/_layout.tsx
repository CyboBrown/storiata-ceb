import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SessionProvider } from "../src/contexts/AuthContext";
import { TamaguiProvider, Theme } from "tamagui";
import { useColorScheme } from "react-native";
import config from "../tamagui.config";

export default function Root() {
  const colorScheme = useColorScheme();
  return (
    <SessionProvider>
      <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "light" : "light"}>
        <StatusBar backgroundColor="dodgerblue" />
        <Slot />
      </Theme>
      </TamaguiProvider>
    </SessionProvider>
  );
}
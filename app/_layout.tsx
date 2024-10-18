import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { SessionProvider } from "../src/contexts/AuthContext";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";

export default function Root() {
  const colorScheme = useColorScheme();
  return (
    <SessionProvider>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === "dark" ? "light" : "light"}>
          <Slot />
        </Theme>
      </TamaguiProvider>
    </SessionProvider>
  );
}

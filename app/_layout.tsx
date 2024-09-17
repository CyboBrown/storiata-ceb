import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { SessionProvider } from "../src/services/auth-context";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <Slot />
        </Theme>
      </TamaguiProvider>
    </SessionProvider>
  );
}

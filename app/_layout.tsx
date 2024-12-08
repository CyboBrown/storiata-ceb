import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SessionProvider } from "../src/contexts/AuthContext";

export default function Root() {
  return (
    <SessionProvider>
      <StatusBar backgroundColor="dodgerblue" />
      <Slot />
    </SessionProvider>
  );
}
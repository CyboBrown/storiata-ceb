import { Text, SafeAreaView } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../src/services/auth-context";
import { StatusBar } from "expo-status-bar";

import Main from "./main";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="dodgerblue" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: 'dodgerblue' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="main" options={{ title: 'App Home' }} />
      </Stack>
    </SafeAreaView>
  );
}

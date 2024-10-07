import { Text, SafeAreaView } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../src/services/auth-context";
import { StatusBar } from "expo-status-bar";

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
          headerShown: true,
          headerStyle: {backgroundColor: 'dodgerblue'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'}
        }}
      >
      </Stack>
  </SafeAreaView>
  );
}

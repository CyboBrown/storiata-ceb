import { Text, SafeAreaView } from "react-native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSession } from "../../src/contexts/AuthContext";
import { ContributorContextProvider } from "../../src/contexts/ContributorContext";

export default function AppLayout() {
  const { getUserUUID, session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <ContributorContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="dodgerblue" />
          <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaView>
    </ContributorContextProvider>
  );
}

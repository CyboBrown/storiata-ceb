import { Text, Image, SafeAreaView, View, ActivityIndicator, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSession } from "../../src/contexts/AuthContext";
import { ContributorContextProvider } from "../../src/contexts/ContributorContext";
import LoadingAnim from "../../src/assets/walking.gif";

export default function AppLayout() {
  const { getUserUUID, session, isLoading } = useSession();

  if (isLoading) {
    return (
    <>
      <View style={styles.defaultContainer}>
        <Image
            source={LoadingAnim} 
            style={{ width: 100, height: 100 }}
          />
        <Text style={styles.loadingText}>Please wait a moment while{"\n"} we prepare things around here...</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
      </>
    );
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

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "dodgerblue",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    textAlign: "center",
    marginBottom: 25,
  },
});
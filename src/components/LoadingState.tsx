import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import LoadingAnim from "../assets/walking.gif";

interface ComponentProps {
  isLightMode: boolean;
}

export default function LoadingState({isLightMode}: ComponentProps) {
  return (
    <>
    <View style={styles.defaultContainer}>
      <Image
        source={LoadingAnim} 
        style={{ width: 100, height: 100 }}
      />

      {isLightMode ? (
        <>
          <Text style={styles.loadingTextDark}>Please wait a moment while{"\n"} we prepare things around here...</Text>
          <ActivityIndicator size="large" color="dodgerblue" />
        </>
      ) : 
        <>
          <Text style={styles.loadingTextLight}>Please wait a moment while{"\n"} we prepare things around here...</Text>
          <ActivityIndicator size="large" color="white" />
        </>
      }
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "dodgerblue",
    justifyContent: "center",
  },
  loadingTextLight: {
    fontSize: 18,
    color: 'white',
    textAlign: "center",
    marginBottom: 25,
  },
  loadingTextDark: {
    fontSize: 18,
    color: 'gray',
    textAlign: "center",
    marginBottom: 25,
  }
});
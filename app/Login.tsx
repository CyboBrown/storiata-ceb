import React from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { Button, Input, SizableText, TamaguiProvider, Text } from "tamagui";
import { userAuthentication } from "../src/viewmodels/UserAuthentication";
import config from "../tamagui.config";

export default function Login() {
  const { email, setEmail, password, setPassword, loading, signInWithEmail } =
    userAuthentication();

  return (
    <TamaguiProvider config={config}>
      <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <SizableText fontFamily="$body" color="black">
          {" "}
          Email{" "}
        </SizableText>
        <Input
          size="$4"
          placeholder="email@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
        <SizableText fontFamily="$body" color="black">
          {" "}
          Password{" "}
        </SizableText>
        <Input
          size="$4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button size="$4" disabled={loading} onPress={signInWithEmail}>
          Sign in
        </Button>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text color="black">Don't have an account? <Link href="/signup"> Sign Up </Link></Text> 
      </View>
    </View>
    </TamaguiProvider>    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

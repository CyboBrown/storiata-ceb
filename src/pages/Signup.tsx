import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { Button, Image, Input, SizableText} from "tamagui";
import { supabase } from "../utils/supabase";


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <SizableText fontFamily="$body" color="black"> Email </SizableText>
        <Input size="$4" placeholder="email@gmail.com" onChangeText={(text) => setEmail(text)}/>
      </View>
      <View style={[styles.verticallySpaced]}>
        <SizableText fontFamily="$body" color="black"> Password </SizableText>
        <Input size="$4" placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
      </View>
    
      <View style={[styles.verticallySpaced]}>
        <Button size="$4" disabled={loading} onPress={() => signUpWithEmail()}>Sign up</Button>
      </View>
    
    </View>
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

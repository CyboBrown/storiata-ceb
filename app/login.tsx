import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { Button, Input, SizableText, TamaguiProvider, Text } from "tamagui";
import { UserAuthentication } from "../src/services/UserAuthentication";
import config from "../tamagui.config";
import { Session, User } from "@supabase/supabase-js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  const signin = async () => {
    setLoading(true);
    const data = await UserAuthentication.signInWithEmail(email, password);
    if (data?.user) setUser(data.user);
    setLoading(false);
    console.log(user);
    if (data?.user?.id) {
      setSession(data.session);
      setUser(data.user);
      setUserID(data.user.id);
    }
    const isContrib: any = await UserAuthentication.getUserType(userID);
    setIsContributor(isContrib == true);
    if (user) {
      const path = isContributor ? "/contributor" : "/";
      console.log(path);
      router.push(path);
    }
  };

  if (user) {
    const path = isContributor ? "/contributor" : "/";
    router.push(path);
  }

  return (
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
        <Button size="$4" disabled={loading} onPress={signin}>
          Sign in
        </Button>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text color="black">
          Don't have an account? <Link href="/signup"> Sign Up </Link>
        </Text>
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

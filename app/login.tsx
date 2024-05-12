import React, { useEffect, useState } from "react";
import { Link, Redirect, router } from "expo-router";
import { Button, Image, Input, SizableText, TamaguiProvider, Text, View, XStack} from "tamagui";
import { UserAuthentication } from "../src/services/UserAuthentication";
import config from "../tamagui.config";
import { Session, User } from "@supabase/supabase-js";
import logo from '../src/assets/logo.svg'

export default function Login({
  setContrib,
}: {
  setContrib: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isContributor, setIsContributor] = useState(false);
  // const [userID, setUserID] = useState("");
  // const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("LOGIN page loaded.");
  }, []);

  const signin = async () => {
    setLoading(true);
    const data = await UserAuthentication.signInWithEmail(email, password);
    if (data?.user?.id) {
      const isContrib: boolean = await UserAuthentication.getUserType(
        data.user.id
      );
      console.log(isContrib);
      setContrib(isContrib);
      setSession(data.session);
    }
    setLoading(false);
  };

  return (
    <View flex={1} padding="$4" marginTop="$10" >
      <View justifyContent="center" alignItems="center">
        <Image source={logo} width="$15" height="$15" />
      </View>
      <View justifyContent="center" alignItems="center">
        <Text color="$background" fontSize={30} fontFamily={"$heading"}> Welcome to StoriaTa</Text>
      </View>
      <View gap="$4" marginTop="$5">
        <Text fontFamily="$body" color="$background">
          Email
        </Text>
        <Input
          size="$4"
          placeholder="email@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}/>
      </View>
      <View gap="$4" marginTop="$3">
        <Text fontFamily="$body" color="$background">
          Password
        </Text>
        <Input
          size="$4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}/>
      </View>
      <View marginTop="$5" gap="$4" >
        <Button size="$4" disabled={loading} onPress={signin}>
          Sign in
        </Button>
      </View>
      <View
        marginTop="$5"
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        <Text color="$background" fontSize={16}>Don't have an account?  </Text>
        <Text fontSize={16}>
          <Link href="/signup" >
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}



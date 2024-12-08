import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  SizableText,
  TamaguiProvider,
  Text,
  XStack,
  View,
  Image,
  ScrollView,
  Theme,
} from "tamagui";
import { UserAuthentication } from "../src/services/UserAuthentication";
import config from "../tamagui.config";
import { Session, User } from "@supabase/supabase-js";
import logo from "../src/assets/StoriaTa-Logo.png";

import { useColorScheme } from "react-native";
import { Check } from "@tamagui/lucide-icons";
import { Link, router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("SIGNUP page loaded.");
  }, []);

  const colorScheme = useColorScheme();

  const signup = async () => {
    setLoading(true);
    const result = UserAuthentication.checkPassword(password, confirmPassword);
    result ? "" : alert("Password not correct");
    const data: any = await UserAuthentication.signUpWithEmail(email, password);
    if (data?.user?.id && isContributor) {
      UserAuthentication.requestContributor(data.user.id);
    }
    setLoading(false);
    router.push("/");
  };

  const handleContributorChange = () => {
    setIsContributor(!isContributor);
  };

  return (
    // <TamaguiProvider config={config}>
    //   <Theme name={colorScheme === "dark" ? "dark" : "light"}>
    <ScrollView backgroundColor={"$background"}>
      <View flex={1} padding="$4" marginTop="$10">
        <View justifyContent="center" alignItems="center">
          <Image source={logo} width="$15" height="$15" borderRadius={"$10"} />
        </View>
        <View justifyContent="center" alignItems="center">
          <Text color={"$color"} fontFamily={"$heading"} fontSize={30}>
            {" "}
            Create your Account{" "}
          </Text>
        </View>
        <View
          justifyContent="center"
          alignContent="center"
          gap={2}
          marginTop={15}
        >
          <Text fontFamily="$body" color="$color">
            {" "}
            Email
          </Text>
          <Input
            size="$4"
            placeholder="name@email.com"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View marginTop={10} gap={2}>
          <SizableText fontFamily="$body" color="$color">
            {" "}
            Password
          </SizableText>
          <Input
            size="$4"
            placeholder="Enter 8 characters or more"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View marginTop={10} gap={2}>
          <SizableText fontFamily="$body" color="$color">
            {" "}
            Confirm Password
          </SizableText>
          <Input
            size="$4"
            placeholder="Enter password again"
            autoCapitalize="none"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View
          marginTop="$5"
          flexDirection="row"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <XStack
            width={300}
            alignItems="center"
            justifyContent="center"
            gap={20}
          >
            <Checkbox
              size="$5"
              checked={isContributor}
              onPress={() => handleContributorChange()}
            >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
            <Text color="$color" fontFamily={"$body"}>
              Register as a Contributor?
            </Text>
          </XStack>
        </View>
        <View marginTop={15}>
          <Button size="$4" disabled={loading} onPress={signup}>
            Sign up
          </Button>
        </View>
        <View
          marginTop={20}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="$color" fontFamily={"$body"}>
            Already have an account?{" "}
          </Text>
          <Link href="/">
            <Text
              color="$color"
              fontFamily={"$body"}
              fontSize={16}
              fontWeight="bold"
            >
              Sign In
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
    //   </Theme>
    // </TamaguiProvider>
  );
}

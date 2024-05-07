import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Input,
  Label,
  SizableText,
  SizeTokens,
  TamaguiProvider,
  Text,
  Theme,
  XStack,
  View,
} from "tamagui";
import { UserAuthentication } from "../src/services/UserAuthentication";
import { Check } from "@tamagui/lucide-icons";
import config from "../tamagui.config";
import { Link, router } from "expo-router";
import CheckBoxIcon from "react-native-elements/dist/checkbox/CheckBoxIcon";
import { Session, User } from "@supabase/supabase-js";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  const signup = async () => {
    setLoading(true);
    const data: any = await UserAuthentication.signUpWithEmail(email, password);
    if (data?.user?.id && isContributor) {
      UserAuthentication.requestContributor(data.user.id);
    }
    setLoading(false);
    router.push("/login");
  };

  const confirmPass = () => {

  }

  const handleContributorChange = () => {
    setIsContributor(!isContributor);
  };

  return (
    <TamaguiProvider config={config}>
      <View>
      <View justifyContent="center" alignContent="center" gap={2}>
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
      <View>
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
      <View>
        <SizableText fontFamily="$body" color="black">
          {" "}
          Confirm Password{" "}
        </SizableText>
        <Input
          size="$4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <View>
        <XStack width={300} alignItems="center">
          <Checkbox
            size="$4"
            checked={isContributor}
            onPress={() => handleContributorChange()}
          >
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>
          <Text color="black">Register as a Contributor?</Text>
        </XStack>
      </View>
      <View>
        <Button size="$4" disabled={loading} onPress={signup}>
          Sign up
        </Button>
      </View>
      <View>
        <Text color="black">
          {" "}
          Already have an account? <Link href="/"> Sign In </Link>
        </Text>
      </View>
    </View>
    </TamaguiProvider>
  );
}

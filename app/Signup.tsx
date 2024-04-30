import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Button, Checkbox, CheckboxProps, Input, Label, SizableText,  SizeTokens,  TamaguiProvider, Text, Theme, XStack } from "tamagui";
import { userAuthentication } from "../src/viewmodels/UserAuthentication";
import { Check } from '@tamagui/lucide-icons'
import config from "../tamagui.config";
import { Link } from "expo-router";
import CheckBoxIcon from "react-native-elements/dist/checkbox/CheckBoxIcon";

export default function SignUp() {
  const { email, setEmail, password, setPassword, loading, signUpWithEmail, isContributor, setIsContributor} =
    userAuthentication();
  const handleContributorChange = () => {
    setIsContributor(!isContributor);
  };
  
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
      <View style={[styles.verticallySpaced]}>
        <XStack width={300} alignItems="center">
          <Checkbox size="$4" onPress={() => handleContributorChange()}>
            <Checkbox.Indicator>
              <Check/>
            </Checkbox.Indicator>
          </Checkbox>
          <Text color='black'>Register as a Contributor?</Text>
        </XStack>
        
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button size="$4" disabled={loading} onPress={signUpWithEmail}>
          Sign up
        </Button>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text color="black"> Already have an account? <Link href="/login"> Sign In </Link></Text> 
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
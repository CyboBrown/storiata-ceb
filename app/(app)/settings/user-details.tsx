import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomHeader from "../../../src/components/HeaderTitle";
import LabeledTextInput from "../../../src/components/LabelledTextInput";
import Avatar from "../../../src/components/AvatarUpload";
import BackgroundCircle from "../../../src/components/BackgroundCircle";

export default function UserDetails() {
  const { currAvatarURL, currFullname, currUsername, currEmail, currWebsite } = useLocalSearchParams();
  const [avatarURL, setAvatarURL] = useState(currAvatarURL);
  const [fullname, setFullname] = useState(currFullname);
  const [username, setUsername] = useState(currUsername);
  const [website, setWebsite] = useState(currWebsite);

  const router = useRouter();
  const handleSave = () => {
    // Implement save logic here
    router.back(); // Redirect back to the account page after saving
  };

  return (
    <>
      <BackgroundCircle size={500} color="dodgerblue" top={-230} left ={-150} />
      <BackgroundCircle size={500} color="dodgerblue" top={550} left ={130} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Avatar
              url={avatarURL}
              onUpload={(url: string) => {
                setAvatarURL(url);
              }}
            />
            <View style={{marginTop: 12, marginBottom: 12, alignItems: "center", justifyContent: "center"}}>
              <Text style={{fontSize: 24, fontWeight: "900"}}>{fullname}</Text>
              <Text style={{fontSize: 15, fontWeight: "500"}}>@{username}</Text>
            </View>
            <LabeledTextInput
              title="FULL NAME"
              iconName="account"
              value={fullname}
              onChangeText={setFullname}
              placeholder="Cebuano Enthusiast"
              enabled={true}
            />
            <LabeledTextInput
              title="EMAIL ADDRESS"
              iconName="email"
              value={currEmail}
              onChangeText={setFullname}
              placeholder="cebuano.enthusiast@example.com"
              enabled={false}
            />
            <Text style={{fontSize: 12, marginTop: -10, color: "gray"}}>Changing email addresses is currently suspended until a sustainable provider can be found.</Text>
            <LabeledTextInput
              title="USERNAME"
              iconName="at"
              value={username}
              onChangeText={setUsername}
              placeholder="cebuanoenthusiast"
              enabled={true}
            />
            <LabeledTextInput
              title="WEBSITE"
              iconName="web"
              value={website}
              onChangeText={setWebsite}
              placeholder="Website"
              enabled={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  content: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
  },
  userInfo: {
    marginTop: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  fullName: {
    fontSize: 24,
    fontWeight: "900",
  },
  username: {
    fontSize: 15,
    fontWeight: "500",
  },
  note: {
    fontSize: 12,
    marginTop: -10,
    color: "gray",
  },
});
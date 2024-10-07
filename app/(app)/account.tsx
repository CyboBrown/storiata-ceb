import { useState, useEffect } from "react";
import { supabase } from "../../src/utils/supabase";
import { Alert } from "react-native";
import { Button, Input, Text, View } from "tamagui";
import { Session } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { router } from "expo-router";
import { UserAuthentication } from "../../src/services/UserAuthentication";
import { AccountService } from "../../src/services/AccountService";
import { Profile } from "../../src/models/Profile";
import { useSession } from "../../src/services/auth-context";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { session } = useSession();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("ACCOUNT page loaded.");
  }, []);

  useEffect(() => {
    if (session) showProfile();
  }, [session]);

  async function showProfile() {
    try {
      setLoading(true);
      if (!session) throw new Error("No user on the session!");

      let data = await AccountService.getProfile(session);

      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
      if (data?.username) {
        setUsername(data.username);
      }
      if (data?.website) {
        setWebsite(data.website);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function editProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");
      const updates: Profile = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };
      await AccountService.updateProfile(updates);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View flex={1} padding="$4" marginTop="$10">
      <View alignItems="center" marginBottom="$5">
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            editProfile({ username, website, avatar_url: url });
          }}
        />
      </View>
      <View>
        <Text
          color={"$black"}
          fontFamily={"$heading"}
          fontSize={20}
          marginTop="$2"
        >
          {" "}
          User Details
        </Text>
      </View>
      <View marginTop="$3">
        <Input placeholder="Email" value={session?.user?.email} disabled />
      </View>
      <View marginTop="$3">
        <Input
          placeholder="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View marginTop="$3">
        <Input
          placeholder="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>
      <View marginTop="$5">
        <Button
          onPress={() =>
            editProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          Update
        </Button>
      </View>
      <View marginTop="$3">
        <Button onPress={async () => await UserAuthentication.signOut()}>
          Sign Out
        </Button>
      </View>
      <View marginTop="$3">
        <Button onPress={() => router.push("/settings")}>App Settings</Button>
      </View>
    </View>
  );
}

import { useState, useEffect } from "react";
import { supabase } from "../src/utils/supabase";
import { Alert } from "react-native";
import { Button, Input, SizableText, Text, View} from "tamagui";
import { Session } from "@supabase/supabase-js";
import Avatar from "./avatar";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("ACCOUNT page loaded.");
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

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

  async function updateProfile({
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

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
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
            updateProfile({ username, website, avatar_url: url });
          }}/>
      </View>
      <View>
        <Text color={"$background"} fontFamily={"$heading"} fontSize={20}> User Details</Text>
      </View>
      <View>
        <Input
          placeholder="Email"
          value={session?.user?.email}
          disabled/>
      </View>
      <View>
        <Input
          placeholder="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}/>
      </View>
      <View>
        <Input
          placeholder="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}/>
      </View>
      <View
        marginTop="$5"
        space="$4"
      >
        <Button
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          Update
        </Button>
      </View>
      <View
        space="$4"
      >
        <Button
          onPress={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}


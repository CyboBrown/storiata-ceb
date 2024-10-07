import { useEffect, useState } from "react";
import { Image } from "react-native";
import { supabase } from "../utils/supabase";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  userID: string;
  size: number;
}

export default function NavAvatarIcon({ userID, size }: Props) {
  const [avatarKey, setAvatarKey] = useState("");
  const [avatarURL, setAvatarUrl] = useState("");
  const [foundAvatar, setFoundAvatar] = useState(false);

  useEffect(() => {
    getUserAvatarKey();
  }, [userID]);

  useEffect(() => {
    if (avatarKey) {
      getAvatarURL();
    }
  }, [avatarKey]);

  async function getUserAvatarKey() {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", userID)
      .single();
    if (error && status !== 406) {
      throw error;
    }

    if (data?.avatar_url) {
      setAvatarKey(data.avatar_url);
    }
  }

  async function getAvatarURL() {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(avatarKey);

      if (error) throw error;

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
        setFoundAvatar(true);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  return foundAvatar ? (
    <Image
      source={{ uri: avatarURL }}
      style={{ height: size, width: size, borderRadius: 15 }}
    />
  ) : (
    <Icon name="person-circle" size={size} color="gray" />
  );
}

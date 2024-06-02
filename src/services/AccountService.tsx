import { Preference } from "../models/Preference";
import { Profile } from "../models/Profile";
import { supabase } from "../utils/supabase";

export class AccountService {
  public static getProfile = async (userID: String) => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", userID)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    return data;
  };

  public static updateProfile = async (profile: Profile) => {
    const { error } = await supabase.from("profiles").upsert(profile);
    if (error) {
      throw error;
    }
  };

  // ***
  public static getPreferences = async (userID: String) => {
    const { data, error, status } = await supabase
      .from("preferences")
      .select(`*`)
      .eq("id", userID)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    return data;
  };

  // ***
  public static updatePreferences = async (preferences: Preference) => {
    const { error } = await supabase.from("preferences").upsert(preferences);
    if (error) {
      throw error;
    }
  };
}

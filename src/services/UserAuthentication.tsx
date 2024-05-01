import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import Main from "../../app/main";

export class UserAuthentication {
  public static signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    console.log(data);
    return data;
  };

  public static signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!data?.user)
      Alert.alert("Please check your inbox for email verification!");
  };

  public static getUserType = async (user_id: string) => {
    console.log(user_id);
    const { data, error } = await supabase
      .from("user_details")
      .select("*")
      .eq("user_id", user_id);
    console.log(error, data);
    if (data) {
      return data[0].user_type;
    }
  };

  // const signOut = async () => {
  //   setUser(undefined);
  //   setSession(undefined);
  //   setIsContributor(false);
  // };

  public static insertUser = async (
    user_id: string,
    isContributor: boolean
  ) => {
    const { data, error } = await supabase
      .from("user_details")
      .insert([{ user_id, user_type: isContributor ? "contributor" : "user" }])
      .select();
    console.log(error, data);
  };
}

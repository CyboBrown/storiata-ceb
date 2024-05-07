import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import Main from "../../app/main";

export class UserAuthentication {
  public static getUserType = async (user_id: string) => {
    console.log(user_id);
    const { data, error } = await supabase
      .from("profiles")
      .select("is_contributor")
      .eq("id", user_id)
      .single();
    console.log(error, data);
    if (data) {
      return data.is_contributor === true;
    } else {
      return false;
    }
  };

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

  public static requestContributor = async (user_id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({ is_contributor: false })
      .eq("id", user_id)
      .select();
    console.log(error, data);
  };

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
    console.log(data);
    if (!data?.user)
      Alert.alert("Please check your inbox for email verification!");
  };

  public static confirmPassword = (password: string, confirmpassword: string) => {
    if(password == confirmpassword){
      return true;
    }else{
      return false;

      
    }
  }

  // const signOut = async () => {
  //   setUser(undefined);
  //   setSession(undefined);
  //   setIsContributor(false);
  // };
}

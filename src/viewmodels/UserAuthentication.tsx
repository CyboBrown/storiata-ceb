import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { User } from "../models/User";
import { Session } from "@supabase/supabase-js";
import Main from "../../app/main";
export function userAuthentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    setLoading(false);
    
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };
  

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    signInWithEmail,
    signUpWithEmail,
    isContributor, 
    setIsContributor
  };
}

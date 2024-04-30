import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { User } from "../models/User";
export function userAuthentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    // supabase
    // if (user) {
    //     const { data: userData, error: userError } = await supabase

    //     if (userError) {
    //         Alert.alert(userError.message);
    //         setLoading(false);
    //         return;
    //     }

    //     if (userData) {
    //         const userType = userData.user_type;
    //         switch (userType) {
    //             case "contributer":

    //                 break;
    //             case "user":

    //                 break;
    //         }
    //     } else {
    //         Alert.alert("User data not found");
    //     }
    // } else {
    //     Alert.alert("User not found");
    // }

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
  };
}

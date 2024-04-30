import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
import Main from "../../app/main";

export function userAuthentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState();
  
  

  const signInWithEmail = async () => {
    setLoading(true);
    const {data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message);
    setLoading(false);

    if(data.user?.id){
      setUserID(data.user.id)
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(user)
    if (error) Alert.alert(error.message);
    if (!user)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
    if(user?.id){
      insertUser(user?.id, isContributor)
    }

  };

  const signOut = async () =>{

  }

  const insertUser = async (user_id: string, isContributor: boolean) => {
    const { data, error } = await supabase
      .from('user_types')
      .insert([
        { user_id, user_type: isContributor ? "contributor" : "user"},
      ])
      .select();
      console.log(error, data)
  }
        
    
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
function asynch() {
  throw new Error("Function not implemented.");
}


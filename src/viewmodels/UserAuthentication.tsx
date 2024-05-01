import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import Main from "../../app/main";

export function userAuthentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState<User>();
  const [session, setSession]=useState<Session>();
  
  

  const signInWithEmail = async () => {
    setLoading(true);
    const {data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message);
    setLoading(false);
    console.log(data)
    if(data.user?.id){
      setSession(data.session);
      setUser(data.user);
      setUserID(data.user.id);
      await getUserType(data.user.id);
    }
  };

  const getUserType = async (user_id: string) => {
    console.log(user_id);
    const { data, error } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', user_id)

    console.log(error, data)

    if(data){
      setIsContributor(data[0].user_type == "contributor")
    }
  }
  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { user, session },
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
    if(user?.id && session){
      setUser(user);
      setSession(session);
      insertUser(user?.id, isContributor);
    }

  };

  const signOut = async () =>{
    setUser(undefined);
    setSession(undefined);
    setIsContributor(false);
  }

  const insertUser = async (user_id: string, isContributor: boolean) => {
    const { data, error } = await supabase
      .from('user_details')
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
    setIsContributor,
    user,
    setUser,
    session,
    setSession,
  };
}
function asynch() {
  throw new Error("Function not implemented.");
}


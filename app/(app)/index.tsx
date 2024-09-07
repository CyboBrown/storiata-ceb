import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../src/utils/supabase";
import Login from "../login";
import Main from "./main";
import { Session } from "@supabase/supabase-js";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts } from "expo-font";
import config from "../../tamagui.config";
import { UserAuthentication } from "../../src/services/UserAuthentication";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const [isContributor, setIsContributor] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    if (session?.user?.id) {
      async () => {
        const isContrib: boolean = await UserAuthentication.getUserType(
          session.user.id
        );
        setIsContributor(isContrib);
        console.log(isContrib);
      };
    }
  }, [session]);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        {session && session.user ? (
          <Main session={session} contribMode={isContributor} />
        ) : (
          <Login setContrib={setIsContributor} />
        )}
        {/* Dont use ternary, use router.push for Redirect */}
      </Theme>
    </TamaguiProvider>
  );
}

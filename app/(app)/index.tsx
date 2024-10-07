import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import Main from "./main";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts } from "expo-font";
import config from "../../tamagui.config";
import { UserAuthentication } from "../../src/services/UserAuthentication";
import { useSession } from "../../src/services/auth-context";

export default function Page() {
  const { getUserUUID, session, isLoading }  = useSession();
  const [isContributor, setIsContributor] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const userId = getUserUUID();
    if (userId) {
      const checkUserType = async () => {
        const isContrib: boolean = await UserAuthentication.getUserType(
          userId
        );
        setIsContributor(isContrib);
        console.log(isContrib);
      };
      checkUserType();
    }
  }, [getUserUUID]);
  
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  // if (!isLoading) {
  //   return null;
  // }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <Main contribMode={isContributor} />
      </Theme>
    </TamaguiProvider>
  );
}

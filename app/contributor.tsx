import React from "react";
import { TamaguiProvider, Text } from "tamagui";
import config from "../tamagui.config";
import { Session } from "@supabase/supabase-js";
import { userAuthentication } from "../src/services/UserAuthentication";

export default function Contributor() {
  const { session } = userAuthentication();
  return (
    <TamaguiProvider config={config}>
      <Text color="black"> Welcome Contributor</Text>
    </TamaguiProvider>
  );
}

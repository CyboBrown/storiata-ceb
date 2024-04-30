import React from "react";
import { TamaguiProvider, Text} from "tamagui";
import config from "../tamagui.config";

export default function Contributor() {
  
  return (
    <TamaguiProvider config={config}>
      <Text color='black'> Welcome Contributor</Text>
    </TamaguiProvider>    
  );
}


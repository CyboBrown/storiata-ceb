import config from "../tamagui.config";
import { TamaguiProvider, Text, View } from "tamagui";

export default function Settings(){
    return(
        <TamaguiProvider config={config}>
        <View flex={1} padding="$4" marginTop="$10">
          <Text fontFamily={"$heading"} color={"black"}> This is the App Settings</Text>
        </View>
      </TamaguiProvider>
    )
}
import config from "../tamagui.config";
import { Switch, TamaguiProvider, Text, View, XStack, YStack } from "tamagui";

export default function Settings() {
  return (
    <TamaguiProvider config={config}>
      <View padding="$4" marginTop="$5">
        <Text fontFamily={"$heading"} color={"black"} fontSize={35}>
          {" "}
          App Settings
        </Text>
      </View>
      <YStack padding={"$4"}>
        <XStack gap="$4">
          <Text fontFamily={"$heading"} color={"black"} fontSize={20}>
            {" "}
            Dark Mode
          </Text>
          <Switch size="$3">
            <Switch.Thumb animation="quick" />
          </Switch>
        </XStack>
      </YStack>
    </TamaguiProvider>
  );
}

import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, ScrollView, Separator, YStack } from "tamagui";
import { StatusBar } from "expo-status-bar";

export default function Dictionary({ session }: { session: Session }) {
  return (
    <ScrollView>
      <YStack
        f={1}
        jc="flex-start"
        ai="center"
        gap="$1"
        backgroundColor={"$backgroundSoft"}
      >
        {/* <StatusBar style="auto" /> */}
        <Paragraph color="$color" jc="center">
          Dictionary
        </Paragraph>
        <Separator />
        <Button>Useless Button</Button>
      </YStack>
    </ScrollView>
  );
}

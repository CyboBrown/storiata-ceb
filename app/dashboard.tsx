import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, YStack } from "tamagui";
import { StatusBar } from "expo-status-bar";

export default function Dashboard({ session }: { session: Session }) {
  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
      {/* <Paragraph color="$color" jc="center">
        Dashboard
      </Paragraph>
      <H5> </H5>
      <Button size="$4">Useless Button</Button> */}
    </YStack>
  );
}
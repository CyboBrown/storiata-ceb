import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, YStack } from "tamagui";
import { StatusBar } from "expo-status-bar";

export default function Exercises({ session }: { session: Session }) {
  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
      <Paragraph color="$color" jc="center">
        Exercises
      </Paragraph>
      <H5> </H5>
      <Button>Useless Button</Button>
    </YStack>
  );
}

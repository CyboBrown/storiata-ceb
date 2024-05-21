import { Session } from "@supabase/supabase-js";
import {
  Button,
  H5,
  Paragraph,
  YStack,
  Accordion,
  Square,
  XStack,
  View,
  Text,
} from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useEffect } from "react";
import { Link } from "expo-router";

export default function Exercises({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("EXERCISES page loaded.");
  }, []);
  return (
    <YStack
      f={1}
      jc="space-evenly"
      ai="stretch"
      backgroundColor={"$backgroundSoft"}
    >
      <XStack
        f={1}
        jc="space-evenly"
        ai="stretch"
        backgroundColor={"$backgroundSoft"}
      >
        <Text alignSelf="center" fontSize={20} fontWeight="800">
          Exercises
        </Text>
      </XStack>

      <XStack
        f={1}
        jc="space-evenly"
        ai="stretch"
        backgroundColor={"$backgroundSoft"}
      >
        <Link push href="/other" asChild>
          <Button size="$4">Grammar</Button>
        </Link>
        <Link push href="/exercises/vocabulary" asChild>
          <Button size="$4">Vocabulary</Button>
        </Link>
      </XStack>
      <XStack
        f={1}
        jc="space-evenly"
        ai="stretch"
        backgroundColor={"$backgroundSoft"}
      >
        <Link push href="/other" asChild>
          <Button size="$4">Listening</Button>
        </Link>
        <Link push href="/other" asChild>
          <Button size="$4">Speaking</Button>
        </Link>
      </XStack>
    </YStack>
  );
}

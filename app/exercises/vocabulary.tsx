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
  TamaguiProvider,
} from "tamagui";
import { useEffect } from "react";

export default function VocabularyExercises({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("VOCABULARY_EXERCISES page loaded.");
  }, []);

  return (
    <TamaguiProvider>
      <YStack
        f={1}
        jc="space-evenly"
        ai="stretch"
        backgroundColor={"$backgroundSoft"}
      >
        <Text fontSize={20} fontWeight={800} color={"$color"}>
          Welcome to Vocabulary Exercises!
        </Text>
      </YStack>
    </TamaguiProvider>
  );
}

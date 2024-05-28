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
  Theme,
  ScrollView,
  YGroup,
  Separator,
  ListItem,
  ButtonIcon,
} from "tamagui";
import { useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { VocabularyExercise } from ".../../../src/models/VocabularyExercise";
import { ExerciseService } from ".../../../src/services/ExerciseService";
import { ChevronRight, Hash, RefreshCw } from "@tamagui/lucide-icons";
import { ExercisePopover } from ".../../../src/components/ExercisePopover";
import { useLocalSearchParams } from "expo-router";

export default function VocabularyExercises({
  session,
  exercise_id,
}: {
  session: Session;
  exercise_id: number;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("VOCABULARY_EXERCISES_" + local.exercise_id + " page loaded.");
  }, []);

  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState<VocabularyExercise>();
  const [exerciseProblems, setExerciseProblems] = useState<
    {
      id: number;
      exercise_id: number;
      word_translations: {
        words: {
          normal_form: string;
          phonetic_form: string;
          representation: string | null;
          part_of_speech: string | null;
        } | null;
        translations: {
          word: string;
        } | null;
      } | null;
    }[]
  >();
  const [exercise, setExercise] = useState();

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    try {
      setLoading(true);
      let problems = await ExerciseService.getVocabularyExerciseProblems(
        parseInt(local.exercise_id as string)
      );
      let details = (await ExerciseService.getVocabularyExerciseDetails(
        parseInt(local.exercise_id as string)
      )) as VocabularyExercise;
      if (problems) {
        setExerciseProblems(problems);
        setExerciseDetails(details);
        console.log(problems);
        console.log(details);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TamaguiProvider>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack
          f={1}
          jc="flex-start"
          ai="stretch"
          backgroundColor={"$backgroundSoft"}
        >
          <XStack jc="space-between" ai="flex-start" padding="$5">
            <Text fontSize={20} fontWeight={800} color={"$color"}>
              Vocabulary Exercises
            </Text>
            <RefreshCw
              onPress={loadExercise}
              disabled={loading}
              color={loading ? "$color5" : "$color"}
            />
          </XStack>
          <ScrollView></ScrollView>
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

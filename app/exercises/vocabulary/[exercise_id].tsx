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
  Spinner,
} from "tamagui";
import { useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { VocabularyExercise } from ".../../../src/models/VocabularyExercise";
import { ExerciseService } from ".../../../src/services/ExerciseService";
import { ChevronRight, Hash, RefreshCw } from "@tamagui/lucide-icons";
import { ExercisePopover } from ".../../../src/components/ExercisePopover";
import { useLocalSearchParams } from "expo-router";
import { StructuredVocabularyExercise } from "../../../src/models/StructuredVocabularyExercise";
import { structurizeVocabularyExercise } from "../../../src/utils/structurize";
import { OptionCard } from "../../../src/components/OptionCard";
import { VocabularyExerciseUI } from "../../../src/components/ExerciseUI";
import { VocabularyExerciseType } from "../../../src/utils/enums";

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
  const [loadingText, setLoadingText] = useState("Loading...");
  const [exerciseDetails, setExerciseDetails] = useState<VocabularyExercise>();
  const [exerciseProblems, setExerciseProblems] = useState<
    {
      id: number;
      exercise_id: number;
      word_id: number;
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
  const [exercise, setExercise] =
    useState<StructuredVocabularyExercise | null>();

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    try {
      setLoadingText("Loading exercise...");
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
        setExercise(structurizeVocabularyExercise(details, problems));
        // console.log(problems);
        // console.log(details);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   try {
  //     setLoadingText("Generating exercise...");
  //     setLoading(true);
  //     console.log(exercise);
  //     if (exercise) {
  //       setItemIndex(0);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [exercise]);

  return (
    <TamaguiProvider>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack f={1} jc="center" ai="stretch" backgroundColor={"$background"}>
          {loading ? (
            <YStack jc="flex-start" ai="center" padding="$5">
              <Spinner size="large" color="$blue9" m="$2" />
              <Text fontSize={20} fontWeight={400} color={"$color"}>
                {loadingText}
              </Text>
            </YStack>
          ) : (
            <VocabularyExerciseUI
              exercise_type={
                VocabularyExerciseType.ChooseRepresentationForCebWord
              }
              exercise={exercise || null}
            />
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

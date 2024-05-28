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
  const [itemIndex, setItemIndex] = useState(0);

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

  useEffect(() => {
    try {
      setLoadingText("Generating exercise...");
      setLoading(true);
      console.log(exercise);
      if (exercise) {
        setItemIndex(0);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [exercise]);

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
            <>
              <View
                alignSelf="center"
                jc="flex-start"
                ai="flex-start"
                p="$5"
                gap="$2"
                borderColor={"$color5"}
                borderRadius="$5"
                borderWidth="$1"
                width="90%"
              >
                <Text fontSize={20}>
                  Choose the correct translation for
                  <Text fontSize={20} fontWeight={600} color={"$color"}>
                    &nbsp;"one"
                  </Text>
                  .
                </Text>
              </View>
              <View
                paddingVertical="$5"
                width="100%"
                flexDirection="row"
                flexWrap="wrap"
                jc="space-evenly"
                ai="center"
                rowGap="$5"
              >
                <OptionCard
                  text={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].ceb_word
                      : "sample"
                  }
                  representation={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].representation
                      : "⛔"
                  }
                />
                <OptionCard
                  text={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].ceb_word
                      : "sample"
                  }
                  representation={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].representation
                      : "⛔"
                  }
                />
                <OptionCard
                  text={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].ceb_word
                      : "sample"
                  }
                  representation={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].representation
                      : "⛔"
                  }
                />
                <OptionCard
                  text={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].ceb_word
                      : "sample"
                  }
                  representation={
                    exercise?.item_sets
                      ? exercise?.item_sets[0].representation
                      : "⛔"
                  }
                />
              </View>
            </>
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

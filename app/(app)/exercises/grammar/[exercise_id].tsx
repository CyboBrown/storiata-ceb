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
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ExerciseService } from "../../../../src/services/ExerciseService";
import { GrammarExercise } from "../../../../src/models/GrammarExercise";
import { GrammarExerciseUI } from "../../../../src/components/ExerciseUI";
import { GrammarExerciseType } from "../../../../src/utils/enums";
import { useSession } from "../../../../src/contexts/AuthContext";

export default function GrammarExercises({
  session,
  exercise_id,
}: {
  session: Session;
  exercise_id: number;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("GRAMMAR_EXERCISES_" + local.exercise_id + " page loaded.");
  }, []);

  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [exercise, setExercise] = useState<GrammarExercise | null>();
  const [exerciseLevel, setExerciseLevel] = useState(0);
  const navigation = useNavigation();

  const { getUserUUID } = useSession();

  useEffect(() => {
    loadExercise();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const loadExercise = async () => {
    try {
      setLoadingText("Loading exercise...");
      setLoading(true);
      let problems = await ExerciseService.getGrammarExerciseProblems(
        parseInt(local.exercise_id as string)
      );
      let exerLevel = await ExerciseService.getExerciseLevel(
        parseInt(local.exercise_id as string),
        getUserUUID() ?? ""
      );
      setExerciseLevel(exerLevel);
      setExercise(problems);
      console.log(("EXERCISE LEVEL IS CURRENTLY " + exerLevel) as string);
      console.log("*****" + problems);
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
      <Theme name={colorScheme === "dark" ? "light" : "light"}>
        <YStack f={1} jc="center" ai="stretch" backgroundColor={"$background"}>
          {loading ? (
            <YStack jc="flex-start" ai="center" padding="$5">
              <Spinner size="large" color="$blue9" m="$2" />
              <Text fontSize={20} fontWeight={400} color={"$color"}>
                {loadingText}
              </Text>
            </YStack>
          ) : (
            <GrammarExerciseUI
              exercise_type={exerciseLevel % 6}
              exercise={exercise || null}
            />
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

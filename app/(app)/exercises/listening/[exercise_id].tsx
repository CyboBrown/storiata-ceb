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
import { useLocalSearchParams } from "expo-router";
import { ExerciseService } from "../../../../src/services/ExerciseService";
import { ListeningExercise } from "../../../../src/models/ListeningExercise";
import { ListeningExerciseUI } from "../../../../src/components/ExerciseUI";
import { ListeningExerciseType } from "../../../../src/utils/enums";
import { useSession } from "../../../../src/services/auth-context";

export default function ListeningExercises({
  session,
  exercise_id,
}: {
  session: Session;
  exercise_id: number;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("LISTENING_EXERCISES_" + local.exercise_id + " page loaded.");
  }, []);

  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [exercise, setExercise] = useState<ListeningExercise | null>();
  const [exerciseLevel, setExerciseLevel] = useState(0);

  const { getUserUUID } = useSession();

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    try {
      setLoadingText("Loading exercise...");
      setLoading(true);
      let problems = await ExerciseService.getListeningExerciseProblems(
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
            <ListeningExerciseUI
              exercise_type={exerciseLevel % 6}
              exercise={exercise || null}
            />
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

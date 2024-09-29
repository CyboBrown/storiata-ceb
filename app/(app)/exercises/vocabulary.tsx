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
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { ChevronRight, Hash, RefreshCw } from "@tamagui/lucide-icons";
import { ExercisePopover } from "../../../src/components/ExercisePopover";
import { ExerciseTypes } from "../../../src/utils/enums";
import { UserExercise } from "../../../src/models/UserExercise";
import { useSession } from "../../../src/services/auth-context";

export default function VocabularyExercises({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("VOCABULARY_EXERCISES page loaded.");
  }, []);

  const colorScheme = useColorScheme();
  const { getUserUUID } = useSession();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<UserExercise[]>([]);
  const { getUserUUID } = useSession();

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setLoading(true);
      let progress = await ExerciseService.getUserExerciseProgress(
        getUserUUID() ?? ""
        getUserUUID() ?? ""
      );
      if (progress) {
        setProgress(progress);
      }
      let data = await ExerciseService.getAllExercisesByType(
        ExerciseTypes.Vocabulary
      );
      if (data) {
        setResults(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkExerciseCompletion = (exercise_id: number) => {
    const level = progress.find((exercise) => {
      return exercise.exercise_id == exercise_id;
    })?.level;
    return !!level && level >= 6;
  };

  return (
    <TamaguiProvider>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack
          f={1}
          jc="flex-start"
          ai="stretch"
          backgroundColor={"$background"}
        >
          <XStack jc="space-between" ai="flex-start" padding="$5">
            <Text fontSize={20} fontWeight={800} color={"$color"}>
              Vocabulary Exercises
            </Text>
            <RefreshCw
              onPress={loadExercises}
              disabled={loading}
              color={loading ? "$color5" : "$color"}
            />
          </XStack>

          <ScrollView>
            <YGroup
              alignSelf="center"
              bordered
              size="$5"
              separator={<Separator />}
            >
              {results.map((result, index) => (
                <ExercisePopover
                  user={getUserUUID() ?? ""}
                  title={result.topic}
                  subTitle={result.description}
                  index={result.id}
                  exerciseType={ExerciseTypes.Vocabulary}
                  key={result.id}
                  finished={checkExerciseCompletion(result.id)}
                />
              ))}
            </YGroup>
          </ScrollView>
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

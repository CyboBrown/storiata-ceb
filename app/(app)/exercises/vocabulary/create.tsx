import { Session } from "@supabase/supabase-js";
import {
  Button,
  YStack,
  XStack,
  View,
  Text,
  TamaguiProvider,
  Theme,
  Fieldset,
  Label,
  Input,
} from "tamagui";
import { useEffect, useLayoutEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { ExerciseService } from "../../../../src/services/ExerciseService";
import { VocabularyExercise } from "../../../../src/models/VocabularyExercise";
import { ExerciseTypes } from "../../../../src/utils/enums";
import { useSession } from "../../../../src/contexts/AuthContext";
import AddWordToExerciseDialog from "../../../../src/components/AddWordToExerciseDialog";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CreateVocabularyExercise({
  session,
}: {
  session: Session;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("CREATE_VOCABULARY_EXERCISE page loaded.");
  }, []);

  const { getUserUUID } = useSession();
  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [exercise, setExercise] = useState<VocabularyExercise>({
    added_by: getUserUUID() ?? "",
    created_at: "",
    description: "",
    id: 0,
    type: ExerciseTypes.Vocabulary,
    topic: "",
    item_sets: [],
  });
  const [disabled, setDisabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (
      exercise.item_sets &&
      exercise.item_sets?.length > 5 &&
      exercise.topic != ""
    ) {
      setDisabled(false);
    }
  }, [exercise]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Vocabulary Exercise"
    });
  }, [navigation]);

  const save = async () => {
    setDisabled(true);
    setLoading(true);
    await ExerciseService.createVocabularyExercise(exercise);
    setLoading(false);
    setSaved(true);
  };

  return (
    <TamaguiProvider>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack
          f={1}
          jc="flex-start"
          ai="stretch"
          backgroundColor={"$background"}
          padding="$5"
          gap="$4"
        >
          <Text fontSize={20} fontWeight={900} color={"$color"}>
            Create New Vocabulary Exercise
          </Text>
          <Fieldset horizontal ai="stretch">
            <Label width="30%" htmlFor="topic_input">
              Topic:
            </Label>
            <Input
              width="70%"
              id="topic_input"
              defaultValue=""
              placeholder=""
              value={exercise.topic}
              onChangeText={(text) => {
                let updated_exercise = { ...exercise };
                updated_exercise.topic = text;
                setExercise(updated_exercise);
              }}
            />
          </Fieldset>
          <Fieldset horizontal ai="stretch">
            <Label width="30%" htmlFor="description_input">
              Description:
            </Label>
            <Input
              width="70%"
              id="description_input"
              defaultValue=""
              placeholder=""
              value={exercise.description}
              onChangeText={(text) => {
                let updated_exercise = { ...exercise };
                updated_exercise.description = text;
                setExercise(updated_exercise);
              }}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              maxLength={64}
            />
          </Fieldset>
          <Fieldset horizontal ai="stretch">
            <Label width="30%" htmlFor="words_input">
              Words:
            </Label>
            <View
              id="words_input"
              width="70%"
              flexDirection="row"
              flexWrap="wrap"
              ai="flex-start"
              gap="$2"
            >
              {exercise.item_sets
                ?.sort((a, b) => a.ceb_word.localeCompare(b.ceb_word))
                .map((item, index) => (
                  <Text
                    backgroundColor={"$gray5"}
                    borderRadius={"$8"}
                    py="$1"
                    px="$2"
                    fontSize={18}
                    onPress={() => {
                      let updated_exercise = { ...exercise };
                      updated_exercise.item_sets?.splice(index, 1);
                      setExercise(updated_exercise);
                    }}
                  >
                    <Icon name={"delete-forever"} size={16} color="red" />
                    {item.ceb_word + " → " + item.eng_word + " "}
                  </Text>
                ))}
              <AddWordToExerciseDialog
                exercise={exercise}
                setExercise={setExercise}
              />
            </View>
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <Link href="/exercises/vocabulary" asChild disabled={saved}>
              <Button
                theme="active"
                aria-label="Close"
                onPress={save}
                disabled={disabled}
              >
                <Icon name={"content-save"} size={20} color="black" />
                Save
              </Button>
            </Link>
          </XStack>
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

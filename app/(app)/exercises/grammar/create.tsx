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
  Separator,
  Progress,
  ScrollView,
} from "tamagui";
import { useEffect, useLayoutEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { ExerciseService } from "../../../../src/services/ExerciseService";
import { VocabularyExercise } from "../../../../src/models/VocabularyExercise";
import { ExerciseTypes } from "../../../../src/utils/enums";
import { useSession } from "../../../../src/contexts/AuthContext";
import AddWordToExerciseDialog from "../../../../src/components/AddWordToExerciseDialog";
import { GrammarExercise } from "../../../../src/models/GrammarExercise";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CreateGrammarExercise({
  session,
}: {
  session: Session;
}) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("CREATE_GRAMMAR_EXERCISE page loaded.");
  }, []);

  const { getUserUUID } = useSession();
  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [exercise, setExercise] = useState<GrammarExercise>({
    added_by: getUserUUID() ?? "",
    created_at: "",
    description: "",
    id: 0,
    type: ExerciseTypes.Grammar,
    topic: "",
    item_sets: [],
    exercise_words: [],
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
      headerTitle: "Create Grammar Exercise",
    });
  }, [navigation]);

  const save = async () => {
    setDisabled(true);
    setLoading(true);
    await ExerciseService.createGrammarExercise(exercise);
    setLoading(false);
    setSaved(true);
  };

  return (
    <TamaguiProvider>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <ScrollView>
          <View
            f={1}
            jc="flex-start"
            ai="stretch"
            backgroundColor={"$background"}
            padding="$5"
            gap="$4"
          >
            <Text fontSize={20} fontWeight={900} color={"$color"}>
              Create New Grammar Exercise
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
                {exercise.exercise_words
                  ?.sort((a, b) => a.ceb_word.localeCompare(b.ceb_word))
                  .sort((a, b) => a.role.localeCompare(b.role))
                  .map((item, index, array) => (
                    <>
                      {(index == 0 || array[index - 1].role != item.role) && (
                        <Text
                          backgroundColor={"$gray7"}
                          borderRadius={"$8"}
                          py="$1"
                          px="$2"
                          fontSize={"$5"}
                          flexBasis={"100%"}
                        >
                          <Icon
                            name={"format-list-group"}
                            size={16}
                            color="black"
                          />
                          {" " + item.role + " "}
                        </Text>
                      )}
                      <Text
                        backgroundColor={"$gray5"}
                        borderRadius={"$8"}
                        py="$1"
                        px="$2"
                        fontSize={"$5"}
                        onPress={() => {
                          let updated_exercise = { ...exercise };
                          updated_exercise.exercise_words?.splice(index, 1);
                          setExercise(updated_exercise);
                        }}
                      >
                        <Icon name={"delete-forever"} size={16} color="red" />
                        {" " + item.ceb_word + " → " + item.eng_word + " "}
                      </Text>
                    </>
                  ))}
                <Separator flexBasis={"100%"}></Separator>
                <AddWordToExerciseDialog
                  exercise={exercise}
                  setExercise={setExercise}
                />
              </View>
            </Fieldset>
            <Fieldset horizontal ai="stretch">
              <Label width="30%" htmlFor="sentences_input">
                Sentences:
              </Label>
              <View
                id="sentences_input"
                width="70%"
                flexDirection="column"
                ai="stretch"
                gap="$2"
              >
                {exercise.item_sets?.map((item, index, array) => (
                  <>
                    <Input
                      borderTopLeftRadius={"$8"}
                      borderTopRightRadius={"$8"}
                      borderBottomLeftRadius={"$0"}
                      borderBottomRightRadius={"$0"}
                      id={"ceb_sentence_input_" + index}
                      defaultValue=""
                      placeholder="Enter a Cebuano sentence..."
                      value={exercise.item_sets?.at(index)?.sentence}
                      onChangeText={(text) => {
                        let updated_exercise = { ...exercise };
                        updated_exercise.item_sets!.at(index)!.sentence = text;
                        setExercise(updated_exercise);
                      }}
                    />
                    <Input
                      borderTopLeftRadius={"$0"}
                      borderTopRightRadius={"$0"}
                      borderBottomLeftRadius={"$8"}
                      borderBottomRightRadius={"$8"}
                      id={"en_sentence_input_" + index}
                      defaultValue=""
                      placeholder="Enter an English sentence..."
                      value={exercise.item_sets?.at(index)?.translated_sentence}
                      onChangeText={(text) => {
                        let updated_exercise = { ...exercise };
                        updated_exercise.item_sets!.at(
                          index
                        )!.translated_sentence = text;
                        setExercise(updated_exercise);
                      }}
                    />
                    <Separator flexBasis={"100%"}></Separator>
                  </>
                ))}
                <Text
                  backgroundColor={"$gray10"}
                  borderRadius={"$8"}
                  py="$1"
                  px="$2"
                  fontSize={"$5"}
                  onPress={() => {
                    let updated_exercise: GrammarExercise = { ...exercise };
                    updated_exercise.item_sets?.push({
                      id: Number.MAX_SAFE_INTEGER,
                      sentence: "",
                      translated_sentence: "",
                      sentence_words: [],
                    });
                    setExercise(...[updated_exercise]);
                  }}
                >
                  <Icon name={"plus"} size={16} color="lightgreen" />
                  {" New Sentence"}
                </Text>
              </View>
            </Fieldset>
            <XStack alignSelf="flex-end" gap="$4">
              <Link href="/exercises/grammar" asChild disabled={saved}>
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
          </View>
        </ScrollView>
      </Theme>
    </TamaguiProvider>
  );
}

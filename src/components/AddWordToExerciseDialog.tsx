import { Plus, X } from "@tamagui/lucide-icons";
import {
  Button,
  Dialog,
  Adapt,
  Sheet,
  Input,
  Paragraph,
  XStack,
  Unspaced,
  Text,
  YStack,
  SizableText,
  Spinner,
  ScrollView,
  YGroup,
  Separator,
  Fieldset,
  Label,
} from "tamagui";

import { useEffect, useState } from "react";
import { Alert, Pressable } from "react-native";
import { WordTranslationSearchResult } from "./WordTranslationSearchResult";
import { ExerciseService } from "../services/ExerciseService";
import { WordTranslation } from "../models/WordTranslation";
import { VocabularyExercise } from "../models/VocabularyExercise";
import { GrammarExercise, isGrammarExercise } from "../models/GrammarExercise";

export default function AddWordToExerciseDialog({
  exercise,
  setExercise,
}: {
  exercise: VocabularyExercise | GrammarExercise;
  setExercise: React.Dispatch<
    React.SetStateAction<VocabularyExercise | GrammarExercise>
  >;
}) {
  const [wordPair, setWordPair] = useState<WordTranslation>();
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState<WordTranslation[]>([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // setWord(selected_word);
    console.log("Initial Selected:");
    // console.log(exercise);
    console.log("Initial Set:");
    console.log(wordPair);
  }, [clicked]);

  async function search(text: string) {
    try {
      console.log(text);
      setLoading(true);
      let data = await ExerciseService.searchWordPair(text);
      if (data) {
        setResults(data);
        console.log(results);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Pressable onPress={() => setClicked(!clicked)}>
          <Text
            backgroundColor={"$gray10"}
            borderRadius={"$8"}
            py="$1"
            px="$2"
            fontSize={"$5"}
          >
            {"+ Add Word"}
          </Text>
        </Pressable>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Add Word To Exercise</Dialog.Title>
          <Dialog.Description>
            {isGrammarExercise(exercise)
              ? "Specify the role of the word in the sentence. "
              : ""}
            Browse for a suitable word pair and click to add to the current
            exercise.
          </Dialog.Description>
          <YStack
            f={1}
            jc="flex-start"
            ai="stretch"
            gap="$2"
            backgroundColor={"$backgroundSoft"}
          >
            {isGrammarExercise(exercise) ? (
              <Fieldset horizontal ai="stretch">
                <Label width="20%" htmlFor="role_input">
                  Role:
                </Label>
                <Input
                  width="80%"
                  id="role_input"
                  defaultValue=""
                  placeholder="Specify the word's role in the sentence"
                  value={role}
                  onChangeText={(text) => {
                    setRole(text);
                  }}
                />
              </Fieldset>
            ) : (
              ""
            )}
            <Separator />

            <XStack alignItems="center" gap="$2">
              <Input
                flex={1}
                size="$4"
                ai="stretch"
                placeholder={`Enter Word...`}
                onChangeText={(input) => setInput(input)}
              />
              <Button size="$4" onPress={() => search(input)}>
                Search
              </Button>
            </XStack>
            {loading ? (
              <Spinner size="large" color="$blue9" m="$2" />
            ) : (
              results.length == 0 &&
              (input === "" ? (
                <SizableText
                  size="$4"
                  fontWeight="200"
                  color="$color10"
                  p="$3"
                  alignSelf="center"
                >
                  Start Searching...
                </SizableText>
              ) : (
                <Paragraph
                  size="$4"
                  fontWeight="200"
                  color="$color10"
                  p="$3"
                  alignSelf="center"
                >
                  No results found for "{input}".
                </Paragraph>
              ))
            )}
            <ScrollView>
              <YGroup
                alignSelf="center"
                bordered
                size="$5"
                separator={<Separator />}
              >
                {results.map((result, index) => (
                  <WordTranslationSearchResult
                    title={
                      (result.words?.normal_form ?? "_") +
                      " → " +
                      (result.translations?.word ?? "_")
                    }
                    index={index}
                    key={index}
                    wordPair={result}
                    exercise={exercise}
                    setExercise={setExercise}
                    role={role}
                  />
                ))}
              </YGroup>
            </ScrollView>
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

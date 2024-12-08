import { Plus, X } from "@tamagui/lucide-icons";
import {
  Button,
  Dialog,
  Adapt,
  Sheet,
  Fieldset,
  Label,
  Input,
  TooltipSimple,
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
} from "tamagui";

import { SelectItem } from "./SelectItem";
import { useEffect, useState } from "react";
import { Word } from "../models/Word";
import { DictionaryService } from "../services/DictionaryService";
import {
  PartsOfSpeech,
  RevEngPartsOfSpeech,
  RevPartsOfSpeech,
} from "../utils/enums";
import { Alert, Pressable } from "react-native";
import { Translation } from "../models/Translation";
import { WordSearchResult } from "./WordSearchResult";
import { TranslationSearchResult } from "./TranslationSearchResult";

export default function EditTranslationDialog({
  selected_word,
}: {
  selected_word: Word;
}) {
  const parts_of_speech = [
    { name: "uncategorized" },
    { name: "adjective" },
    { name: "noun" },
    { name: "number" },
    { name: "verb" },
  ];

  const [word, setWord] = useState<Word>(selected_word);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState<Translation[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setResults([]);
    // setWord(selected_word);
    console.log("Initial Selected:");
    console.log(selected_word.normal_form);
    setWord(selected_word);
    console.log("Initial Set:");
    console.log(word.normal_form);
  }, [clicked]);

  async function search(text: string) {
    try {
      console.log(text);
      setLoading(true);
      let data = await DictionaryService.searchTranslation(text);
      if (data) {
        setResults(data);
        // console.log(results);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    // console.log(word);
    // setLoading(true);
    // if (word) {
    //   let data = await DictionaryService.editWord(word);
    //   if (data) {
    //     console.log(data);
    //   }
    // }
    // setLoading(false);
    // setClicked(!clicked);
  }

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button onPress={() => setClicked(!clicked)}>Edit Translation</Button>
        {/* <Pressable onPress={() => setClicked(!clicked)}>
          <Text
            fontSize="$2"
            color={"$color10"}
            fontFamily={"$body"}
            fontWeight={"bold"}
          >
            + Edit Translation
          </Text>
        </Pressable> */}
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
          <Dialog.Title>Edit Translations</Dialog.Title>
          <Dialog.Description>
            Add and remove translations here. Click save when you're done and
            manually reload.
          </Dialog.Description>
          <YStack
            f={1}
            jc="flex-start"
            ai="stretch"
            gap="$2"
            backgroundColor={"$backgroundSoft"}
          >
            <XStack alignItems="center" gap="$2">
              <Input
                flex={1}
                size="$4"
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
                  <TranslationSearchResult
                    title={result.word}
                    subTitle={result.part_of_speech
                      .split("")
                      .reduce(
                        (acc, type) =>
                          acc +
                          RevEngPartsOfSpeech[
                            `${type}` as keyof typeof RevEngPartsOfSpeech
                          ] +
                          ", ",
                        ""
                      )
                      .slice(0, -2)}
                    index={index}
                    key={index}
                    word_id={selected_word.id}
                    translation_id={result.id}
                    is_delete={selected_word.translations?.some(
                      (translation) => translation.word == result.word
                    )}
                  />
                ))}
              </YGroup>
            </ScrollView>
          </YStack>

          {/* <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close" onPress={save}>
                Save
              </Button>
            </Dialog.Close>
          </XStack> */}

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

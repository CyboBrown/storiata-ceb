import { Session } from "@supabase/supabase-js";
import {
  Button,
  Input,
  Paragraph,
  ScrollView,
  Separator,
  XStack,
  YGroup,
  YStack,
  Sheet,
  SizableText,
  ZStack,
  Text,
  Spinner,
  Tabs,
  View,
} from "tamagui";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../../../src/utils/supabase";
import { Alert, FlatList } from "react-native";
import { Word } from "../../../src/models/Word";
import AddWordDialog from "../../../src/components/AddWordDialog";
import { WordSearchResult } from "../../../src/components/WordSearchResult";
import { DictionaryService } from "../../../src/services/DictionaryService";
import { Link, useNavigation, useRouter } from "expo-router";
import EditWordDialog from "../../../src/components/EditWordDialog";
import EditTranslationDialog from "../../../src/components/EditTranslationDialog";
import { RevPartsOfSpeech } from "../../../src/utils/enums";
import ConjugationTable from "../../../src/components/ConjugationTable";
import CustomHeader from "../../../src/components/HeaderTitle";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Dictionary() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [position, setPosition] = useState(0);
  const [searched, setSearched] = useState(false);
  const { isContributor } = useContributorContext();

  const navigation = useNavigation();
  const router = useRouter();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("DICTIONARY page loaded.");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeader pageTitle="Dictionary" />, // Use Custom Header
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    });
  }, [navigation]);

  async function search(text: string) {
    try {
      console.log(text);
      setLoading(true);
      setSearched(true);
      // setInput(text);
      let data = await DictionaryService.searchWord(text);
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
    <>
      <ZStack
        f={1}
        m={10}
        jc="flex-start"
        ai="stretch"
        gap="$2"
        backgroundColor={"$backgroundSoft"}
      >
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
            <Button
              size="$4"
              backgroundColor={"$backgroundFocus"}
              onPress={() => search(input)}
            >
              <Icon name={"magnify"} size={20} color="black" />
              Search
            </Button>
          </XStack>
          {loading ? (
            <Spinner size="large" color="$blue9" m="$2" />
          ) : (
            results.length == 0 &&
            (!searched ? (
              <SizableText
                size="$4"
                fontWeight="200"
                color="$color10"
                p="$3"
                alignSelf="center"
              >
                Search na ta!
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
                <WordSearchResult
                  title={result.normal_form}
                  subTitle={result.translations
                    .reduce(
                      (acc, translation) => acc + translation.word + ", ",
                      ""
                    )
                    .slice(0, -2)}
                  index={index}
                  key={index}
                  setSelected={setSelected}
                  setOpen={setOpen}
                />
              ))}
            </YGroup>
          </ScrollView>
        </YStack>
        {isContributor && (
          <YStack
            f={1}
            jc="flex-end"
            ai="flex-end"
            gap="$2"
            backgroundColor={"$backgroundSoft"}
            m="$2"
          >
            <AddWordDialog />
          </YStack>
        )}
      </ZStack>
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        // snapPoints={[30, 50]}
        snapPointsMode={"fit"}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame
          padding="$4"
          justifyContent="flex-start"
          alignItems="stretch"
          space="$5"
        >
          <Tabs
            defaultValue="tab1"
            orientation="horizontal"
            flexDirection="column"
            borderRadius="$4"
            borderWidth="$0.25"
            overflow="scroll"
            borderColor="$borderColor"
          >
            <Tabs.List
              separator={<Separator vertical />}
              disablePassBorderRadius="bottom"
              aria-label="Display word information"
            >
              <Tabs.Tab flex={1} value="tab1">
                <SizableText fontFamily="$body">Details</SizableText>
              </Tabs.Tab>
              <Tabs.Tab flex={1} value="tab2">
                <SizableText fontFamily="$body">Conjugations</SizableText>
              </Tabs.Tab>
              {isContributor && (
                <Tabs.Tab flex={1} value="tab3">
                  <SizableText fontFamily="$body">Edit</SizableText>
                </Tabs.Tab>
              )}
            </Tabs.List>
            <Separator />
            {/* Details */}
            <Tabs.Content
              value="tab1"
              backgroundColor="$background"
              key="tab1"
              padding="$2"
              alignItems="stretch"
              justifyContent="center"
              flex={1}
            >
              <YStack space="$2" jc="center" alignItems="stretch" p="$4">
                {/* Representation */}
                <Text
                  alignSelf="flex-start"
                  fontSize="$15"
                  fontWeight="800"
                  borderColor="$color10"
                  borderWidth="$1"
                  borderRadius="$4"
                  textAlign="center"
                  p="$2.5"
                >
                  {results[selected]
                    ? results[selected].representation
                    : "none"}
                </Text>
                {/* Word */}
                <Text fontSize="$10">
                  {results[selected] ? results[selected].normal_form : "none"}
                </Text>
                {/* Pronunciation */}
                <Text fontSize="$8" fontStyle="italic">
                  /
                  {results[selected] ? results[selected].phonetic_form : "none"}
                  /
                </Text>
                <Text fontSize="$8" color="$color10">
                  {results[selected]
                    ? RevPartsOfSpeech[
                        `${results[selected].part_of_speech}` as keyof typeof RevPartsOfSpeech
                      ]
                    : ""}
                </Text>
                <Separator borderColor="$color10"></Separator>
                {/* Translations */}
                <Text fontSize="$8" fontWeight={500}>
                  {results[selected]
                    ? results[selected].translations
                        .reduce(
                          (acc, translation) => acc + translation.word + ", ",
                          ""
                        )
                        .slice(0, -2)
                    : null}
                </Text>
              </YStack>
            </Tabs.Content>
            {/* Conjugations */}
            <Tabs.Content
              value="tab2"
              backgroundColor="$background"
              key="tab2"
              padding="$2"
              alignItems="stretch"
              justifyContent="flex-start"
              flex={1}
              p="$2"
            >
              <ConjugationTable word={results[selected]}></ConjugationTable>
            </Tabs.Content>
            {/* Edit */}
            {isContributor && (
              <Tabs.Content
                value="tab3"
                backgroundColor="$background"
                key="tab3"
                padding="$2"
                alignItems="stretch"
                justifyContent="flex-start"
                flex={1}
                p="$2"
              >
                <YStack ai="stretch" gap="$2">
                  <EditTranslationDialog
                    selected_word={
                      results[selected]
                        ? results[selected]
                        : {
                            added_by: null,
                            created_at: "",
                            description: null,
                            id: -1,
                            normal_form: "",
                            part_of_speech: "",
                            phonetic_form: "",
                            representation: null,
                            suffix_form: null,
                            translations: null,
                          }
                    }
                  />
                  <EditWordDialog
                    selected_word={
                      results[selected]
                        ? results[selected]
                        : {
                            added_by: null,
                            created_at: "",
                            description: null,
                            id: -1,
                            normal_form: "",
                            part_of_speech: "",
                            phonetic_form: "",
                            representation: null,
                            suffix_form: null,
                            translations: null,
                          }
                    }
                  />
                </YStack>
              </Tabs.Content>
            )}
          </Tabs>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

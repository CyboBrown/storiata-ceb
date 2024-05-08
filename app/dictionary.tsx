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
} from "tamagui";
import React, { useState, useEffect } from "react";
import { supabase } from "../src/utils/supabase";
import { Alert } from "react-native";
import { Word } from "../src/models/Word";
import AddWordDialog from "../src/components/AddWordDialog";
import { WordSearchResult } from "../src/components/WordSearchResult";

export default function Dictionary({
  session,
  contribMode,
}: {
  session: Session;
  contribMode: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [position, setPosition] = useState(0);

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("DICTIONARY page loaded.");
  }, []);

  async function search(text: string) {
    try {
      console.log(text);
      setLoading(true);
      setInput(text);
      const { data, error, status } = await supabase
        .from("words")
        .select(`*, translations(word)`)
        .ilike("normal_form", "%" + text + "%")
        .order("normal_form");
      if (error && status !== 406) {
        console.log("error");
        throw error;
      }
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
              onChangeText={(input) => search(input)}
            />
            <Button size="$4">Search</Button>
          </XStack>
          {results.length == 0 &&
            (input === "" ? (
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
            ))}
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
        {contribMode && (
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
        snapPoints={[30, 50]}
        snapPointsMode={"percent"}
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
          <YStack space="$2" jc="center" alignItems="center">
            <XStack space="$4" jc="center" alignItems="center">
              <SizableText size="$10" fontWeight="800">
                {results[selected] ? results[selected].representation : "none"}
              </SizableText>
              <YStack space="$2" alignItems="center">
                <Paragraph size="$3" fontWeight="800">
                  {results[selected] ? results[selected].normal_form : "none"}
                </Paragraph>
                <SizableText size="$2" fontStyle="italic">
                  {results[selected] ? results[selected].phonetic_form : "none"}
                </SizableText>
              </YStack>
            </XStack>
            <XStack space>
              {results[selected]
                ? results[selected].translations.map((translation) => (
                    <SizableText theme="alt1" size="$3">
                      {translation.word}
                    </SizableText>
                  ))
                : null}
            </XStack>
            {/* <SizableText size="$2" fontWeight="800">
              {results[selected]
                ? results[selected].suffix_form + "an"
                : "none"}
            </SizableText> */}
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

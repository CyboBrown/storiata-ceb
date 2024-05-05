import { Session } from "@supabase/supabase-js";
import {
  Button,
  H5,
  Input,
  ListItem,
  Paragraph,
  ScrollView,
  Separator,
  XStack,
  YGroup,
  YStack,
  Sheet,
  SizableText,
} from "tamagui";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Cloud,
  Moon,
  Star,
  Sun,
} from "@tamagui/lucide-icons";
import { useState, useEffect } from "react";
import { supabase } from "../src/utils/supabase";
import { Alert } from "react-native";

import type { SheetProps } from "@tamagui/sheet";
import { useSheet } from "@tamagui/sheet";
import { Word } from "../src/models/Word";

export default function Dictionary({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Word[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [position, setPosition] = useState(0);

  async function search(text: string) {
    try {
      console.log(text);
      setLoading(true);
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
        <ScrollView>
          <YGroup
            alignSelf="center"
            bordered
            size="$5"
            separator={<Separator />}
          >
            {results.map((result, index) => (
              <Entry
                title={result.normal_form}
                subTitle={result.translations
                  .reduce(
                    (acc, translation) => acc + translation.word + ", ",
                    ""
                  )
                  .slice(0, -2)}
                index={index}
                setSelected={setSelected}
                setOpen={setOpen}
              />
            ))}
          </YGroup>
        </ScrollView>
      </YStack>
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

const Entry = ({
  title,
  subTitle,
  index,
  setSelected,
  setOpen,
}: {
  title: string;
  subTitle: string;
  index: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <YGroup.Item>
      <ListItem
        key={index}
        hoverTheme
        pressTheme
        title={title}
        subTitle={subTitle}
        icon={Star}
        iconAfter={ChevronRight}
        onPress={() => {
          setSelected(index);
          setOpen(true);
        }}
      />
    </YGroup.Item>
  );
};

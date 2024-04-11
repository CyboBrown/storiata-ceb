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
} from "tamagui";
import { ChevronRight, Cloud, Moon, Star, Sun } from "@tamagui/lucide-icons";
// import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { Alert } from "react-native";

export default function Dictionary({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WordParams[]>([]);

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
    <YStack
      f={1}
      jc="flex-start"
      ai="stretch"
      gap="$2"
      backgroundColor={"$backgroundSoft"}
    >
      {/* <StatusBar style="auto" /> */}
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
        <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
          {results.map((result) => (
            <Entry
              title={result.normal_form}
              subTitle={result.translations
                .reduce((acc, translation) => acc + translation.word + ", ", "")
                .slice(0, -2)}
            />
          ))}
        </YGroup>
      </ScrollView>
    </YStack>
  );
}

interface WordParams {
  normal_form: string;
  phonetic_form: string;
  translations: Array<{ word: string }>;
}

const Entry = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <YGroup.Item>
      <ListItem
        key={0}
        hoverTheme
        pressTheme
        title={title}
        subTitle={subTitle}
        icon={Star}
        iconAfter={ChevronRight}
      />
    </YGroup.Item>
  );
};

import {
  Separator,
  SizableText,
  View,
  XStack,
  YStack,
  getThemes,
} from "tamagui";
import { Word } from "../models/Word";
import { ScrollView, Text } from "react-native";
import { nasalize, startsWithVowel } from "../utils/conjugate";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import LoadingAnim from "../../src/assets/walking.gif";

export default function ConjugationTable({ word }: { word: Word }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <YStack p="$0" h={"$20"}>
          <View alignItems="center" margin="auto">
            <Image
              source={LoadingAnim}
              style={{ width: 100, height: 100, marginHorizontal: "auto" }}
            />
            <Text
              style={{
                fontSize: 18,
                color: "black",
                textAlign: "center",
              }}
            >
              Generating conjugations...{" "}
            </Text>
          </View>
        </YStack>
      </>
    );
  } else if ((word ? word.part_of_speech ?? " " : " ") == "num") {
    return (
      <>
        <XStack p="$0">
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={1}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              TYPE
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              cardinal
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              ordinal
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              distributive
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              multiplicative
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              WORD
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ika{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              tag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              (ma)ka
              {word.normal_form}
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              GLOSS
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.translations ? word.translations[0].word : ""}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.translations ? word.translations[0].word : ""}-th
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.translations ? word.translations[0].word : ""} each
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.translations ? word.translations[0].word : ""} times
            </SizableText>
          </YStack>
        </XStack>
      </>
    );
  }
  if ((word ? word.part_of_speech ?? " " : " ") == "v") {
    return (
      <>
        <SizableText>Indicative Singular</SizableText>
        <ScrollView horizontal>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={1}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              {"   "}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              A1
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              A2
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P1
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P2
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P3
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              PAST/PRESENT
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              mi{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              nag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              gi{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              gi{word.suffix_form}an
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              (i)gi
              {word.normal_form}
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              FUTURE/HABITUAL
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              mu{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              mag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.suffix_form}on
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.suffix_form}an
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              i{word.normal_form}
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              IMPERATIVE
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              pag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.suffix_form}a
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              {word.suffix_form}i
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              i{word.normal_form}
            </SizableText>
          </YStack>
        </ScrollView>
        <Separator my="$2"></Separator>
        <SizableText>Indicative Plural</SizableText>
        <ScrollView horizontal>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={1}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              {"   "}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              A1
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              A2
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P1
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P2
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P3
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              PAST/PRESENT
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              na{nasalize(word.normal_form)}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              nanag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              gipa{nasalize(word.normal_form)}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              gipa{nasalize(word.suffix_form ?? " ")}an
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              (i)gipa
              {nasalize(word.normal_form)}
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              FUTURE/HABITUAL
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ma{nasalize(word.normal_form)}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              manag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              pa{nasalize(word.suffix_form ?? " ")}on
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              pa{nasalize(word.suffix_form ?? " ")}an
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ipa{nasalize(word.normal_form)}
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              IMPERATIVE
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              pa{nasalize(word.normal_form)}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              panag
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              pa{nasalize(word.suffix_form ?? " ")}a
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              pa{nasalize(word.suffix_form ?? " ")}i
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ipa{nasalize(word.normal_form)}
            </SizableText>
          </YStack>
        </ScrollView>
        <Separator my="$2"></Separator>
        <SizableText>Potential</SizableText>
        <ScrollView horizontal>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={1}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              {"   "}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              A1
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              A2
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P1
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P2
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
              fontWeight={700}
            >
              P3
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              PAST/PRESENT
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              naka{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              naka(g)
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              na{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              na{word.suffix_form}an
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              na
              {word.normal_form}
            </SizableText>
          </YStack>
          <YStack borderColor="$borderColor" borderWidth="$0.25" flexGrow={2}>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              px="$2"
              py="$1"
              textAlign="center"
              fontWeight={700}
            >
              FUTURE/HABITUAL
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              maka{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              maka(g)
              {(startsWithVowel(word.normal_form) ? "-" : "") +
                word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ma{word.normal_form}
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ma{word.suffix_form}an
            </SizableText>
            <SizableText
              borderColor="$borderColor"
              borderWidth="$0.25"
              p="$1"
              textAlign="center"
            >
              ma{word.normal_form}
            </SizableText>
          </YStack>
        </ScrollView>
      </>
    );
  } else {
    return (
      <SizableText alignSelf="center" m="$5">
        No Conjugations Available
      </SizableText>
    );
  }
}

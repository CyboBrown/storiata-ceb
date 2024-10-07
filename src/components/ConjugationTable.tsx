import { SizableText, XStack, YStack } from "tamagui";
import { Word } from "../models/Word";

export default function ConjugationTable({ word }: { word: Word }) {
  if ((word ? word.part_of_speech ?? " " : " ") == "num") {
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
              {["a", "e", "i", "o", "u"].includes(word.normal_form.charAt(0))
                ? "-" + word.normal_form
                : word.normal_form}
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
  } else {
    return (
      <SizableText alignSelf="center" m="$5">
        No Conjugations Available
      </SizableText>
    );
  }
}

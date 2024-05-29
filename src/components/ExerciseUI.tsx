import { Text, View } from "tamagui";
import { OptionCard } from "./OptionCard";
import { StructuredVocabularyExercise } from "../models/StructuredVocabularyExercise";
import { useState } from "react";

export const VocabularyExerciseUI = ({
  exercise_type,
  exercise,
}: {
  exercise_type: number;
  exercise: StructuredVocabularyExercise | null;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <View
        alignSelf="center"
        jc="flex-start"
        ai="flex-start"
        p="$5"
        gap="$2"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
      >
        <Text fontSize={20}>
          Choose the correct translation for
          <Text fontSize={20} fontWeight={600} color={"$color"}>
            &nbsp;"one"
          </Text>
          .
        </Text>
      </View>
      <View
        paddingVertical="$5"
        width="100%"
        flexDirection="row"
        flexWrap="wrap"
        jc="space-evenly"
        ai="center"
        rowGap="$5"
      >
        <OptionCard
          index={0}
          text={exercise?.item_sets ? exercise?.item_sets[0].ceb_word : "..."}
          representation={
            exercise?.item_sets ? exercise?.item_sets[0].representation : "⛔"
          }
          setSelected={setSelectedIndex}
          selected={selectedIndex == 0}
        />
        <OptionCard
          index={1}
          text={exercise?.item_sets ? exercise?.item_sets[1].ceb_word : "..."}
          representation={
            exercise?.item_sets ? exercise?.item_sets[1].representation : "⛔"
          }
          setSelected={setSelectedIndex}
          selected={selectedIndex == 1}
        />
        <OptionCard
          index={2}
          text={exercise?.item_sets ? exercise?.item_sets[2].ceb_word : "..."}
          representation={
            exercise?.item_sets ? exercise?.item_sets[2].representation : "⛔"
          }
          setSelected={setSelectedIndex}
          selected={selectedIndex == 2}
        />
        <OptionCard
          index={3}
          text={exercise?.item_sets ? exercise?.item_sets[3].ceb_word : "..."}
          representation={
            exercise?.item_sets ? exercise?.item_sets[3].representation : "⛔"
          }
          setSelected={setSelectedIndex}
          selected={selectedIndex == 3}
        />
      </View>
    </>
  );
};

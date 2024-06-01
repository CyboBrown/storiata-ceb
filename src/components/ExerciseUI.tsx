import { Button, Text, View } from "tamagui";
import { OptionCard } from "./OptionCard";
import { StructuredVocabularyExercise } from "../models/StructuredVocabularyExercise";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { randomIndex, shuffleArray } from "../utils/helpers";
import { VocabularyExerciseType } from "../utils/enums";

export const VocabularyExerciseUI = ({
  exercise_type,
  exercise,
}: {
  exercise_type: number;
  exercise: StructuredVocabularyExercise | null;
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [arrangement, setArrangement] = useState<Array<number>>([]);
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState("Submit");
  const [correct, setCorrect] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [randomArray, setRandomArray] = useState<Array<number>>([0, 1, 2, 3]);
  const [reveal, setReveal] = useState<boolean>(false);

  useEffect(() => {
    try {
      console.log(exercise);
      if (exercise) {
        setItemIndex(0);
        setScore(0);
        setArrangement(
          shuffleArray(Array.from(Array(exercise.item_sets?.length).keys()))
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      console.log("Initialization Complete.");
    }
  }, [exercise]);

  useEffect(() => {
    console.log("Previous correct: " + correct);
    const current = randomIndex(4);
    console.log("Current correct: " + current);
    setCorrect(current);
    if (exercise?.item_sets?.length) {
      const allIndices = Array.from(Array(exercise.item_sets.length).keys());
      const filteredIndices = allIndices.filter(
        (index) => index != arrangement[itemIndex]
      );
      const shuffledIndices = shuffleArray(filteredIndices);
      const newRandomArray = shuffledIndices.slice(0, 4);
      setRandomArray(newRandomArray);
    }
  }, [itemIndex]);

  if (exercise_type < 4) {
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
            {itemIndex + 1 + ") "}
            {
              [
                "Choose the correct translation for",
                "Choose the correct translation for",
                "Choose the English equivalent of",
                "Choose the most suitable representation for",
              ][exercise_type]
            }
            <Text fontSize={20} fontWeight={600} color={"$color"}>
              &nbsp;"
              {!(
                exercise?.item_sets &&
                arrangement.length == exercise?.item_sets.length
              ) ||
                [
                  exercise?.item_sets[arrangement[itemIndex]].eng_word,
                  exercise?.item_sets[arrangement[itemIndex]].eng_word,
                  exercise?.item_sets[arrangement[itemIndex]].ceb_word,
                  exercise?.item_sets[arrangement[itemIndex]].ceb_word,
                ][exercise_type]}
              "
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
            text={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 0 ? arrangement[itemIndex] : randomArray[0]
                  ].ceb_word
                : "..."
            }
            representation={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 0 ? arrangement[itemIndex] : randomArray[0]
                  ].representation
                : "⛔"
            }
            setSelected={setSelectedIndex}
            selected={selectedIndex == 0}
            correct={reveal && correct == 0}
            incorrect={reveal && correct != 0 && selectedIndex == 0}
          />
          <OptionCard
            index={1}
            text={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 1 ? arrangement[itemIndex] : randomArray[1]
                  ].ceb_word
                : "..."
            }
            representation={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 1 ? arrangement[itemIndex] : randomArray[1]
                  ].representation
                : "⛔"
            }
            setSelected={setSelectedIndex}
            selected={selectedIndex == 1}
            correct={reveal && correct == 1}
            incorrect={reveal && correct != 1 && selectedIndex == 1}
          />
          <OptionCard
            index={2}
            text={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 2 ? arrangement[itemIndex] : randomArray[2]
                  ].ceb_word
                : "..."
            }
            representation={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 2 ? arrangement[itemIndex] : randomArray[2]
                  ].representation
                : "⛔"
            }
            setSelected={setSelectedIndex}
            selected={selectedIndex == 2}
            correct={reveal && correct == 2}
            incorrect={reveal && correct != 2 && selectedIndex == 2}
          />
          <OptionCard
            index={3}
            text={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 3 ? arrangement[itemIndex] : randomArray[3]
                  ].ceb_word
                : "..."
            }
            representation={
              exercise?.item_sets
                ? exercise?.item_sets[
                    correct == 3 ? arrangement[itemIndex] : randomArray[3]
                  ].representation
                : "⛔"
            }
            setSelected={setSelectedIndex}
            selected={selectedIndex == 3}
            correct={reveal && correct == 3}
            incorrect={reveal && correct != 4 && selectedIndex == 4}
          />
        </View>
        <Button
          alignSelf="center"
          width="90%"
          size="$6"
          onPress={() => {
            if (reveal) {
              setButtonText("Submit");
              setSelectedIndex(-1);
              !(
                exercise?.item_sets &&
                itemIndex < exercise?.item_sets?.length - 1
              ) || setItemIndex(itemIndex + 1);
            } else {
              setButtonText("Next");
              if (selectedIndex == correct) setScore(score + 1);
            }
            setReveal(!reveal);
          }}
          disabled={!reveal && selectedIndex == -1}
        >
          {buttonText}
        </Button>
      </>
    );
  }
};

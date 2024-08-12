import {
  Button,
  Input,
  Progress,
  SizableText,
  Spacer,
  Text,
  TextArea,
  View,
  YStack,
} from "tamagui";
import { OptionCard } from "./OptionCard";
import { VocabularyExercise } from "../models/VocabularyExercise";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  randomIndex,
  replacePlaceholders,
  shuffleArray,
} from "../utils/helpers";
import { Link } from "expo-router";
import { GrammarExercise } from "../models/GrammarExercise";
import {
  compareCebuanoSentences,
  compareCebuanoWords,
  compareEnglishSentences,
  compareEnglishWords,
} from "../utils/compare";
import { ExerciseService } from "../services/ExerciseService";
import { red } from "@tamagui/themes";

export const VocabularyExerciseUI = ({
  exercise_id,
  exercise_type,
  exercise,
}: {
  exercise_id: number;
  exercise_type: number;
  exercise: VocabularyExercise | null;
}) => {
  const DEBUG_USER_UUID = "3ad19072-1877-415d-bf5e-61c4bfe03977";
  const [itemIndex, setItemIndex] = useState(0); // Current exercise item number
  const [arrangement, setArrangement] = useState<Array<number>>([]);
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState("Submit");
  const [correct, setCorrect] = useState(-1);
  const [incorrect, setIncorrect] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [randomArray, setRandomArray] = useState<Array<number>>([0, 1, 2, 3]);
  const [reveal, setReveal] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [rendered, setRendered] = useState<boolean>(false); // Checks if page has been rendered
  const [input, setInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("error");

  const [wrongWords, setWrongWords] = useState<string[]>([]);

  useEffect(() => {
    let arrangement_temp = arrangement;
    if (!rendered) {
      try {
        console.log(exercise);
        if (exercise) {
          setItemIndex(0);
          setScore(0);
          arrangement_temp = shuffleArray(
            Array.from(Array(exercise.item_sets?.length).keys())
          );
          setArrangement(arrangement_temp);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        console.log("Initialization Complete.");
        setRendered(true);
      }
    }
    // console.log("Previous correct: " + correct);
    if (exercise_type < 4) {
      const current = randomIndex(4);
      console.log("Current correct: " + current);
      setCorrect(current);
    } else if (exercise_type == 4) {
      setCorrect(-1);
      setCorrectAnswer(
        exercise && exercise.item_sets
          ? exercise?.item_sets[arrangement_temp[itemIndex]].ceb_word
          : "~*~*~*~"
      );
    } else if (exercise_type == 5) {
      setCorrect(-1);
      setCorrectAnswer(
        exercise && exercise.item_sets
          ? exercise?.item_sets[arrangement[itemIndex]].eng_word
          : "~*~*~*~"
      );
    }
    if (exercise?.item_sets?.length) {
      const allIndices = Array.from(Array(exercise.item_sets.length).keys()); // Generates an array of numbers from 0 to size -1
      const filteredIndices = allIndices.filter(
        // Filters the array of numbers that does not include the current item number
        (index) =>
          arrangement_temp == null
            ? index != arrangement[itemIndex]
            : index != arrangement_temp[itemIndex]
      );
      // console.log(
      //   "~*~*~*~*~*~*~*~*~* " + test + " ~*~*~*~*~*~*~*~*~*"
      // );
      const shuffledIndices = shuffleArray(filteredIndices); // Shuffles the filtered array and selects the first four elements
      const newRandomArray = shuffledIndices.slice(0, 4);
      setRandomArray(newRandomArray);
    }
  }, [itemIndex]);

  const handleSubmit = () => {
    if (reveal) {
      console.log("Score: " + score + "/" + exercise?.item_sets?.length);
      setButtonText("Submit");
      if (exercise_type < 4) {
        setSelectedIndex(-1);
      } else {
        setInput("");
      }
      if (exercise?.item_sets && itemIndex < exercise?.item_sets?.length - 1) {
        // If not last item, proceed to next item
        setItemIndex(itemIndex + 1);
      } else {
        // Else proceed to results
        setFinished(true);
      }
    } else {
      setButtonText("Next");
      if (exercise_type < 4) {
        if (selectedIndex == correct) setScore(score + 1);
      } else if (exercise_type == 4) {
        console.log(input + " =? " + correctAnswer);
        console.log(compareCebuanoWords(input, correctAnswer));
        if (compareCebuanoWords(input, correctAnswer)) {
          setScore(score + 1);
          setCorrect(1);
        }
      } else if (exercise_type == 5) {
        if (compareEnglishWords(input, correctAnswer)) {
          setScore(score + 1);
          setCorrect(1);
        }
      }
      if (selectedIndex == correct) {
        setScore(score + 1);
        const correct_word = exercise?.item_sets?.at(
          arrangement[itemIndex]
        )?.ceb_word;

        // Revert mistake points from this word, if there was any.
        if (correct_word) {
          ExerciseService.trackCorrectWord(
            exercise_id,
            correct_word,
            DEBUG_USER_UUID
          );
        } else {
          console.error("The correct word is undefined, cannot track.");
        }
      } else {
        if (incorrect >= 3) setHasFailed(true);
        const wrongWord = exercise?.item_sets?.at(
          arrangement[itemIndex]
        )?.ceb_word;
        setWrongWords((prevWords) => {
          return wrongWord ? [...prevWords, wrongWord] : prevWords;
        });
        setIncorrect(incorrect + 1);

        // Push updates to DB regarding this mistake.
        if (wrongWord) {
          ExerciseService.trackWrongWord(
            exercise_id,
            wrongWord,
            DEBUG_USER_UUID
          );
        } else {
          console.error("The wrong word is undefined, cannot track.");
        }
      }
    }
    setReveal(!reveal);
  };

  const getText = (index: number) =>
    exercise?.item_sets
      ? [
          exercise?.item_sets[
            correct === index ? arrangement[itemIndex] : randomArray[index]
          ].ceb_word,
          exercise?.item_sets[
            correct === index ? arrangement[itemIndex] : randomArray[index]
          ].ceb_word,
          exercise?.item_sets[
            correct === index ? arrangement[itemIndex] : randomArray[index]
          ].eng_word,
          "",
        ][exercise_type]
      : "...";

  const getRepresentation = (index: number) =>
    exercise?.item_sets
      ? [
          exercise?.item_sets[
            correct === index ? arrangement[itemIndex] : randomArray[index]
          ].representation,
          "",
          "",
          exercise?.item_sets[
            correct === index ? arrangement[itemIndex] : randomArray[index]
          ].representation,
        ][exercise_type]
      : "⛔";

  const optionCards = [0, 1, 2, 3].map((index) => (
    <OptionCard
      key={index}
      index={index}
      text={getText(index)}
      representation={getRepresentation(index)}
      setSelected={setSelectedIndex}
      selected={selectedIndex === index}
      correct={reveal && correct === index}
      incorrect={reveal && correct !== index && selectedIndex === index}
      disabled={reveal}
    />
  ));

  const inputBar = (
    <>
      <Input
        size={"$5"}
        placeholder={"Type here..."}
        p="$5"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
        fontSize={20}
        minHeight={"$8"}
        value={input}
        disabled={reveal}
        backgroundColor={
          reveal ? (correct == 1 ? "$green7" : "$red7") : "unset"
        }
        onChangeText={(input) => setInput(input)}
      />
      <YStack
        jc="flex-start"
        ai="center"
        p="$5"
        gap="$2"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
        backgroundColor={"$green7"}
        display={reveal ? "unset" : "none"}
      >
        <Text
          fontSize={20}
          fontWeight={800}
          color={"$color"}
          alignSelf="flex-start"
        >
          Correct Answer:
        </Text>
        <Text
          fontSize={20}
          fontWeight={400}
          color={"$color"}
          alignSelf="flex-start"
        >
          {correctAnswer}
        </Text>
      </YStack>
    </>
  );

  if (finished) {
    // Show results if finished.

    // Increment level if passed and don't otherwise:
    if (incorrect >= 3) {
      console.log("YOU ARE A FAILURE!!!!");
    } else {
      ExerciseService.incrementUserExerciseProgress(
        exercise_id,
        "3ad19072-1877-415d-bf5e-61c4bfe03977"
      );
    }

    return (
      <>
        <View
          alignSelf="center"
          jc="flex-start"
          ai="flex-start"
          p="$4"
          my="$5"
          gap="$2"
          //borderColor={"$color5"}
          //borderRadius="$5"
          //borderWidth="$1"
          width="90%"
        >
          <SizableText
            alignSelf="center"
            fontSize={28}
            lineHeight={32}
            fontWeight={900}
          >
            YOUR FINAL SCORE
          </SizableText>

          <SizableText
            alignSelf="center"
            fontSize={32}
            lineHeight={32}
            color={hasFailed ? "$red10Light" : "$green10Light"}
          >
            {score + " / " + exercise?.item_sets?.length}
          </SizableText>

          <Spacer></Spacer>

          {hasFailed && (
            <SizableText
              alignSelf="center"
              textAlign="center"
              fontSize={12}
              lineHeight={13}
              color={hasFailed ? "$red10Light" : "$green10Light"}
            >
              Your efforts were recognized but weren't enough to pass the
              exercise. Let's try again, shall we?
            </SizableText>
          )}

          {incorrect > 0 && (
            <>
              <Spacer></Spacer>
              <SizableText
                alignSelf="center"
                textAlign="center"
                fontSize={16}
                lineHeight={16}
                fontWeight={700}
              >
                INCORRECT WORDS:
              </SizableText>

              <SizableText
                alignSelf="center"
                textAlign="center"
                fontSize={13}
                lineHeight={13}
              >
                {wrongWords.join(", ")}
              </SizableText>
            </>
          )}
        </View>
        <Link href="/exercises/vocabulary" asChild>
          <Button alignSelf="center" width="90%" size="$6">
            Return
          </Button>
        </Link>
      </>
    );
  } else {
    // Show problems if not yet finished
    if (exercise_type < 6) {
      return (
        <>
          <Progress
            size="$2"
            value={((itemIndex + 1) / arrangement.length) * 100}
            m="$5"
            width="90%"
            alignSelf="center"
          >
            <Progress.Indicator animation="bouncy" />
          </Progress>
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
                  "Input the correct translation for",
                  "Input the English equivalent of",
                ][exercise_type]
              }
              <Text fontSize={20} fontWeight={600} color={"$color"}>
                &nbsp;"
                {!(
                  exercise?.item_sets &&
                  arrangement.length === exercise?.item_sets.length
                ) ||
                  [
                    exercise?.item_sets[arrangement[itemIndex]].eng_word,
                    exercise?.item_sets[arrangement[itemIndex]].eng_word,
                    exercise?.item_sets[arrangement[itemIndex]].ceb_word,
                    exercise?.item_sets[arrangement[itemIndex]].ceb_word,
                    exercise?.item_sets[arrangement[itemIndex]].eng_word,
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
            {exercise_type < 4 ? optionCards : inputBar}
          </View>
          <Button
            alignSelf="center"
            width="90%"
            size="$6"
            onPress={handleSubmit}
            disabled={
              !reveal && selectedIndex === -1 && (input === "" || input === " ")
            }
          >
            {buttonText}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <View
            alignSelf="center"
            jc="flex-start"
            ai="flex-start"
            p="$5"
            my="$5"
            gap="$2"
            borderColor={"$color5"}
            borderRadius="$5"
            borderWidth="$1"
            width="90%"
          >
            <Text fontSize={20}>Invalid exercise type.</Text>
          </View>
          <Link href="/exercises/vocabulary" asChild>
            <Button alignSelf="center" width="90%" size="$6">
              Return
            </Button>
          </Link>
        </>
      );
    }
  }
};

// Not yet implemented
export const GrammarExerciseUI = ({
  exercise_type,
  exercise,
}: {
  exercise_type: number;
  exercise: GrammarExercise | null;
}) => {
  const [itemIndex, setItemIndex] = useState(0); // Current exercise item number
  const [arrangement, setArrangement] = useState<Array<number>>([]);
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState("Submit");
  const [correct, setCorrect] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [randomArray, setRandomArray] = useState<Array<number>>([0, 1, 2, 3]);
  const [reveal, setReveal] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [rendered, setRendered] = useState<boolean>(false); // Checks if page has been rendered
  const [input, setInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("error");
  const [questionDisplay, setQuestionDisplay] = useState("");
  const [options, setOptions] = useState<Array<string>>([]);

  useEffect(() => {
    let arrangement_temp = arrangement;
    let newRandomArray = [];
    if (!rendered) {
      try {
        console.log(exercise);
        if (exercise) {
          setItemIndex(0);
          setScore(0);
          arrangement_temp = shuffleArray(
            Array.from(Array(exercise.item_sets?.length).keys())
          );
          setArrangement(arrangement_temp);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        console.log("Initialization Complete.");
        setRendered(true);
      }
    }
    if (exercise?.item_sets?.length) {
      const allIndices = Array.from(Array(exercise.item_sets.length).keys()); // Generates an array of numbers from 0 to size - 1
      const filteredIndices = allIndices.filter(
        // Filters the array of numbers that does not include the current item number
        (index) =>
          arrangement_temp == null
            ? index != arrangement[itemIndex]
            : index != arrangement_temp[itemIndex]
      );
      // console.log(
      //   "~*~*~*~*~*~*~*~*~* " + test + " ~*~*~*~*~*~*~*~*~*"
      // );
      const shuffledIndices = shuffleArray(filteredIndices); // Shuffles the filtered array and selects the first four elements
      newRandomArray = shuffledIndices.slice(0, 4);
      setRandomArray(newRandomArray);
    }
    const sentences = generateSentences({
      en:
        exercise && exercise.item_sets
          ? exercise?.item_sets[arrangement_temp[itemIndex]].translated_sentence
          : "~*~*~*~",
      ceb:
        exercise && exercise.item_sets
          ? exercise?.item_sets[arrangement_temp[itemIndex]].sentence
          : "~*~*~*~",
    });
    if (exercise_type < 2) {
      const current = randomIndex(4);
      console.log("Current correct: " + current);
      setCorrect(current);
      setQuestionDisplay(exercise_type == 0 ? sentences.en : sentences.ceb);
      setCorrectAnswer(exercise_type == 0 ? sentences.ceb : sentences.en);
      setOptions(
        [0, 1, 2, 3].map((index) =>
          exercise_type == 0
            ? generateSentences({
                en: "",
                ceb: exercise?.item_sets
                  ? exercise?.item_sets[
                      current === index
                        ? arrangement_temp[itemIndex]
                        : newRandomArray[index]
                    ].sentence
                  : "",
              }).ceb
            : generateSentences({
                en: exercise?.item_sets
                  ? exercise?.item_sets[
                      current === index
                        ? arrangement_temp[itemIndex]
                        : newRandomArray[index]
                    ].translated_sentence
                  : "",
                ceb: "",
              }).en
        )
      );
      // correct === index ? correctAnswer : options[index],
      //     exercise?.item_sets[
      //       correct === index ? arrangement[itemIndex] : randomArray[index]
      //     ].translated_sentence,
    } else if (exercise_type < 6) {
      setCorrect(-1);
      setQuestionDisplay(exercise_type % 2 == 0 ? sentences.en : sentences.ceb);
      setCorrectAnswer(exercise_type % 2 == 0 ? sentences.ceb : sentences.en);
    }
  }, [itemIndex]);

  const handleSubmit = () => {
    if (reveal) {
      console.log("Score: " + score + "/" + exercise?.item_sets?.length);
      setButtonText("Submit");
      if (exercise_type < 2) {
        setSelectedIndex(-1);
      } else {
        setInput("");
      }
      if (exercise?.item_sets && itemIndex < exercise?.item_sets?.length - 1) {
        // If not last item, proceed to next item
        setItemIndex(itemIndex + 1);
      } else {
        // Else proceed to results
        setFinished(true);
      }
    } else {
      setButtonText("Next");
      if (exercise_type < 2) {
        if (selectedIndex == correct) setScore(score + 1);
      } else if (exercise_type == 2) {
        if (compareCebuanoWords(input, correctAnswer)) {
          setScore(score + 1);
          setCorrect(1);
        }
      } else if (exercise_type == 3) {
        if (compareEnglishWords(input, correctAnswer)) {
          setScore(score + 1);
          setCorrect(1);
        }
      } else if (exercise_type == 4) {
        console.log(input + " =? " + correctAnswer);
        console.log(compareCebuanoSentences(input, correctAnswer));
        if (compareCebuanoSentences(input, correctAnswer)) {
          setScore(score + 1);
          setCorrect(1);
        }
      } else if (exercise_type == 5) {
        if (compareEnglishSentences(input, correctAnswer)) {
          setScore(score + 1);
          setCorrect(1);
        }
      }
    }
    setReveal(!reveal);
  };

  // const generateSentences = (sentence: {
  //   en: string;
  //   ceb: string;
  // }): { en: string; ceb: string } => {
  //   const placeholders = extractPlaceholders(sentence.en);
  //   const values = {
  //     time_of_day: [
  //       { en: "morning", ceb: "buntag" },
  //       { en: "afternoon", ceb: "hapon" },
  //       { en: "evening", ceb: "gabii" },
  //     ],
  //     name: [
  //       { en: "Juan", ceb: "Juan" },
  //       { en: "Maria", ceb: "Maria" },
  //       { en: "Carlos", ceb: "Carlos" },
  //       { en: "Anna", ceb: "Anna" },
  //     ],
  //   };
  //   const newSentence: { en: string; ceb: string } = replacePlaceholders(
  //     sentence,
  //     values
  //   );
  //   console.log(placeholders);
  //   console.log(newSentence);
  //   return newSentence;
  // };

  const generateSentences = (sentence: {
    en: string;
    ceb: string;
  }): { en: string; ceb: string } => {
    const values = {
      time_of_day: [
        { en: "morning", ceb: "buntag" },
        { en: "afternoon", ceb: "hapon" },
        { en: "evening", ceb: "gabii" },
      ],
      name: [
        { en: "Juan", ceb: "Juan" },
        { en: "Maria", ceb: "Maria" },
        { en: "Carlos", ceb: "Carlos" },
        { en: "Anna", ceb: "Anna" },
      ],
    };
    const newSentence: { en: string; ceb: string } = replacePlaceholders(
      sentence,
      values
    );
    console.log(newSentence);
    return newSentence;
  };

  const getText = (index: number) =>
    exercise?.item_sets
      ? [
          correct === index ? correctAnswer : options[index],
          correct === index ? correctAnswer : options[index],
          "",
          "",
          "",
          "",
          exercise?.item_sets[
            correct === index ? arrangement[itemIndex] : randomArray[index]
          ].translated_sentence,
        ][exercise_type]
      : "...";

  const getRepresentation = (index: number) =>
    exercise?.item_sets ? ["", "", "", "", "", ""][exercise_type] : "⛔";

  const optionCards = [0, 1, 2, 3].map((index) => (
    <OptionCard
      key={index}
      index={index}
      text={getText(index)}
      representation={getRepresentation(index)}
      setSelected={setSelectedIndex}
      selected={selectedIndex === index}
      correct={reveal && correct === index}
      incorrect={reveal && correct !== index && selectedIndex === index}
      disabled={reveal}
      lengthy
    />
  ));

  const fillBar = (
    <>
      <Input
        size={"$5"}
        placeholder={"Type here..."}
        p="$5"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
        fontSize={20}
        minHeight={"$8"}
        value={input}
        disabled={reveal}
        backgroundColor={
          reveal ? (correct == 1 ? "$green7" : "$red7") : "unset"
        }
        onChangeText={(input) => setInput(input)}
      />
      <YStack
        jc="flex-start"
        ai="center"
        p="$5"
        gap="$2"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
        backgroundColor={"$green7"}
        display={reveal ? "unset" : "none"}
      >
        <Text
          fontSize={20}
          fontWeight={800}
          color={"$color"}
          alignSelf="flex-start"
        >
          Correct Answer:
        </Text>
        <Text
          fontSize={20}
          fontWeight={400}
          color={"$color"}
          alignSelf="flex-start"
        >
          {correctAnswer}
        </Text>
      </YStack>
    </>
  );

  const inputBar = (
    <>
      <TextArea
        size={"$5"}
        placeholder={"Type here..."}
        p="$5"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
        fontSize={20}
        minHeight={"$8"}
        value={input}
        disabled={reveal}
        backgroundColor={
          reveal ? (correct == 1 ? "$green7" : "$red7") : "unset"
        }
        onChangeText={(input) => setInput(input)}
      />
      <YStack
        jc="flex-start"
        ai="center"
        p="$5"
        gap="$2"
        borderColor={"$color5"}
        borderRadius="$5"
        borderWidth="$1"
        width="90%"
        backgroundColor={"$green7"}
        display={reveal ? "unset" : "none"}
      >
        <Text
          fontSize={20}
          fontWeight={800}
          color={"$color"}
          alignSelf="flex-start"
        >
          Correct Answer:
        </Text>
        <Text
          fontSize={20}
          fontWeight={400}
          color={"$color"}
          alignSelf="flex-start"
        >
          {correctAnswer}
        </Text>
      </YStack>
    </>
  );

  if (finished) {
    // Show results if finished
    return (
      <>
        <View
          alignSelf="center"
          jc="flex-start"
          ai="flex-start"
          p="$5"
          my="$5"
          gap="$2"
          borderColor={"$color5"}
          borderRadius="$5"
          borderWidth="$1"
          width="90%"
        >
          <Text fontSize={20}>
            {"Score: " + score + "/" + exercise?.item_sets?.length}
          </Text>
        </View>
        <Link href="/exercises/grammar" asChild>
          <Button alignSelf="center" width="90%" size="$6">
            Return
          </Button>
        </Link>
      </>
    );
  } else {
    // Show problems if not yet finished
    if (exercise_type < 6) {
      return (
        <>
          <Progress
            size="$2"
            value={((itemIndex + 1) / arrangement.length) * 100}
            m="$5"
            width="90%"
            alignSelf="center"
          >
            <Progress.Indicator animation="bouncy" />
          </Progress>
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
                  "Fill the missing word to complete the translation of",
                  "Fill the missing word to complete the translation of",
                  "Input the correct translation for",
                  "Input the English equivalent of",
                ][exercise_type]
              }
              <Text fontSize={20} fontWeight={600} color={"$color"}>
                &nbsp;"
                {questionDisplay}
                {/*!(
                  exercise?.item_sets &&
                  arrangement.length === exercise?.item_sets.length
                ) ||
                  [
                    exercise?.item_sets[arrangement[itemIndex]]
                      .translated_sentence,
                    exercise?.item_sets[arrangement[itemIndex]].sentence,
                    exercise?.item_sets[arrangement[itemIndex]]
                      .translated_sentence,
                    exercise?.item_sets[arrangement[itemIndex]].sentence,
                    exercise?.item_sets[arrangement[itemIndex]]
                      .translated_sentence,
                    exercise?.item_sets[arrangement[itemIndex]].sentence,
                  ][exercise_type]*/}
                "
              </Text>
            </Text>
          </View>
          <View
            paddingVertical="$5"
            width="100%"
            flexDirection="row"
            flexWrap="wrap"
            jc="space-evenly"
            ai="center"
            rowGap="$2"
          >
            {exercise_type < 2 ? optionCards : inputBar}
          </View>
          <Button
            alignSelf="center"
            width="90%"
            size="$6"
            onPress={handleSubmit}
            disabled={
              !reveal && selectedIndex === -1 && (input === "" || input === " ")
            }
          >
            {buttonText}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <View
            alignSelf="center"
            jc="flex-start"
            ai="flex-start"
            p="$5"
            my="$5"
            gap="$2"
            borderColor={"$color5"}
            borderRadius="$5"
            borderWidth="$1"
            width="90%"
          >
            <Text fontSize={20}>Invalid exercise type.</Text>
          </View>
          <Link href="/exercises/grammar" asChild>
            <Button alignSelf="center" width="90%" size="$6">
              Return
            </Button>
          </Link>
        </>
      );
    }
  }
};

import { Session } from "@supabase/supabase-js";
import {
  Button,
  H5,
  Paragraph,
  View,
  YStack,
  Text,
  ScrollView,
  Card,
  CardBackground,
  CardFooter,
  CardHeader,
  XStack,
  YGroup,
  Separator,
  Spacer,
} from "tamagui";
import { useEffect, useState } from "react";
import LessonCard from "../../src/components/LessonCard";
import { ExercisePopover } from "../../src/components/ExercisePopover";
import { ExerciseTypes } from "../../src/utils/enums";
import { Exercise } from "../../src/models/Exercise";
import { ExerciseService } from "../../src/services/ExerciseService";

export default function Dashboard({ session }: { session: Session }) {
  const DEBUG_USER_UUID = "3ad19072-1877-415d-bf5e-61c4bfe03977";
  const [results, setResults] = useState<Exercise[]>([]);
  const [exerCompleted, setExerCompleted] = useState(0);
  const [wordsMistaken, setWordsMistaken] = useState(0);
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("USER_DASHBOARD page loaded.");
    loadAllExercises();
    loadAllExerCompleted();
    loadAllMistakenWords();
  }, []);

  const loadAllExercises = async () => {
    let data = await ExerciseService.getAllExercisesByType(
      ExerciseTypes.Vocabulary
    );
    if (data) {
      setResults(data);
    }
  };

  const loadAllExerCompleted = async () => {
    const data = await ExerciseService.getExercisesCompleted(DEBUG_USER_UUID);
    if (typeof data === "number") {
      setExerCompleted(data);
    }
  };

  const loadAllMistakenWords = async () => {
    const data = await ExerciseService.getTotalMistakesCount(DEBUG_USER_UUID);
    if (typeof data === "number") {
      setWordsMistaken(data);
    }
  };

  return (
    <View justifyContent="center" alignItems="center">
      <View justifyContent="center" alignItems="center">
        <Text color={"$color"} fontSize={"$10"}>
          {" "}
          STORIATA{" "}
        </Text>
      </View>
      <ScrollView marginBottom="$5">
        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Card elevate height={"$15"} bordered>
            <CardHeader padded>
              <Text color={"$color"} fontSize={26}>
                StoriaTa Exercises{" "}
              </Text>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>
                  Exercises Completed:{" "}
                </Text>
                <Text color={"$color"} fontSize={"$7"}>
                  {exerCompleted}
                </Text>
              </XStack>
              <XStack marginTop={"$3"}>
                <Text color={"$color"} fontSize={"$7"} flex={1}>
                  Total of Words Mistaken:{" "}
                </Text>
                <Text color={"$color"} fontSize={"$7"}>
                  {wordsMistaken}
                </Text>
              </XStack>
            </CardHeader>
            <CardFooter padded></CardFooter>
            <CardBackground></CardBackground>
          </Card>
        </View>
        <View marginStart="$2" marginTop="$3" marginEnd="$2">
          <Card elevate bordered height={500}>
            <CardHeader padded>
              <Text color={"$color"} fontSize={25}>
                Explore More Exercises
              </Text>
              <Text color={"$color"} fontSize={20}>
                To expand your skills in...
              </Text>
              <Spacer></Spacer>
              <YGroup
                alignSelf="center"
                bordered
                size="$5"
                separator={<Separator />}
              >
                {results.map((result, index) => (
                  <ExercisePopover
                    user="3ad19072-1877-415d-bf5e-61c4bfe03977"
                    title={result.topic}
                    subTitle={result.description}
                    index={result.id}
                    exerciseType={ExerciseTypes.Vocabulary}
                    key={result.id}
                  />
                ))}
              </YGroup>
            </CardHeader>

            <CardBackground></CardBackground>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

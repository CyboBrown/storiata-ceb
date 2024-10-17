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
import LessonCard from "../../../src/components/LessonCard";
import { ExercisePopover } from "../../../src/components/ExercisePopover";
import { ExerciseTypes } from "../../../src/utils/enums";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";

export default function Dashboard() {
  const DEBUG_USER_UUID = "ebabaa6c-4254-465e-9f2f-f285a2364277";
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
    let data = await ExerciseService.getAllExercises();
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
    <Text>Wow</Text>
  );
}

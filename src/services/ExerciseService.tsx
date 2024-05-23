import { supabase } from "../utils/supabase";

export class ExerciseService {
  public static getAllVocabularyExercises = async () => {
    console.log("GOT_ALL_VOCABULARY_EXERCISES");
    const { data, error, status } = await supabase
      .from("vocabulary_exercises")
      .select(`*`)
      .order("topic", { ascending: true });
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };
}

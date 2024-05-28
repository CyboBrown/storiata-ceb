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

  public static getVocabularyExerciseDetails = async (id: number) => {
    console.log("GOT_VOCABULARY_EXERCISE_DETAILS");
    const { data, error, status } = await supabase
      .from("vocabulary_exercises")
      .select(`*`)
      .eq("id", id)
      .single();
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };

  public static getVocabularyExerciseProblems = async (id: number) => {
    console.log("GOT_VOCABULARY_EXERCISE_PROBLEMS");
    const { data, error, status } = await supabase
      .from("vocabulary_exercise_words")
      .select(
        `id, exercise_id, word_translations(words(normal_form, phonetic_form, representation, part_of_speech), translations(word))`
      )
      .eq("exercise_id", id);
    // .order("id", { ascending: true })
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };
}

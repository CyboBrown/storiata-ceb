import { supabase } from "../utils/supabase";

export class ExerciseService {
  public static getAllExercisesByType = async (type: number) => {
    console.log("GOT_ALL_EXERCISES");
    const { data, error, status } = await supabase
      .from("exercises")
      .select(`*`)
      .eq("type", type)
      .order("topic", { ascending: true });
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };

  public static getExerciseDetails = async (id: number) => {
    console.log("GOT_EXERCISE_DETAILS");
    const { data, error, status } = await supabase
      .from("exercises")
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
      .from("exercise_words")
      .select(
        `id, exercise_id, word_id, word_translations(words(normal_form, phonetic_form, representation, part_of_speech), translations(word))`
      )
      .eq("exercise_id", id);
    // .order("id", { ascending: true })
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };

  // ***
  public static getVocabularyExerciseProgress = async (
    user_id: string,
    exercise_id: number
  ) => {
    console.log("GOT_VOCABULARY_EXERCISE_PROGRESS");
    // const { data, error, status } = await supabase
    //   .from("vocabulary_exercise_words")
    //   .select(
    //     `id, exercise_id, word_translations(words(normal_form, phonetic_form, representation, part_of_speech), translations(word))`
    //   )
    //   .eq("exercise_id", id);
    // // .order("id", { ascending: true })
    // if (error && status !== 406) {
    //   console.log(error);
    // }
    // return data;
  };
}

import { Exercise } from "../models/Exercise";
import { GrammarExercise } from "../models/GrammarExercise";
import { VocabularyExercise } from "../models/VocabularyExercise";
import {
  structurizeGrammarExercise,
  structurizeVocabularyExercise,
} from "../utils/structurize";
import { supabase } from "../utils/supabase";

export class ExerciseService {
  public static getAllExercisesByType = async (type: number) => {
    console.log("GOT_ALL_EXERCISES_" + type);
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

  public static getGrammarExerciseProblems = async (id: number) => {
    console.log("GOT_GRAMMAR_EXERCISE_PROBLEMS");
    const { data, error, status } = await supabase
      .from("exercise_sentences")
      .select(
        `
        id,
        exercise_id,
        sentence_id,
        sentence_pairs(
          sentence,
          translated_sentence,
          sentence_words(
            role,
            word_translations(
              words(
                normal_form,  
                suffix_form,
                part_of_speech
              ),
              translations(
                word,
                part_of_speech
              )
            )
          )
        )
        `
      )
      .eq("exercise_id", id);
    const {
      data: words,
      error: error_words,
      status: status_words,
    } = await supabase
      .from("exercise_words")
      .select(
        `id, exercise_id, word_id, role, word_translations(words(normal_form, suffix_form, part_of_speech), translations(word, part_of_speech))`
      )
      .eq("exercise_id", id);
    // .order("id", { ascending: true })
    if (error && status !== 406) {
      console.log(error);
    }
    if (error_words && status_words !== 406) {
      console.log(error);
    }
    let details = (await ExerciseService.getExerciseDetails(id)) as Exercise;
    if (data) {
      const problems: GrammarExercise | null = structurizeGrammarExercise(
        details,
        data,
        words
      );
      // console.log("Details: " + details);
      // console.log("Data: " + data);
      // console.log("Problems: " + problems);
      return problems;
    }
    return null;
  };

  // ***
  public static getListeningExerciseProblems = async (id: number) => {
    console.log("GOT_LISTENING_EXERCISE_PROBLEMS");
    return null;
  };

  // ***
  public static getSpeakingExerciseProblems = async (id: number) => {
    console.log("GOT_SPEAKING_EXERCISE_PROBLEMS");
    return null;
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
    let details = (await ExerciseService.getExerciseDetails(id)) as Exercise;
    if (data) {
      const problems: VocabularyExercise | null = structurizeVocabularyExercise(
        details,
        data
      );
      // console.log("Details: " + details);
      // console.log("Data: " + data);
      // console.log("Problems: " + problems);
      return problems;
    }
    return null;
  };

  // ***
  public static updateExerciseDetails = async (exercise: Exercise) => {
    console.log("UPDATED_EXERCISE_DETAILS");
    return null;
  };

  // ***
  public static createExercise = async (exercise: Exercise) => {
    console.log("CREATED_EXERCISE");
    return null;
  };

  // ***
  public static deleteExercise = async (id: number) => {
    console.log("DELETED_EXERCISE");
  };

  // ***
  // public static getVocabularyExerciseProgress = async (
  //   user_id: string,
  //   exercise_id: number
  // ) => {
  //   console.log("GOT_VOCABULARY_EXERCISE_PROGRESS");
  //   // const { data, error, status } = await supabase
  //   //   .from("vocabulary_exercise_words")
  //   //   .select(
  //   //     `id, exercise_id, word_translations(words(normal_form, phonetic_form, representation, part_of_speech), translations(word))`
  //   //   )
  //   //   .eq("exercise_id", id);
  //   // // .order("id", { ascending: true })
  //   // if (error && status !== 406) {
  //   //   console.log(error);
  //   // }
  //   // return data;
  // };
}

import { Exercise } from "../models/Exercise";
import { GrammarExercise } from "../models/GrammarExercise";
import { VocabularyExercise } from "../models/VocabularyExercise";
import {
  structurizeGrammarExercise,
  structurizeVocabularyExercise,
} from "../utils/structurize";
import { VocabularyExerciseType } from "../utils/enums";
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

  public static getVocabularyExerciseType = async (
    exer_id: number,
    user_uuid: string
  ) => {
    try {
      let exerTypeInInt = 0;
      const { data, error, status } = await supabase
        .from("user_exercises")
        .select(`level`)
        .eq("exercise_id", exer_id)
        .eq("user_id", user_uuid)
        .single();

      if (status === 406) {
        console.log("No entry, assume user has not accessed the exercise yet.");
        return VocabularyExerciseType.ChooseCebRepresentationForEngWord;
      }

      // You have no fucking idea how this shit is making me want to shoot up a fucking place.
      // Enjoy this scotch-tape solution for now cuz I ain't touching this shit in the near future.
      const vocabTypeMap: VocabularyExerciseType[] = [
        VocabularyExerciseType.ChooseCebRepresentationForEngWord,
        VocabularyExerciseType.ChooseCebWordForEngWord,
        VocabularyExerciseType.ChooseEngWordForCebWord,
        VocabularyExerciseType.ChooseRepresentationForCebWord,
      ];

      if (data && data.level) exerTypeInInt = data.level % 5;
      return vocabTypeMap[exerTypeInInt];
    } catch (error) {
      console.log("EXER_TYPE_ERROR: ", error);
      return VocabularyExerciseType.ChooseCebRepresentationForEngWord;
    }
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

  // **********************************************************
  // Tracking progression levels in exercises.
  // EXPERIMENTAL USE IN EXERCISEPOPOVER.TSX
  public static hasUserAccessedExercise = async (
    exer_id: number,
    user_uuid: string
  ) => {
    try {
      const { data, error, status } = await supabase
        .from("user_exercises")
        .select(`*`)
        .eq("exercise_id", exer_id)
        .eq("user_id", user_uuid)
        .single();

      if (status === 406) this.pushInitUserExerciseProgress(exer_id, user_uuid);
    } catch (error) {
      console.log("EXER_ACCESS_CHECK_ERROR: ", error);
    }
  };

  // what?
  public static hasUserAccessedExerciseNoAction = async (
    exer_id: number,
    user_uuid: string
  ) => {
    try {
      const { data, error, status } = await supabase
        .from("user_exercises")
        .select(`*`)
        .eq("exercise_id", exer_id)
        .eq("user_id", user_uuid)
        .single();

      if (status === 406) return false;
      return true;
    } catch (error) {
      console.log("EXER_ACCESS_CHECK_ERROR: ", error);
    }
  };

  public static pushInitUserExerciseProgress = async (
    exer_id: number,
    user_uuid: string
  ) => {
    try {
      const { data, error } = await supabase.from("user_exercises").insert([
        {
          exercise_id: exer_id,
          level: 0,
          user_id: user_uuid,
        },
      ]);
    } catch (error) {
      console.log("INIT_PROGRESS_ERROR: ", error);
    }
  };

  public static updateUserExerciseProgress = async (
    user_uuid: string,
    new_level: number
  ) => {
    try {
      const { data, error } = await supabase
        .from("user_exercises")
        .update({ level: new_level })
        .eq("user_id", user_uuid);
    } catch (error) {
      console.log("LEVEL_UPDATE_ERROR: ", error);
    }
  };

  public static incrementUserExerciseProgress = async (
    exer_id: number,
    user_uuid: string
  ) => {
    try {
      let new_level = 0;
      // Fetch the current level
      const { data, error, status } = await supabase
        .from("user_exercises")
        .select(`level`)
        .eq("exercise_id", exer_id)
        .eq("user_id", user_uuid)
        .single();

      if (error && status !== 406) {
        console.log("Error fetching user exercise level: ", error);
        return; // Exit the function if there's an error
      }

      // Increment level if data is found
      if (data && data.level != null) {
        new_level = data.level + 1;
      }

      // Update the level in the database
      const { error: updateError, status: updateStatus } = await supabase
        .from("user_exercises")
        .update({ level: new_level })
        .eq("exercise_id", exer_id)
        .eq("user_id", user_uuid);

      if (updateError) {
        console.log("Error updating user exercise level: ", updateError);
        return; // Exit the function if there's an error
      }

      if (updateStatus === 204) {
        console.log(
          "No rows were updated; possible incorrect exercise ID or user ID."
        );
        return; // Handle the case where no rows were updated
      }

      console.log("User exercise level successfully updated to:", new_level);
    } catch (error) {
      console.log("LEVEL_UPDATE_ERROR: ", error);
    }
  };

  public static getWordID = async (word: string) => {
    const { data, error, status } = await supabase
      .from("words")
      .select(`id`)
      .eq("normal_form", word)
      .single();

    console.log("MISTAKE: " + word);
    if (error && status !== 406) {
      console.error("Error fetching word ID:", error.message);
      return null; // or you could throw an error if you want
    }

    return data?.id || null;
  };

  public static pushInitWordMistake = async (
    exer_id: number,
    word_id: number,
    user_uuid: string
  ) => {
    try {
      const { data, error } = await supabase.from("word_mistakes").insert([
        {
          exercise_type: exer_id,
          word_id: word_id,
          user_id: user_uuid,
          score: 1,
        },
      ]);
    } catch (error) {
      console.log("INIT_WORD_PROGRESS_ERROR: ", error);
    }
  };

  public static trackWrongWord = async (
    exer_id: number,
    word: string,
    user_uuid: string
  ) => {
    // Get word ID of this word
    const wordID = await this.getWordID(word);

    // If wordID is not null, check in word_mistakes
    if (wordID !== null) {
      // Check if this word is in word_mistakes already
      const { data, error, status } = await supabase
        .from("word_mistakes")
        .select(`*`)
        .eq("exercise_type", exer_id)
        .eq("word_id", wordID)
        .eq("user_id", user_uuid)
        .single();

      if (error && status !== 406) {
        // Handle errors other than "Not Found"
        console.error("Error fetching word mistake record:", error.message);
        return; // Optionally handle the error (e.g., re-throw or return an error status)
      }

      if (!data) {
        // If no record, add a new one
        console.log("No record found, adding initial record...");
        this.pushInitWordMistake(exer_id, wordID, user_uuid);
      } else {
        // If record exists, increment the score
        console.log("Found record, incrementing score...");
        const new_score = (data.score ?? 0) + 1;

        const { error: updateError, status: updateStatus } = await supabase
          .from("word_mistakes")
          .update({ score: new_score })
          .eq("word_id", wordID)
          .eq("exercise_type", exer_id)
          .eq("user_id", user_uuid);

        if (updateError) {
          console.error(
            "Error updating word mistake record:",
            updateError.message
          );
          // Optionally handle the error (e.g., re-throw or return an error status)
        }
      }
    } else {
      console.error("Word ID not found for the given word.");
    }
  };

  // It's the same as wrong word except the inverse.
  // Deal with this later and merge this with up on codebase refactor.
  public static trackCorrectWord = async (
    exer_id: number,
    word: string,
    user_uuid: string
  ) => {
    try {
      // Get word ID of this word
      const wordID = await this.getWordID(word);

      // If wordID is not null, check in word_mistakes
      if (wordID !== null) {
        // Check if this word is in word_mistakes already
        const { data, error, status } = await supabase
          .from("word_mistakes")
          .select(`*`)
          .eq("exercise_type", exer_id)
          .eq("word_id", wordID)
          .eq("user_id", user_uuid)
          .single();

        if (error && status !== 406) {
          // Handle errors other than "Not Found"
          console.error("Error fetching word mistake record:", error.message);
          return; // Exit if there's an error fetching the record
        }

        if (!data) {
          // If no record, nothing to do
          console.log("No record found for this word, nothing to do.");
          return;
        } else {
          // If record exists, decrement the score
          const new_score = (data.score ?? 1) - 1;

          if (new_score <= 0) {
            // Delete the record entirely if the score is 0 or less
            const { error: deleteError } = await supabase
              .from("word_mistakes")
              .delete()
              .eq("word_id", wordID)
              .eq("exercise_type", exer_id)
              .eq("user_id", user_uuid);

            if (deleteError) {
              console.error(
                "Error deleting word mistake record:",
                deleteError.message
              );
              // Optionally handle the error (e.g., re-throw or return an error status)
            }
          } else {
            // Otherwise, just decrement the score
            const { error: updateError } = await supabase
              .from("word_mistakes")
              .update({ score: new_score })
              .eq("word_id", wordID)
              .eq("exercise_type", exer_id)
              .eq("user_id", user_uuid);

            if (updateError) {
              console.error(
                "Error updating word mistake record:",
                updateError.message
              );
              // Optionally handle the error (e.g., re-throw or return an error status)
            }
          }
        }
      } else {
        console.error("Word ID not found for the given word.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Handle unexpected errors
    }
  };

  // go wild, idca
  public static getCommonMistakenWordsInExer = async (
    exercise_id: number,
    user_uuid: string
  ) => {
    try {
      // Step 1: Fetch word_ids from word_mistakes
      const { data: wordMistakes, error: mistakesError } = await supabase
        .from("word_mistakes")
        .select("word_id")
        .eq("exercise_type", exercise_id)
        .eq("user_id", user_uuid);

      if (mistakesError) {
        console.error(
          "Error fetching word IDs from word_mistakes:",
          mistakesError.message
        );
        return [];
      }

      const wordIds = wordMistakes.map((record) => record.word_id);

      if (wordIds.length === 0) {
        console.log("No word IDs found.");
        return [];
      }

      // Step 2: Fetch words from word table using the list of word_ids
      const { data: words, error: wordsError } = await supabase
        .from("words")
        .select("normal_form")
        .in("id", wordIds);

      if (wordsError) {
        console.error(
          "Error fetching words from word table:",
          wordsError.message
        );
        return [];
      }

      return words.map((record) => record.normal_form);
    } catch (error) {
      console.error("Unexpected error:", error);
      return [];
    }
  };
}

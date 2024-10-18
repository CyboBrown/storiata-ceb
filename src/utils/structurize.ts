import { VocabularyExercise } from "../models/VocabularyExercise";
import { Exercise } from "../models/Exercise";
import { GrammarExercise } from "../models/GrammarExercise";

export const structurizeVocabularyExercise = (
  details: Exercise,
  problems: {
    id: number;
    exercise_id: number;
    word_id: number;
    word_translations: {
      words: {
        normal_form: string;
        phonetic_form: string;
        representation: string | null;
        part_of_speech: string | null;
      } | null;
      translations: {
        word: string;
      } | null;
    } | null;
  }[]
) => {
  if (!problems || !details) {
    return null;
  }

  const item_sets: Array<{
    id: number;
    ceb_word: string;
    phonetic_form: string;
    representation: string;
    eng_word: string;
    part_of_speech: string;
  }> | null = problems.map((problem) => {
    return {
      id: problem.word_id,
      ceb_word: problem.word_translations?.words?.normal_form || "error",
      phonetic_form: problem.word_translations?.words?.phonetic_form || "error",
      representation:
        problem.word_translations?.words?.representation || "error",
      eng_word: problem.word_translations?.translations?.word || "error",
      part_of_speech:
        problem.word_translations?.words?.part_of_speech || "error",
    };
  });

  const structured_data: VocabularyExercise = {
    added_by: details.added_by,
    created_at: details.created_at || "error",
    description: details.description,
    id: details.id,
    type: details.type,
    topic: details.topic,
    item_sets: item_sets,
  };
  return structured_data;
};

export const structurizeGrammarExercise = (
  details: Exercise,
  problems: {
    id: number;
    exercise_id: number;
    sentence_id: number;
    sentence_pairs: {
      sentence: string;
      translated_sentence: string;
      sentence_words: {
        role: string | null;
        word_translations: {
          words: {
            normal_form: string;
            suffix_form: string | null;
            part_of_speech: string | null;
          } | null;
          translations: {
            word: string;
            part_of_speech: string | null;
          } | null;
        } | null;
      }[];
    } | null;
  }[],
  words:
    | {
        id: number;
        exercise_id: number;
        word_id: number;
        role: string | null;
        word_translations: {
          words: {
            normal_form: string;
            suffix_form: string | null;
            part_of_speech: string | null;
          } | null;
          translations: {
            word: string;
            part_of_speech: string | null;
          } | null;
        } | null;
      }[]
    | null
) => {
  if (!problems || !details) {
    return null;
  }

  const item_sets: Array<{
    id: number;
    sentence: string;
    translated_sentence: string;
    sentence_words: Array<{
      role: string;
      word: string;
      suffix_form: string;
      translation: string;
      part_of_speech: string;
    }>;
  }> | null = problems.map((problem) => {
    return {
      id: problem.sentence_id,
      sentence: problem.sentence_pairs?.sentence || "error",
      translated_sentence:
        problem.sentence_pairs?.translated_sentence || "error",
      sentence_words:
        problem.sentence_pairs?.sentence_words.map((pair) => {
          return {
            role: pair.role || "error",
            word: pair.word_translations?.words?.normal_form || "error",
            suffix_form: pair.word_translations?.words?.suffix_form || "error",
            translation: pair.word_translations?.translations?.word || "error",
            part_of_speech:
              pair.word_translations?.words?.part_of_speech || "error",
          };
        }) || [],
    };
  });

  const exercise_words: Array<{
    id: number;
    role: string;
    ceb_word: string;
    suffix_form: string;
    eng_word: string;
    part_of_speech: string;
  }> | null = words
    ? words.map((word) => {
        return {
          id: word.id,
          role: word.role || "error",
          ceb_word: word.word_translations?.words?.normal_form || "error",
          suffix_form: word.word_translations?.words?.suffix_form || "error",
          eng_word: word.word_translations?.translations?.word || "error",
          part_of_speech:
            word.word_translations?.words?.part_of_speech || "error",
        };
      })
    : null;

  const structured_data: GrammarExercise = {
    added_by: details.added_by,
    created_at: details.created_at || "error",
    description: details.description,
    id: details.id,
    type: details.type,
    topic: details.topic,
    item_sets: item_sets,
    exercise_words: exercise_words,
  };
  return structured_data;
};

export const structurizeSpeakingExercise = () => {};

export const structurizeListeningExercise = () => {};

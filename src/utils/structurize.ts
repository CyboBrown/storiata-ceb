import { StructuredVocabularyExercise } from "../models/StructuredVocabularyExercise";
import { VocabularyExercise } from "../models/VocabularyExercise";

export const structurizeVocabularyExercise = (
  details: VocabularyExercise,
  problems: {
    id: number;
    exercise_id: number;
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
    ceb_word: string;
    phonetic_form: string;
    representation: string;
    eng_word: string;
    part_of_speech: string;
  }> | null = problems.map((problem) => {
    return {
      ceb_word: problem.word_translations?.words?.normal_form || "error",
      phonetic_form: problem.word_translations?.words?.phonetic_form || "error",
      representation:
        problem.word_translations?.words?.representation || "error",
      eng_word: problem.word_translations?.translations?.word || "error",
      part_of_speech:
        problem.word_translations?.words?.part_of_speech || "error",
    };
  });
  const structured_data: StructuredVocabularyExercise = {
    created_at: details.created_at || "error",
    description: details.description,
    id: details.id,
    mode: details.mode,
    topic: details.topic,
    item_sets: item_sets,
  };
  return structured_data;
};

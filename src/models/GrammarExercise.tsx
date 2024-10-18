export interface GrammarExercise {
  added_by: string;
  created_at: string;
  description: string;
  id: number;
  type: number;
  topic: string;
  item_sets: Array<{
    id: number;
    sentence: string;
    translated_sentence: string;
    sentence_words: Array<{
      role: string;
      word: string;
      suffix_form: string | null;
      translation: string;
      part_of_speech: string;
    }>;
  }> | null;
  exercise_words: Array<{
    id: number;
    role: string;
    ceb_word: string;
    suffix_form: string;
    eng_word: string;
    part_of_speech: string;
  }> | null;
}

export function isGrammarExercise(object: any): object is GrammarExercise {
  return "item_sets" in object && "exercise_words" in object;
}

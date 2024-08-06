export interface GrammarExercise {
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
    role: string;
    ceb_word: string;
    suffix_form: string;
    eng_word: string;
    part_of_speech: string;
  }> | null;
}

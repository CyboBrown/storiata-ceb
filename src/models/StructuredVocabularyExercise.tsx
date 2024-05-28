export interface StructuredVocabularyExercise {
  created_at: string;
  description: string;
  id: number;
  mode: number;
  topic: string;
  item_sets: Array<{
    ceb_word: string;
    phonetic_form: string;
    representation: string;
    eng_word: string;
    part_of_speech: string;
  }> | null;
}

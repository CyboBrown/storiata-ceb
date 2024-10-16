export interface SpeakingExercise {
  added_by: string;
  created_at: string;
  description: string;
  id: number;
  type: number;
  topic: string;
  item_sets: Array<{
    id: number;
    ceb_word: string;
    phonetic_form: string;
    representation: string;
    eng_word: string;
    part_of_speech: string;
  }> | null;
}

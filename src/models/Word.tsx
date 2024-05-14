export interface Word {
  added_by: string | null;
  created_at: string;
  description: string | null;
  id: number;
  normal_form: string;
  part_of_speech: string;
  phonetic_form: string;
  representation: string | null;
  suffix_form: string | null;
  translations: Array<{ word: string }> | null;
}

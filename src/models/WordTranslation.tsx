export interface WordTranslation {
  added_by: string | null;
  created_at: string;
  id: number;
  language_code: string;
  translation_id: number;
  word_id: number;
  words: {
    normal_form: string;
  } | null;
  translations: {
    word: string;
  } | null;
}

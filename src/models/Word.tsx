export interface Word {
  normal_form: string;
  phonetic_form: string;
  suffix_form: string;
  translations: Array<{ word: string }>;
  description: string;
  representation: string;
}

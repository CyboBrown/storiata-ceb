import { supabase } from "../utils/supabase";
import { Word } from "../models/Word";

export class DictionaryService {
  public static addWordTranslation = async (
    word_id: number,
    translation_id: number
  ) => {
    console.log("ADDED_WORD_TRANSLATION");
    const { data, error } = await supabase
      .from("word_translations")
      .upsert([
        {
          word_id: word_id,
          translation_id: translation_id,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
    return data;
  };

  public static createWord = async (word: Word) => {
    console.log("CREATED_WORD");
    // console.log(word);
    const { data, error } = await supabase
      .from("words")
      .insert([
        {
          normal_form: word.normal_form,
          phonetic_form: word.phonetic_form,
          part_of_speech: word.part_of_speech,
          suffix_form: word.suffix_form,
          representation: word.representation,
          description: word.description,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
    return data;
  };

  public static editWord = async (word: Word) => {
    console.log("EDITED_WORD");
    // console.log(word);
    const { data, error } = await supabase
      .from("words")
      .update({
        normal_form: word.normal_form,
        phonetic_form: word.phonetic_form,
        part_of_speech: word.part_of_speech,
        suffix_form: word.suffix_form,
        representation: word.representation,
        description: word.description,
      })
      .eq("id", word.id)
      .select();
    if (error) {
      console.log(error);
    }
    return data;
  };

  public static getWord = async (word_id: string) => {
    console.log("GOT_WORD");
  };

  // part_of_speech - meaning
  // N - Noun
  // p - Plural
  // h - Noun Phrase
  // V - Verb (usu. participle)
  // t - Verb (transitive)
  // i - Verb (intransitive)
  // A - Adjective
  // v - Adverb
  // C - Conjunction
  // P - Preposition
  // ! - Interjection
  // r - Pronoun
  // D - Definite Article
  // I - Indefinite Article
  // o - Nominative
  public static searchTranslation = async (word: string) => {
    console.log("SEARCHED_TRANSLATION");
    const { data, error, status } = await supabase
      .from("translations")
      .select(`*`)
      .like("word", word + "%")
      .order("word", { ascending: true })
      .limit(20);
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };

  public static searchWord = async (word: string) => {
    console.log("SEARCHED_WORD");
    const { data, error, status } = await supabase
      .from("words")
      .select(`*, translations(word)`)
      .ilike("normal_form", word + "%")
      .order("normal_form")
      .limit(20);
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };
}

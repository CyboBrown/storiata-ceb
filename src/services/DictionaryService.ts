import { supabase } from "../utils/supabase";
import { Word } from "../models/Word";
import { Translation } from "../models/Translation";

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

  // ***
  public static createTranslation = async (translation: Translation) => {
    console.log("CREATED_TRANSLATION");
    const { data, error } = await supabase
      .from("translations")
      .insert([translation])
      .select();
    if (error) {
      console.log(error);
    }
    return data;
  };

  public static createWord = async (word: Word) => {
    console.log("CREATED_WORD");
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

  // ***
  public static editTranslation = async (translation: Translation) => {
    console.log("EDITED_TRANSLATION");
    const { data, error } = await supabase
      .from("words")
      .update(translation)
      .eq("id", translation.id)
      .select();
    if (error) {
      console.log(error);
    }
    return data;
  };

  public static editWord = async (word: Word) => {
    console.log("EDITED_WORD");
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

  // ***
  public static getTranslation = async (translation_id: string) => {
    console.log("GOT_TRANSLATION");
    const { data, error, status } = await supabase
      .from("translations")
      .select(`*`)
      .eq("id", translation_id)
      .single();
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };

  // ***
  public static getWord = async (word_id: string) => {
    console.log("GOT_WORD");
    const { data, error, status } = await supabase
      .from("words")
      .select(`*, translations(word)`)
      .eq("id", word_id)
      .single();
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };

  // ***
  public static removeTranslation = async (translation_id: number) => {
    console.log("REMOVED_TRANSLATION");
    const { data, error } = await supabase
      .from("translations")
      .delete()
      .eq("id", translation_id);
    if (error) {
      console.log(error);
    }
  };

  // ***
  public static removeWord = async (word_id: number) => {
    console.log("REMOVED_WORD");
    const { data, error } = await supabase
      .from("words")
      .delete()
      .eq("id", word_id);
    if (error) {
      console.log(error);
    }
  };

  public static removeWordTranslation = async (
    word_id: number,
    translation_id: number
  ) => {
    console.log("REMOVED_WORD_TRANSLATION");
    const { data, error } = await supabase
      .from("word_translations")
      .delete()
      .eq("word_id", word_id)
      .eq("translation_id", translation_id);
    if (error) {
      console.log(error);
    }
  };

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

  public static searchWordByTranslation = async (word: string) => {
    console.log("SEARCHED_WORD");
    const { data, error, status } = await supabase
      .from("words")
      .select(`*, translations!inner(word)`)
      .ilike("translations.word", word + "%")
      .limit(20);
    if (error && status !== 406) {
      console.log(error);
    }
    return data;
  };
}

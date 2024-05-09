import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import Main from "../../app/main";
import { Word } from "../models/Word";

export class DictionaryService {
  public static searchWord = async (word: string) => {
    const { data, error, status } = await supabase
      .from("words")
      .select(`*, translations(word)`)
      .ilike("normal_form", "%" + word + "%")
      .order("normal_form");
    if (error && status !== 406) {
      console.log(error);
      throw error;
    }
    return data;
  };

  public static getWord = async (word_id: string) => {};

  public static createWord = async (word: Word) => {
    const { data, error } = await supabase
      .from("words")
      .insert([
        { normal_form: word.normal_form, phonetic_form: word.phonetic_form },
      ])
      .select();
    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  };
}

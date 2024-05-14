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
    }
    return data;
  };

  public static getWord = async (word_id: string) => {};

  public static createWord = async (word: Word) => {
    console.log("in service");
    console.log(word);
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
}

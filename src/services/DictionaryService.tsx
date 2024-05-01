import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import Main from "../../app/main";

export function dictionaryService() {
  const searchWord = async (word: string) => {};

  const getWord = async (word_id: string) => {};

  const createWord = async (word: Word) => {};

  return {};
}

import { UserExercise } from "../models/UserExercise";
import { supabase } from "../utils/supabase";
import { ExerciseService } from "./ExerciseService";

export class DashboardService {
  // LEARNER FUNCTIONS

  public static getTotalExercisesCompleted = async (user_id: string) => {
    const { data: completed, error: mistakesError } = await supabase
      .from("user_exercises")
      .select("level")
      .eq("user_id", user_id);
    if (mistakesError) {
      console.error("Error fetching exercises:", mistakesError.message);
      return 0;
    }
    const curr_count = completed.reduce(
      (acc, record) => acc + (record.level || 0),
      0
    );
    return curr_count ?? 0;
  };

  public static getTotalMistakenWords = async (user_id: string) => {
    const { count, error: mistakesError } = await supabase
      .from("word_mistakes")
      .select("*", { count: "exact" })
      .eq("user_id", user_id);
    if (mistakesError) {
      console.error("Error fetching mistakes count:", mistakesError.message);
      return 0;
    }
    return count || 0;
  };

  public static getOngoingExercises = async (
    user_id: string,
    range?: number
  ) => {
    const { data, error } = await supabase
      .from("user_exercises")
      .select("*")
      .eq("user_id", user_id)
      .lt("level", 6)
      .gt("level", 0)
      .order("level", { ascending: false })
      .limit(range ?? 20);
    if (error) {
      console.log(error);
    }
    const result = await Promise.all(
      data?.map(async (item) => {
        const exer_details = await ExerciseService.getExerciseDetails(
          item.exercise_id ?? 0
        );
        console.log("***");
        console.log(exer_details);
        console.log("***");
        return await {
          ...item,
          topic: exer_details?.topic,
          description: exer_details?.description,
        };
      }) || []
    );
    return result;
  };

  // ***
  public static getAllMistakenWords = async (user_id: string) => {
    return 0;
  };

  // CONTRIBUTOR FUNCTIONS

  public static getTotalWordsContributed = async (user_id: string) => {
    const { count, error } = await supabase
      .from("words")
      .select("*", { count: "exact", head: true })
      .eq("added_by", user_id);
    if (error) {
      console.log(error);
    }
    return count ?? 0;
  };

  public static getTotalExercisesContributed = async (user_id: string) => {
    const { count, error } = await supabase
      .from("exercises")
      .select("*", { count: "exact", head: true })
      .eq("added_by", user_id);
    if (error) {
      console.log(error);
    }
    return count ?? 0;
  };

  public static getNewestWordsContributed = async (
    user_id: string,
    range: number
  ) => {
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .eq("added_by", user_id)
      .order("created_at", { ascending: false })
      .limit(range ?? 10);
    if (error) {
      console.log(error);
    }
    return data;
  };

  public static getNewestExercisesContributed = async (
    user_id: string,
    range: number
  ) => {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("added_by", user_id)
      .order("created_at", { ascending: false })
      .limit(range ?? 20);
    if (error) {
      console.log(error);
    }
    return data;
  };
}

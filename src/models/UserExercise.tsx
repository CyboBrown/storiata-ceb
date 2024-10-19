export interface UserExercise {
  created_at: string;
  exercise_id: number | null;
  id: number;
  level: number;
  user_id: string | null;
  topic?: string;
  description?: string;
}

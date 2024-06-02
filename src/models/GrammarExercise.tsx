export interface GrammarExercise {
  created_at: string;
  description: string;
  id: number;
  type: number;
  topic: string;
  item_sets: Array<any> | null;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contribution_summary: {
        Row: {
          contributor_id: string | null
          created_at: string
          exercise_contribution_count: number
          id: number
          level: number
          rating: number
          word_contribution_count: number
        }
        Insert: {
          contributor_id?: string | null
          created_at?: string
          exercise_contribution_count?: number
          id?: number
          level?: number
          rating?: number
          word_contribution_count?: number
        }
        Update: {
          contributor_id?: string | null
          created_at?: string
          exercise_contribution_count?: number
          id?: number
          level?: number
          rating?: number
          word_contribution_count?: number
        }
        Relationships: []
      }
      exercise_sentences: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          sentence_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          sentence_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          sentence_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sentences_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_sentences_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentence_pairs"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_words: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          role: string | null
          word_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          role?: string | null
          word_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          role?: string | null
          word_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_words_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vocabulary_exercise_words_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "word_translations"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          added_by: string
          created_at: string
          description: string
          id: number
          topic: string
          type: number
        }
        Insert: {
          added_by?: string
          created_at?: string
          description?: string
          id?: number
          topic: string
          type?: number
        }
        Update: {
          added_by?: string
          created_at?: string
          description?: string
          id?: number
          topic?: string
          type?: number
        }
        Relationships: []
      }
      preferences: {
        Row: {
          created_at: string
          dark_mode: boolean | null
          id: string
        }
        Insert: {
          created_at?: string
          dark_mode?: boolean | null
          id: string
        }
        Update: {
          created_at?: string
          dark_mode?: boolean | null
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string
          is_contributor: boolean | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id: string
          is_contributor?: boolean | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string
          is_contributor?: boolean | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      sentence_mistakes: {
        Row: {
          created_at: string
          exercise_type: number | null
          id: number
          score: number | null
          sentence_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          exercise_type?: number | null
          id?: number
          score?: number | null
          sentence_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          exercise_type?: number | null
          id?: number
          score?: number | null
          sentence_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentence_mistakes_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentence_pairs"
            referencedColumns: ["id"]
          },
        ]
      }
      sentence_pairs: {
        Row: {
          added_by: string
          created_at: string
          id: number
          language_code: string
          sentence: string
          translated_sentence: string
          updated_at: string
        }
        Insert: {
          added_by?: string
          created_at?: string
          id?: number
          language_code?: string
          sentence: string
          translated_sentence: string
          updated_at?: string
        }
        Update: {
          added_by?: string
          created_at?: string
          id?: number
          language_code?: string
          sentence?: string
          translated_sentence?: string
          updated_at?: string
        }
        Relationships: []
      }
      sentence_words: {
        Row: {
          created_at: string
          id: number
          role: string | null
          sentence_id: number
          word_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          role?: string | null
          sentence_id: number
          word_id: number
        }
        Update: {
          created_at?: string
          id?: number
          role?: string | null
          sentence_id?: number
          word_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sentence_words_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentence_pairs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_words_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "word_translations"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          added_by: string | null
          created_at: string
          id: number
          language_code: string
          part_of_speech: string
          word: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          id?: number
          language_code?: string
          part_of_speech: string
          word: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          id?: number
          language_code?: string
          part_of_speech?: string
          word?: string
        }
        Relationships: []
      }
      user_exercises: {
        Row: {
          created_at: string
          exercise_id: number | null
          id: number
          level: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          exercise_id?: number | null
          id?: number
          level?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          exercise_id?: number | null
          id?: number
          level?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          created_at: string
          id: string
          level: number | null
          rating: number | null
          sentence_count: number | null
          word_count: number | null
        }
        Insert: {
          created_at?: string
          id: string
          level?: number | null
          rating?: number | null
          sentence_count?: number | null
          word_count?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          level?: number | null
          rating?: number | null
          sentence_count?: number | null
          word_count?: number | null
        }
        Relationships: []
      }
      word_mistakes: {
        Row: {
          created_at: string
          exercise_type: number | null
          id: number
          score: number | null
          user_id: string | null
          word_id: number | null
        }
        Insert: {
          created_at?: string
          exercise_type?: number | null
          id?: number
          score?: number | null
          user_id?: string | null
          word_id?: number | null
        }
        Update: {
          created_at?: string
          exercise_type?: number | null
          id?: number
          score?: number | null
          user_id?: string | null
          word_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "word_mistakes_word_id_fkey1"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      word_translations: {
        Row: {
          added_by: string | null
          created_at: string
          id: number
          language_code: string
          translation_id: number
          word_id: number
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          id?: number
          language_code?: string
          translation_id: number
          word_id: number
        }
        Update: {
          added_by?: string | null
          created_at?: string
          id?: number
          language_code?: string
          translation_id?: number
          word_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_word_translations_translation_id_fkey"
            columns: ["translation_id"]
            isOneToOne: false
            referencedRelation: "translations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_word_translations_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      words: {
        Row: {
          added_by: string | null
          created_at: string
          description: string | null
          id: number
          normal_form: string
          part_of_speech: string
          phonetic_form: string
          representation: string | null
          suffix_form: string | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          description?: string | null
          id?: number
          normal_form: string
          part_of_speech?: string
          phonetic_form: string
          representation?: string | null
          suffix_form?: string | null
        }
        Update: {
          added_by?: string | null
          created_at?: string
          description?: string | null
          id?: number
          normal_form?: string
          part_of_speech?: string
          phonetic_form?: string
          representation?: string | null
          suffix_form?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      part_of_speech: "*" | "n" | "v" | "adj" | "num"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

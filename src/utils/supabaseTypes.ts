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
      exercise_words: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          word_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          word_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          word_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "vocabulary_exercise_words_exercise_id_fkey"
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
          created_at: string
          description: string
          id: number
          topic: string
          type: number
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          topic: string
          type?: number
        }
        Update: {
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
        Relationships: [
          {
            foreignKeyName: "preferences_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
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
        Relationships: [
          {
            foreignKeyName: "public_translation_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
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
            foreignKeyName: "public_word_translations_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          part_of_speech: string | null
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
          part_of_speech?: string | null
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
          part_of_speech?: string | null
          phonetic_form?: string
          representation?: string | null
          suffix_form?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_words_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

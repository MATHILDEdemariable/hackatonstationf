export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      athlete_profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          bio: string | null
          birth_date: string
          career_preferences: Json
          city: string
          created_at: string | null
          dominant_side: string | null
          embedding_vector: string | null
          experience_years: number
          full_name: string
          highlight_video_url: string | null
          id: string
          level: string
          nationality: string
          personality_traits: string[]
          playing_style: string[]
          primary_position: string
          secondary_positions: string[] | null
          sport_id: string
          stats: Json | null
          strengths: string[]
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          birth_date: string
          career_preferences?: Json
          city: string
          created_at?: string | null
          dominant_side?: string | null
          embedding_vector?: string | null
          experience_years: number
          full_name: string
          highlight_video_url?: string | null
          id: string
          level: string
          nationality: string
          personality_traits?: string[]
          playing_style?: string[]
          primary_position: string
          secondary_positions?: string[] | null
          sport_id: string
          stats?: Json | null
          strengths?: string[]
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string
          career_preferences?: Json
          city?: string
          created_at?: string | null
          dominant_side?: string | null
          embedding_vector?: string | null
          experience_years?: number
          full_name?: string
          highlight_video_url?: string | null
          id?: string
          level?: string
          nationality?: string
          personality_traits?: string[]
          playing_style?: string[]
          primary_position?: string
          secondary_positions?: string[] | null
          sport_id?: string
          stats?: Json | null
          strengths?: string[]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_profiles_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      club_profiles: {
        Row: {
          active_recruitment: boolean | null
          budget: Json
          city: string
          club_name: string
          club_stats: Json | null
          country: string
          created_at: string | null
          description: string | null
          division: string
          division_level: number
          embedding_vector: string | null
          facilities: string[]
          id: string
          location: Json | null
          logo_url: string | null
          playing_style: string[]
          recruitment_needs: Json
          sport_id: string
          team_culture: string[]
          updated_at: string | null
        }
        Insert: {
          active_recruitment?: boolean | null
          budget?: Json
          city: string
          club_name: string
          club_stats?: Json | null
          country: string
          created_at?: string | null
          description?: string | null
          division: string
          division_level: number
          embedding_vector?: string | null
          facilities?: string[]
          id: string
          location?: Json | null
          logo_url?: string | null
          playing_style?: string[]
          recruitment_needs?: Json
          sport_id: string
          team_culture?: string[]
          updated_at?: string | null
        }
        Update: {
          active_recruitment?: boolean | null
          budget?: Json
          city?: string
          club_name?: string
          club_stats?: Json | null
          country?: string
          created_at?: string | null
          description?: string | null
          division?: string
          division_level?: number
          embedding_vector?: string | null
          facilities?: string[]
          id?: string
          location?: Json | null
          logo_url?: string | null
          playing_style?: string[]
          recruitment_needs?: Json
          sport_id?: string
          team_culture?: string[]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_profiles_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          athlete_id: string
          club_id: string
          created_at: string | null
          id: string
          match_reasoning: Json | null
          match_score: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          club_id: string
          created_at?: string | null
          id?: string
          match_reasoning?: Json | null
          match_score?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          club_id?: string
          created_at?: string | null
          id?: string
          match_reasoning?: Json | null
          match_score?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          match_id: string
          message_type: string
          offer_data: Json | null
          sender_id: string
          sender_type: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          match_id: string
          message_type?: string
          offer_data?: Json | null
          sender_id: string
          sender_type: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          match_id?: string
          message_type?: string
          offer_data?: Json | null
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
          user_type: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          updated_at?: string | null
          user_type: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      sport_positions: {
        Row: {
          id: string
          position_key: string
          position_label_en: string
          position_label_fr: string
          sport_id: string | null
        }
        Insert: {
          id?: string
          position_key: string
          position_label_en: string
          position_label_fr: string
          sport_id?: string | null
        }
        Update: {
          id?: string
          position_key?: string
          position_label_en?: string
          position_label_fr?: string
          sport_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sport_positions_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      sports: {
        Row: {
          category: string
          created_at: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

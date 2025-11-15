export interface Sport {
  id: string;
  name: string;
  category: string;
  icon: string;
  created_at: string;
}

export interface SportPosition {
  id: string;
  sport_id: string;
  position_key: string;
  position_label_fr: string;
  position_label_en: string;
}

export interface Profile {
  id: string;
  email: string;
  user_type: 'athlete' | 'club';
  created_at: string;
  updated_at: string;
}

export interface AthleteProfile {
  id: string;
  full_name: string;
  birth_date: string;
  age: number | null;
  nationality: string;
  city: string;
  avatar_url: string | null;
  sport_id: string;
  primary_position: string;
  secondary_positions: string[];
  level: 'amateur' | 'semi-pro' | 'professional';
  experience_years: number;
  dominant_side: string | null;
  stats: Record<string, any>;
  career_preferences: Record<string, any>;
  strengths: string[];
  playing_style: string[];
  personality_traits: string[];
  highlight_video_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
  embedding_vector: string | null;
  sport?: Sport;
}

export interface ClubProfile {
  id: string;
  club_name: string;
  city: string;
  country: string;
  logo_url: string | null;
  sport_id: string;
  division: string;
  division_level: number;
  recruitment_needs: Record<string, any>;
  budget: Record<string, any>;
  playing_style: string[];
  team_culture: string[];
  facilities: string[];
  club_stats: Record<string, any>;
  location: Record<string, any>;
  description: string | null;
  active_recruitment: boolean;
  created_at: string;
  updated_at: string;
  embedding_vector: string | null;
  sport?: Sport;
}

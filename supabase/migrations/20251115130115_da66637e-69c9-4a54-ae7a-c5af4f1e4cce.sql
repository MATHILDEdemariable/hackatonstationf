-- Create profiles table (base user table)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  user_type text not null check (user_type in ('athlete', 'club')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create sports reference table
create table public.sports (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null,
  icon text,
  created_at timestamp with time zone default now()
);

-- Insert initial sports data
insert into public.sports (name, category, icon) values
  ('Football', 'team', '⚽'),
  ('Basketball', 'team', '🏀'),
  ('Rugby', 'team', '🏉'),
  ('Tennis', 'individual', '🎾'),
  ('Volleyball', 'team', '🏐'),
  ('Handball', 'team', '🤾'),
  ('MMA', 'combat', '🥊'),
  ('Boxe', 'combat', '🥊');

alter table public.sports enable row level security;

create policy "Anyone can view sports"
  on public.sports for select
  to authenticated
  using (true);

-- Create sport positions table
create table public.sport_positions (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid references public.sports(id) on delete cascade,
  position_key text not null,
  position_label_fr text not null,
  position_label_en text not null,
  unique(sport_id, position_key)
);

-- Insert positions for Football
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'striker', 'Attaquant', 'Striker' from public.sports where name = 'Football'
union all
select id, 'midfielder', 'Milieu', 'Midfielder' from public.sports where name = 'Football'
union all
select id, 'defender', 'Défenseur', 'Defender' from public.sports where name = 'Football'
union all
select id, 'goalkeeper', 'Gardien', 'Goalkeeper' from public.sports where name = 'Football';

-- Insert positions for Basketball
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'point_guard', 'Meneur', 'Point Guard' from public.sports where name = 'Basketball'
union all
select id, 'shooting_guard', 'Arrière', 'Shooting Guard' from public.sports where name = 'Basketball'
union all
select id, 'small_forward', 'Ailier', 'Small Forward' from public.sports where name = 'Basketball'
union all
select id, 'power_forward', 'Ailier fort', 'Power Forward' from public.sports where name = 'Basketball'
union all
select id, 'center', 'Pivot', 'Center' from public.sports where name = 'Basketball';

-- Insert positions for Rugby
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'prop', 'Pilier', 'Prop' from public.sports where name = 'Rugby'
union all
select id, 'hooker', 'Talonneur', 'Hooker' from public.sports where name = 'Rugby'
union all
select id, 'fly_half', 'Ouvreur', 'Fly Half' from public.sports where name = 'Rugby'
union all
select id, 'center', 'Centre', 'Center' from public.sports where name = 'Rugby'
union all
select id, 'winger', 'Ailier', 'Winger' from public.sports where name = 'Rugby';

-- Insert positions for Tennis
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'singles', 'Simple', 'Singles' from public.sports where name = 'Tennis'
union all
select id, 'doubles', 'Double', 'Doubles' from public.sports where name = 'Tennis';

-- Insert positions for Volleyball
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'setter', 'Passeur', 'Setter' from public.sports where name = 'Volleyball'
union all
select id, 'outside_hitter', 'Attaquant', 'Outside Hitter' from public.sports where name = 'Volleyball'
union all
select id, 'middle_blocker', 'Contreur', 'Middle Blocker' from public.sports where name = 'Volleyball'
union all
select id, 'libero', 'Libéro', 'Libero' from public.sports where name = 'Volleyball';

-- Insert positions for Handball
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'goalkeeper', 'Gardien', 'Goalkeeper' from public.sports where name = 'Handball'
union all
select id, 'pivot', 'Pivot', 'Pivot' from public.sports where name = 'Handball'
union all
select id, 'winger', 'Ailier', 'Winger' from public.sports where name = 'Handball'
union all
select id, 'back', 'Arrière', 'Back' from public.sports where name = 'Handball';

-- Insert positions for MMA and Boxe
insert into public.sport_positions (sport_id, position_key, position_label_fr, position_label_en)
select id, 'fighter', 'Combattant', 'Fighter' from public.sports where name = 'MMA'
union all
select id, 'fighter', 'Combattant', 'Fighter' from public.sports where name = 'Boxe';

alter table public.sport_positions enable row level security;

create policy "Anyone can view positions"
  on public.sport_positions for select
  to authenticated
  using (true);

-- Create athlete profiles table (age calculated via trigger)
create table public.athlete_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  full_name text not null,
  birth_date date not null,
  age integer,
  nationality text not null,
  city text not null,
  avatar_url text,
  sport_id uuid references public.sports(id) not null,
  primary_position text not null,
  secondary_positions text[] default '{}',
  level text not null check (level in ('amateur', 'semi-pro', 'professional')),
  experience_years integer not null,
  dominant_side text,
  stats jsonb default '{}'::jsonb,
  career_preferences jsonb not null default '{}'::jsonb,
  strengths text[] not null default '{}',
  playing_style text[] not null default '{}',
  personality_traits text[] not null default '{}',
  highlight_video_url text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  embedding_vector text
);

alter table public.athlete_profiles enable row level security;

create policy "Athletes can view own profile"
  on public.athlete_profiles for select
  using (auth.uid() = id);

create policy "Athletes can insert own profile"
  on public.athlete_profiles for insert
  with check (auth.uid() = id);

create policy "Athletes can update own profile"
  on public.athlete_profiles for update
  using (auth.uid() = id);

create policy "Clubs can view athlete profiles"
  on public.athlete_profiles for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.user_type = 'club'
    )
  );

-- Create club profiles table
create table public.club_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  club_name text not null,
  city text not null,
  country text not null,
  logo_url text,
  sport_id uuid references public.sports(id) not null,
  division text not null,
  division_level integer not null,
  recruitment_needs jsonb not null default '{}'::jsonb,
  budget jsonb not null default '{}'::jsonb,
  playing_style text[] not null default '{}',
  team_culture text[] not null default '{}',
  facilities text[] not null default '{}',
  club_stats jsonb default '{}'::jsonb,
  location jsonb default '{}'::jsonb,
  description text,
  active_recruitment boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  embedding_vector text
);

alter table public.club_profiles enable row level security;

create policy "Clubs can view own profile"
  on public.club_profiles for select
  using (auth.uid() = id);

create policy "Clubs can insert own profile"
  on public.club_profiles for insert
  with check (auth.uid() = id);

create policy "Clubs can update own profile"
  on public.club_profiles for update
  using (auth.uid() = id);

create policy "Athletes can view club profiles"
  on public.club_profiles for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.user_type = 'athlete'
    )
  );

-- Create function to calculate age
create or replace function public.calculate_age()
returns trigger as $$
begin
  new.age := extract(year from age(new.birth_date));
  return new;
end;
$$ language plpgsql;

-- Create trigger for age calculation
create trigger set_age_on_athlete
  before insert or update of birth_date on public.athlete_profiles
  for each row execute function public.calculate_age();

-- Create trigger function for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger set_updated_at_athlete
  before update on public.athlete_profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_club
  before update on public.club_profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Create function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, user_type)
  values (
    new.id, 
    new.email,
    coalesce(new.raw_user_meta_data->>'user_type', 'athlete')
  );
  return new;
end;
$$;

-- Create trigger for automatic profile creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
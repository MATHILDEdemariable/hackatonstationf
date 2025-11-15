-- Create matches table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES public.athlete_profiles(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES public.club_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'archived')),
  match_score NUMERIC,
  match_reasoning JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, club_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('athlete', 'club')),
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'offer', 'counter_offer', 'system')),
  content TEXT,
  offer_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on matches table
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for matches
CREATE POLICY "Athletes can view their own matches"
  ON public.matches
  FOR SELECT
  USING (auth.uid() = athlete_id);

CREATE POLICY "Clubs can view their own matches"
  ON public.matches
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles
      WHERE id = auth.uid() AND id = matches.club_id
    )
  );

CREATE POLICY "System can insert matches"
  ON public.matches
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Athletes can update their match status"
  ON public.matches
  FOR UPDATE
  USING (auth.uid() = athlete_id)
  WITH CHECK (auth.uid() = athlete_id);

CREATE POLICY "Clubs can update their match status"
  ON public.matches
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles
      WHERE id = auth.uid() AND id = matches.club_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.club_profiles
      WHERE id = auth.uid() AND id = matches.club_id
    )
  );

-- Enable RLS on messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their matches"
  ON public.messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.matches
      WHERE id = messages.match_id
      AND (athlete_id = auth.uid() OR club_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert messages in their matches"
  ON public.messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.matches
      WHERE id = match_id
      AND (athlete_id = auth.uid() OR club_id = auth.uid())
    )
    AND sender_id = auth.uid()
  );

-- Create indexes for better performance
CREATE INDEX idx_matches_athlete_id ON public.matches(athlete_id);
CREATE INDEX idx_matches_club_id ON public.matches(club_id);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_messages_match_id ON public.messages(match_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- Create trigger for updated_at on matches
CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
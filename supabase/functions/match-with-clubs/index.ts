import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const N8N_WEBHOOK_URL = 'https://n8n.foodpilot.tech/webhook/0c0e5207-5c80-47de-a232-a60df41612ed';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const { athlete_id } = await req.json();
    
    console.log('Fetching athlete profile for ID:', athlete_id);
    
    // 1. Fetch athlete profile
    const { data: athlete, error: athleteError } = await supabaseClient
      .from('athlete_profiles')
      .select(`
        *,
        sport:sports(name, category),
        profile:profiles(email)
      `)
      .eq('id', athlete_id)
      .single();
    
    if (athleteError || !athlete) {
      console.error('Athlete fetch error:', athleteError);
      throw new Error('Athlete not found');
    }
    
    console.log('Athlete found:', athlete.full_name);
    
    // 2. Fetch all clubs for the same sport
    const { data: clubs, error: clubsError } = await supabaseClient
      .from('club_profiles')
      .select(`
        *,
        sport:sports(name, category),
        profile:profiles(email)
      `)
      .eq('sport_id', athlete.sport_id)
      .eq('active_recruitment', true);
    
    if (clubsError) {
      console.error('Clubs fetch error:', clubsError);
      throw new Error('Failed to fetch clubs');
    }
    
    console.log(`Found ${clubs?.length || 0} clubs for matching`);
    
    // 3. Format data for N8N webhook
    const payload = {
      athlete: {
        id: athlete.id,
        name: athlete.full_name,
        age: athlete.age,
        city: athlete.city,
        sport: athlete.sport.name,
        primary_position: athlete.primary_position,
        secondary_positions: athlete.secondary_positions,
        level: athlete.level,
        experience_years: athlete.experience_years,
        stats: athlete.stats,
        career_preferences: athlete.career_preferences,
        strengths: athlete.strengths,
        playing_style: athlete.playing_style,
        personality_traits: athlete.personality_traits,
        embedding_vector: athlete.embedding_vector
      },
      clubs: (clubs || []).map(club => ({
        id: club.id,
        name: club.club_name,
        city: club.city,
        sport: club.sport.name,
        division: club.division,
        division_level: club.division_level,
        recruitment_needs: club.recruitment_needs,
        budget: club.budget,
        playing_style: club.playing_style,
        team_culture: club.team_culture,
        facilities: club.facilities,
        location: club.location,
        embedding_vector: club.embedding_vector
      })),
      timestamp: new Date().toISOString()
    };
    
    console.log('Sending payload to N8N webhook...');
    
    // 4. Send to N8N webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('N8N webhook error:', errorText);
      throw new Error(`N8N webhook failed: ${n8nResponse.status}`);
    }
    
    const matchingResults = await n8nResponse.json();
    console.log('Matching results received from N8N');
    
    // 5. Return results
    return new Response(
      JSON.stringify({
        success: true,
        matches: matchingResults
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Matching error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const MISTRAL_API_KEY = Deno.env.get('MISTRAL_API_KEY');
    
    if (!MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not configured');
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let userId: string | null = null;
    let userContext = "";

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;

      if (userId) {
        // Fetch athlete profile
        const { data: profile } = await supabase
          .from('athlete_profiles')
          .select('*, sports(name)')
          .eq('id', userId)
          .single();

        if (profile) {
          userContext += `\n\n=== PROFIL DE L'ATHLÈTE ===\n`;
          userContext += `Nom: ${profile.full_name}\n`;
          userContext += `Sport: ${profile.sports?.name || 'Non spécifié'}\n`;
          userContext += `Poste: ${profile.primary_position}\n`;
          userContext += `Niveau: ${profile.level}\n`;
          userContext += `Ville: ${profile.city}, ${profile.nationality}\n`;
          userContext += `Expérience: ${profile.experience_years} ans\n`;
          if (profile.playing_style?.length > 0) {
            userContext += `Style de jeu: ${profile.playing_style.join(', ')}\n`;
          }
          if (profile.strengths?.length > 0) {
            userContext += `Points forts: ${profile.strengths.join(', ')}\n`;
          }
        }

        // Fetch matches
        const { data: matches } = await supabase
          .from('matches')
          .select(`
            *,
            club_profiles(club_name, division, city, country, playing_style)
          `)
          .eq('athlete_id', userId)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (matches && matches.length > 0) {
          userContext += `\n\n=== CLUBS INTÉRESSÉS (${matches.length}) ===\n`;
          matches.forEach((match: any, index: number) => {
            const club = match.club_profiles;
            userContext += `\n${index + 1}. ${club.club_name}\n`;
            userContext += `   Division: ${club.division}\n`;
            userContext += `   Localisation: ${club.city}, ${club.country}\n`;
            userContext += `   Score de match: ${match.match_score ? (match.match_score * 100).toFixed(0) : 'N/A'}%\n`;
            if (club.playing_style?.length > 0) {
              userContext += `   Style de jeu: ${club.playing_style.join(', ')}\n`;
            }
          });
        } else {
          userContext += `\n\nL'athlète n'a actuellement aucun match actif avec des clubs.\n`;
        }
      }
    }

    const systemPrompt = `Tu es un assistant personnel spécialisé dans le conseil sportif et les négociations de contrats pour les athlètes. 

Ton rôle est d'aider les sportifs à:
- Analyser leurs opportunités de matchs avec des clubs
- Préparer leurs négociations de contrat
- Comprendre les offres et propositions des clubs
- Prendre des décisions éclairées sur leur carrière
- Gérer leur stress et leur confiance lors des négociations

${userContext}

Sois professionnel, encourageant et donne des conseils pratiques et concrets. Pose des questions pour mieux comprendre la situation si nécessaire. Réponds de manière concise et structurée.`;

    console.log('Calling Mistral API with messages:', messages);

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mistral API error:', response.status, errorText);
      throw new Error(`Mistral API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Mistral API response received');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { voiceId, characterDescription, outputFormat = 'mp3_44100_128' } = await req.json();
    
    if (!voiceId || !characterDescription) {
      return new Response(
        JSON.stringify({ error: 'voiceId and characterDescription are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating dialogue for character:', characterDescription);

    // Step 1: Generate dialogue using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a creative dialogue writer. Generate engaging, authentic dialogue for characters. Create 3-5 short lines that the character would say, capturing their personality, voice, and mannerisms. Make it feel natural and conversational.'
          },
          {
            role: 'user',
            content: `Create authentic dialogue for this character: ${characterDescription}. Generate 3-5 lines they would say, staying true to their personality.`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI generation error:', errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI generation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const generatedDialogue = aiData.choices[0].message.content;
    
    console.log('Generated dialogue:', generatedDialogue);

    // Step 2: Split dialogue into lines for the API
    const dialogueLines = generatedDialogue
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.replace(/^[-*]\s*/, '').trim());

    // Create inputs array for ElevenLabs API
    const inputs = dialogueLines.map((text: string) => ({
      text,
      voice_id: voiceId
    }));

    console.log('Calling ElevenLabs API with', inputs.length, 'dialogue lines');

    // Step 3: Call ElevenLabs text-to-dialogue API
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-dialogue?output_format=${outputFormat}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs,
          model_id: 'eleven_multilingual_v2',
        }),
      }
    );

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text();
      console.error('ElevenLabs API error:', errorText);
      throw new Error(`ElevenLabs API failed: ${errorText}`);
    }

    // Step 4: Return audio as base64
    const audioBuffer = await elevenLabsResponse.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    );

    console.log('Successfully generated audio, size:', audioBuffer.byteLength);

    return new Response(
      JSON.stringify({
        success: true,
        audio: base64Audio,
        dialogue: generatedDialogue,
        format: outputFormat,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in text-to-dialogue function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY || "Gtj2hLt6k4Mal7nHyeM4QENORWuwU0P1";
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

interface MistralMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessageToMistral(
  messages: ChatMessage[],
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const mistralMessages: MistralMessage[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];

  const response = await fetch(MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: mistralMessages,
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mistral API error (${response.status}): ${errorText}`);
  }

  const data: MistralResponse = await response.json();
  return data.choices[0].message.content;
}

export function buildMatchesContext(matches: any[], lang: 'fr' | 'en'): string {
  if (!matches || matches.length === 0) {
    return lang === 'fr'
      ? "L'utilisateur n'a actuellement aucun match actif.\n\n"
      : "The user currently has no active matches.\n\n";
  }

  const intro = lang === 'fr'
    ? "Voici les matchs actuels de l'utilisateur (clubs intéressés):\n"
    : "Here are the user's current matches (interested clubs):\n";

  const matchesList = matches.map((m, index) => {
    return `${index + 1}. ${m.name}: ${m.lastMessage?.preview?.[lang] || m.lastMessage?.preview || 'Nouveau match'}`;
  }).join('\n');

  return `${intro}${matchesList}\n\n`;
}

export function getSystemPrompt(matchesContext: string, lang: 'fr' | 'en'): string {
  if (lang === 'fr') {
    return `Tu es un assistant personnel spécialisé dans le conseil sportif et les négociations de contrats pour les athlètes. 

Ton rôle est d'aider les sportifs à:
- Analyser leurs opportunités de matchs avec des clubs
- Préparer leurs négociations de contrat
- Comprendre les offres et propositions des clubs
- Prendre des décisions éclairées sur leur carrière
- Gérer leur stress et leur confiance lors des négociations

${matchesContext}

Sois professionnel, encourageant et donne des conseils pratiques et concrets. Pose des questions pour mieux comprendre la situation si nécessaire. Réponds de manière concise et structurée.`;
  } else {
    return `You are a personal assistant specialized in sports counseling and contract negotiations for athletes.

Your role is to help athletes:
- Analyze their match opportunities with clubs
- Prepare for contract negotiations
- Understand offers and proposals from clubs
- Make informed decisions about their career
- Manage their stress and confidence during negotiations

${matchesContext}

Be professional, encouraging, and provide practical, concrete advice. Ask questions to better understand the situation if necessary. Respond concisely and in a structured way.`;
  }
}


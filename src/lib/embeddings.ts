import { ClubProfile, PlayerProfile } from "@/types/matching.types";

/**
 * Generate embedding vector for a club profile
 * Uses Lovable AI (or OpenAI) to create semantic embeddings
 */
export async function generateClubEmbedding(
  club: ClubProfile['metadata']
): Promise<number[]> {
  // Create a textual description of the club for embedding
  const description = `
    Club: ${club.name}
    Division: ${club.division}
    Recherche: ${club.recruitmentNeeds.positions.join(', ')}
    Budget: ${club.budget.min}-${club.budget.max}€/mois
    Style de jeu: ${club.playingStyle.join(', ')}
    Culture: ${club.teamCulture.join(', ')}
    Installations: ${club.facilities.join(', ')}
    Niveau: ${club.recruitmentNeeds.experienceLevel}
  `.trim();
  
  try {
    // Call edge function to generate embedding
    const response = await fetch('/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: description, type: 'club' })
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate embedding');
    }
    
    const { embedding } = await response.json();
    return embedding;
  } catch (error) {
    console.error('Error generating club embedding:', error);
    // Return zero vector as fallback
    return new Array(1536).fill(0);
  }
}

/**
 * Generate embedding vector for a player profile
 */
export async function generatePlayerEmbedding(
  player: Partial<PlayerProfile['metadata']>
): Promise<number[]> {
  // Create a textual description of the player for embedding
  const description = `
    Joueur: ${player.name || 'Unknown'}
    Position: ${player.position || 'Unknown'}
    Niveau: ${player.level || 'Unknown'}
    Expérience: ${player.experienceYears || 0} ans
    Points forts: ${player.strengths?.join(', ') || 'None'}
    Style de jeu: ${player.playingStyle?.join(', ') || 'None'}
    Personnalité: ${player.personality?.join(', ') || 'None'}
    Divisions souhaitées: ${player.careerGoals?.desiredDivision?.join(', ') || 'None'}
    Budget: ${player.careerGoals?.salaryExpectation?.min || 0}-${player.careerGoals?.salaryExpectation?.max || 0}€
    Mobilité: ${player.careerGoals?.willingToRelocate ? 'Oui' : 'Non'}
  `.trim();
  
  try {
    // Call edge function to generate embedding
    const response = await fetch('/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: description, type: 'player' })
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate embedding');
    }
    
    const { embedding } = await response.json();
    return embedding;
  } catch (error) {
    console.error('Error generating player embedding:', error);
    // Return zero vector as fallback
    return new Array(1536).fill(0);
  }
}

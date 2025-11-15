import { PlayerProfile, ClubProfile, MatchScore } from "@/types/matching.types";

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

// Calculate distance between two cities (simplified Haversine)
function calculateDistance(cityA: string, cityB: string): number {
  // In production, use a proper geocoding service
  // For now, return a placeholder
  return Math.floor(Math.random() * 500);
}

export async function calculateMatchScore(
  playerProfile: PlayerProfile,
  clubProfile: ClubProfile
): Promise<MatchScore> {
  const scores = {
    positionMatch: 0,
    levelMatch: 0,
    budgetMatch: 0,
    locationMatch: 0,
    styleMatch: 0,
  };
  
  const reasoning: string[] = [];
  
  // 1. Position Match (25 points)
  const playerPositions = [
    playerProfile.metadata.position,
    ...playerProfile.metadata.secondaryPositions
  ];
  const clubNeeds = clubProfile.metadata.recruitmentNeeds.positions;
  
  if (clubNeeds.includes(playerProfile.metadata.position)) {
    scores.positionMatch = 25;
    reasoning.push(`Position principale recherchée: ${playerProfile.metadata.position}`);
  } else if (playerPositions.some(pos => clubNeeds.includes(pos))) {
    scores.positionMatch = 15;
    reasoning.push("Une de tes positions secondaires correspond");
  }
  
  // 2. Level Match (25 points)
  const levelMapping = { "amateur": 1, "semi-pro": 2, "professional": 3 };
  const playerLevel = levelMapping[playerProfile.metadata.level];
  const clubLevel = levelMapping[clubProfile.metadata.recruitmentNeeds.experienceLevel];
  
  if (playerLevel === clubLevel) {
    scores.levelMatch = 25;
    reasoning.push("Niveau d'expérience parfaitement aligné");
  } else if (Math.abs(playerLevel - clubLevel) === 1) {
    scores.levelMatch = 15;
    reasoning.push("Niveau proche de celui recherché");
  }
  
  // 3. Budget Match (20 points)
  const playerMin = playerProfile.metadata.careerGoals.salaryExpectation.min;
  const playerMax = playerProfile.metadata.careerGoals.salaryExpectation.max;
  const clubMin = clubProfile.metadata.budget.min;
  const clubMax = clubProfile.metadata.budget.max;
  
  if (playerMin <= clubMax && playerMax >= clubMin) {
    const overlap = Math.min(clubMax, playerMax) - Math.max(clubMin, playerMin);
    const total = Math.max(clubMax, playerMax) - Math.min(clubMin, playerMin);
    scores.budgetMatch = (overlap / total) * 20;
    reasoning.push(`Budget compatible: ${clubMin}-${clubMax}€`);
  }
  
  // 4. Location Match (15 points)
  if (!playerProfile.metadata.careerGoals.willingToRelocate) {
    const distance = calculateDistance(
      playerProfile.metadata.city,
      clubProfile.metadata.city
    );
    const maxDist = playerProfile.metadata.careerGoals.maxDistanceKm;
    if (distance <= maxDist) {
      scores.locationMatch = 15;
      reasoning.push(`À seulement ${distance}km de chez toi`);
    }
  } else {
    scores.locationMatch = 15;
    reasoning.push("Tu es ouvert à la mobilité");
  }
  
  // 5. Style Match (15 points) - Based on vector similarity
  if (playerProfile.vector.length > 0 && clubProfile.vector.length > 0) {
    const vectorSimilarity = cosineSimilarity(
      playerProfile.vector,
      clubProfile.vector
    );
    scores.styleMatch = vectorSimilarity * 15;
    
    if (vectorSimilarity > 0.8) {
      reasoning.push("Excellent fit culturel et style de jeu");
    } else if (vectorSimilarity > 0.6) {
      reasoning.push("Bon fit culturel");
    }
  }
  
  const totalScore = Math.round(
    Object.values(scores).reduce((sum, score) => sum + score, 0)
  );
  
  return {
    totalScore,
    breakdown: scores,
    reasoning
  };
}

#!/usr/bin/env python
"""
Client Qdrant pour effectuer des recherches sémantiques sur la collection clubs.
Peut être utilisé en ligne de commande ou importé comme module.
"""
import os
import sys
from typing import List, Dict, Any

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Document

load_dotenv()

# --- Config ----------------------------------------------------

QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
VECTOR_NAME = f"fast-{EMBEDDING_MODEL.split('/')[-1].lower()}"


# --- Main Functions --------------------------------------------


def search_clubs(query: str, limit: int = 5, score_threshold: float = None) -> List[Dict[str, Any]]:
    """
    Effectue une recherche sémantique sur la collection clubs.
    
    Args:
        query: La requête de recherche en langage naturel
        limit: Nombre maximum de résultats à retourner
        score_threshold: Score minimum pour filtrer les résultats (optionnel)
    
    Returns:
        Liste de dictionnaires contenant les résultats avec metadata et scores
    """
    # Initialiser le client Qdrant
    qdrant_client = QdrantClient(
        url=QDRANT_URL, 
        api_key=QDRANT_API_KEY, 
        prefer_grpc=True, 
        timeout=30
    )
    
    try:
        # Effectuer la recherche
        results = qdrant_client.query_points(
            collection_name=COLLECTION_NAME,
            query=Document(text=query, model=EMBEDDING_MODEL),
            using=VECTOR_NAME,
            limit=limit,
            score_threshold=score_threshold,
        )
        
        # Formater les résultats
        formatted_results = []
        for result in results.points:
            formatted_results.append({
                "id": result.id,
                "score": result.score,
                "club_name": result.payload['metadata'].get('club_name', 'N/A'),
                "city": result.payload['metadata'].get('city', 'N/A'),
                "country": result.payload['metadata'].get('country', 'N/A'),
                "division": result.payload['metadata'].get('division', 'N/A'),
                "description": result.payload['metadata'].get('description', ''),
                "playing_style": result.payload['metadata'].get('playing_style', ''),
                "team_culture": result.payload['metadata'].get('team_culture', ''),
                "facilities": result.payload['metadata'].get('facilities', ''),
                "recruitment_needs": result.payload['metadata'].get('recruitment_needs', ''),
                "budget": result.payload['metadata'].get('budget', ''),
                "document": result.payload.get('document', ''),
                "metadata": result.payload['metadata']  # Toutes les métadonnées brutes
            })
        
        return formatted_results
    
    finally:
        qdrant_client.close()


def print_results(results: List[Dict[str, Any]], query: str = None):
    """
    Affiche les résultats de manière formatée.
    
    Args:
        results: Liste des résultats retournés par search_clubs()
        query: La requête originale (optionnel, pour l'affichage)
    """
    if query:
        print(f"\n🔍 Recherche: '{query}'")
    
    print(f"\n📊 {len(results)} résultat(s) trouvé(s)\n")
    print("=" * 80)
    
    for idx, result in enumerate(results, 1):
        print(f"\n{idx}. {result['club_name']} ({result['city']}, {result['country']})")
        print(f"   📍 Division: {result['division']}")
        print(f"   ⭐ Score: {result['score']:.4f}")
        
        if result['description']:
            print(f"   📝 {result['description']}")
        
        if result['playing_style']:
            print(f"   🎮 Style: {result['playing_style']}")
        
        if result['team_culture']:
            print(f"   🏆 Culture: {result['team_culture']}")
        
        if result['facilities']:
            print(f"   🏟️  Installations: {result['facilities']}")
        
        if result['recruitment_needs']:
            print(f"   👥 Recrutement: {result['recruitment_needs']}")
        
        if result['budget']:
            print(f"   💰 Budget: {result['budget']}")
        
        print()
    
    print("=" * 80)


# --- CLI Interface ---------------------------------------------


def main():
    """
    Point d'entrée pour l'utilisation en ligne de commande.
    """
    if len(sys.argv) < 2:
        print("Usage: python qdrant_client.py '<votre requête>' [limit] [score_threshold]")
        print("\nExemples:")
        print("  python qdrant_client.py 'club de football professionnel'")
        print("  python qdrant_client.py 'club de basket à Paris' 3")
        print("  python qdrant_client.py 'club avec bonnes installations' 5 0.7")
        sys.exit(1)
    
    query = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    score_threshold = float(sys.argv[3]) if len(sys.argv) > 3 else None
    
    print(f"🚀 Recherche de clubs dans Qdrant...")
    print(f"   Collection: {COLLECTION_NAME}")
    print(f"   Modèle: {EMBEDDING_MODEL}")
    
    results = search_clubs(query, limit=limit, score_threshold=score_threshold)
    print_results(results, query)


if __name__ == "__main__":
    main()


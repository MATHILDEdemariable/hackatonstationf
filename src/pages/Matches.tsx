import { Search, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import SuggestedClubs from "@/components/SuggestedClubs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface Match {
  id: string;
  club_id: string;
  club_name: string;
  logo_url: string | null;
  status: string;
  match_score: number | null;
  lastMessage?: {
    content: string;
    timestamp: string;
  };
  unreadCount: number;
}

interface SuggestedClub {
  id: string;
  score: number;
  club_name: string;
  city: string;
  country: string;
  division: string;
  description: string;
  playing_style: string;
  team_culture: string;
  facilities: string;
  recruitment_needs: string;
  budget: string;
  logo_url?: string;
}

export default function Matches() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedClubs, setSuggestedClubs] = useState<SuggestedClub[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const loadMatches = () => {
      // Load matches from localStorage for demo
      const storedMatches = localStorage.getItem('demoMatches');
      
      if (storedMatches) {
        try {
          const parsedMatches = JSON.parse(storedMatches);
          setMatches(parsedMatches);
          console.log('Matches loaded from localStorage:', parsedMatches);
        } catch (error) {
          console.error('Error parsing matches:', error);
        }
      }
      
      setLoading(false);
    };

    loadMatches();
    loadSuggestions();
  }, [lang]);

  const loadSuggestions = () => {
    // Mock suggestions for demo
    const mockSuggestions: SuggestedClub[] = [
      {
        id: 'club-1',
        score: 0.92,
        club_name: 'FC Toulouse',
        city: 'Toulouse',
        country: 'France',
        division: 'National 2',
        description: 'Club ambitieux cherchant des talents pour monter en National 1',
        playing_style: 'Jeu de possession, pressing haut',
        team_culture: 'Esprit familial et compétitif',
        facilities: 'Terrain synthétique, salle de musculation',
        recruitment_needs: 'Milieu offensif',
        budget: '1500-2000€/mois',
        logo_url: '🏟️'
      },
      {
        id: 'club-2',
        score: 0.88,
        club_name: 'AS Lyon Nord',
        city: 'Lyon',
        country: 'France',
        division: 'Régional 1',
        description: 'Club en pleine croissance avec de belles perspectives',
        playing_style: 'Jeu direct et rapide',
        team_culture: 'Jeune et dynamique',
        facilities: 'Terrain naturel, vestiaires modernes',
        recruitment_needs: 'Milieu de terrain',
        budget: '800-1200€/mois',
        logo_url: '⚽'
      },
      {
        id: 'club-3',
        score: 0.85,
        club_name: 'Bordeaux SC',
        city: 'Bordeaux',
        country: 'France',
        division: 'National 3',
        description: 'Formation de qualité et encadrement professionnel',
        playing_style: 'Jeu technique et collectif',
        team_culture: 'Accent sur le développement',
        facilities: 'Centre d\'entraînement complet',
        recruitment_needs: 'Milieu polyvalent',
        budget: '1000-1500€/mois',
        logo_url: '🎯'
      }
    ];
    
    setSuggestedClubs(mockSuggestions);
    setLoadingSuggestions(false);
  };

  const filteredMatches = matches.filter(match => 
    match.club_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Séparer les clubs likés (pending) des autres matches
  const likedClubs = filteredMatches.filter(m => m.status === 'pending');
  const activeMatches = filteredMatches.filter(m => m.status !== 'pending');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des matchs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t('matches.title')}</h1>
            <p className="text-sm text-muted-foreground">
              {matches.length} conversation{matches.length > 1 ? "s" : ""}
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            {matches.filter(m => m.unreadCount > 0).length} {lang === 'fr' ? 'nouveaux' : 'new'}
          </Badge>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder={lang === 'fr' ? "Rechercher un match..." : "Search a match..."} 
            className="pl-10 h-12 rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Liked Clubs Section */}
        {likedClubs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              ❤️ {lang === 'fr' ? 'Clubs likés' : 'Liked clubs'} ({likedClubs.length})
            </h2>
            <div className="space-y-3">
              {likedClubs.map((match) => (
                <div
                  key={match.id}
                  className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border border-red-200 dark:border-red-800"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 bg-gradient-sport rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                      {match.logo_url || '🏆'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold truncate">{match.club_name}</h3>
                        <Badge 
                          variant="default" 
                          className="bg-red-500 text-white px-2 py-0.5 text-xs"
                        >
                          ❤️ {lang === 'fr' ? 'Liké' : 'Liked'}
                        </Badge>
                        {match.match_score && (
                          <Badge variant="outline" className="text-xs">
                            {Math.round(match.match_score * 100)}% match
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lang === 'fr' ? 'En attente de réponse du club' : 'Waiting for club response'}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Link to={`/app/negotiations/${match.club_id}`}>
                      <Button size="sm" variant="outline" className="border-red-300 hover:bg-red-50">
                        {lang === 'fr' ? 'Voir' : 'View'}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Clubs from Qdrant */}
        {suggestedClubs.length > 0 && (
          <div className="mb-6">
            <SuggestedClubs 
              clubs={suggestedClubs}
              maxDisplay={3}
              onViewMore={() => {
                // TODO: Navigate to a full page of suggestions or expand inline
                console.log('Show more suggestions');
              }}
              onLike={(clubId) => {
                // Reload matches when a club is liked
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            />
          </div>
        )}

        {/* Tabs */}
        {activeMatches.length > 0 && (
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                {lang === 'fr' ? 'Conversations' : 'Conversations'} ({activeMatches.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="flex-1">
                {lang === 'fr' ? 'Actifs' : 'Active'} ({activeMatches.filter(m => m.status === 'active').length})
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex-1">
                {lang === 'fr' ? 'Archivés' : 'Archived'} ({activeMatches.filter(m => m.status === 'archived').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Active Matches List */}
        {activeMatches.length === 0 && likedClubs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === 'fr' ? 'Aucun match trouvé' : 'No matches found'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {lang === 'fr' 
                ? 'Complétez votre profil pour recevoir des propositions de clubs' 
                : 'Complete your profile to receive club offers'}
            </p>
          </div>
        ) : activeMatches.length > 0 ? (
          <div className="space-y-3">
            {activeMatches.map((match) => (
              <div
                key={match.id}
                className="bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 bg-gradient-sport rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                    {match.logo_url || '🏆'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold truncate">{match.club_name}</h3>
                      {match.unreadCount > 0 && (
                        <Badge 
                          variant="default" 
                          className="bg-primary text-primary-foreground px-2 py-0.5 text-xs"
                        >
                          {match.unreadCount}
                        </Badge>
                      )}
                    </div>
                    {match.lastMessage ? (
                      <>
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {match.lastMessage.content}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {match.lastMessage.timestamp}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {lang === 'fr' ? 'Aucun message' : 'No messages yet'}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link to={`/app/negotiations/${match.club_id}`}>
                    <Button size="sm" className="bg-gradient-sport text-white hover:shadow-lg transition-all">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {lang === 'fr' ? 'Négocier' : 'Negotiate'}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <BottomNav />
    </div>
  );
}

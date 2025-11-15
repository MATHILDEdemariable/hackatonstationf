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
import { supabase } from "@/integrations/supabase/client";

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

  // Récupérer l'ID utilisateur de démo depuis localStorage
  const demoUserId = localStorage.getItem('demoUserId');

  useEffect(() => {
    const loadMatches = async () => {
      if (!demoUserId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch matches with club details
        const { data: matchesData, error: matchesError } = await supabase
          .from('matches')
          .select(`
            id,
            club_id,
            status,
            match_score,
            club_profiles (
              club_name,
              logo_url
            )
          `)
          .eq('athlete_id', demoUserId)
          .order('created_at', { ascending: false });

        if (matchesError) throw matchesError;

        // For each match, get the last message and count unread messages
        const matchesWithMessages = await Promise.all(
          (matchesData || []).map(async (match) => {
            // Get last message
            const { data: lastMsg } = await supabase
              .from('messages')
              .select('content, created_at')
              .eq('match_id', match.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            // Count unread messages (simplified - in production, track read status)
            const { count } = await supabase
              .from('messages')
              .select('*', { count: 'exact', head: true })
              .eq('match_id', match.id)
              .neq('sender_id', demoUserId);

            const clubProfile = match.club_profiles as any;

            return {
              id: match.id,
              club_id: match.club_id,
              club_name: clubProfile?.club_name || 'Club',
              logo_url: clubProfile?.logo_url || null,
              status: match.status,
              match_score: match.match_score,
              lastMessage: lastMsg ? {
                content: lastMsg.content || '',
                timestamp: new Date(lastMsg.created_at).toLocaleDateString(lang)
              } : undefined,
              unreadCount: count || 0,
            };
          })
        );

        setMatches(matchesWithMessages);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
    loadSuggestions();
  }, [demoUserId, lang]);

  const loadSuggestions = async () => {
    if (!demoUserId) return;
    
    setLoadingSuggestions(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-clubs-qdrant', {
        body: { 
          athlete_id: demoUserId,
          limit: 5
        }
      });

      if (error) {
        console.error('Error loading club suggestions:', error);
        return;
      }

      if (data?.success && data.clubs) {
        setSuggestedClubs(data.clubs);
        console.log('Loaded club suggestions:', data.clubs.length);
      }
    } catch (error) {
      console.error('Error calling Qdrant function:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const filteredMatches = matches.filter(match => 
    match.club_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            />
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              {lang === 'fr' ? 'Tous' : 'All'} ({matches.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex-1">
              {lang === 'fr' ? 'Actifs' : 'Active'} ({matches.filter(m => m.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex-1">
              {lang === 'fr' ? 'Archivés' : 'Archived'} ({matches.filter(m => m.status === 'archived').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
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
        ) : (
          <div className="space-y-3">
            {filteredMatches.map((match) => (
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
        )}
      </div>

      <BottomNav />
    </div>
  );
}

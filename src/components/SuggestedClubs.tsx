import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";

interface Club {
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

interface SuggestedClubsProps {
  clubs: Club[];
  maxDisplay?: number;
  onViewMore?: () => void;
  onLike?: (clubId: string) => void;
}

export default function SuggestedClubs({ clubs, maxDisplay = 3, onViewMore, onLike }: SuggestedClubsProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';
  const [likedClubs, setLikedClubs] = useState<Set<string>>(new Set());
  const [likingClub, setLikingClub] = useState<string | null>(null);
  
  const displayedClubs = clubs.slice(0, maxDisplay);
  const hasMore = clubs.length > maxDisplay;

  const handleLike = async (club: Club) => {
    const demoUserId = localStorage.getItem('demoUserId');
    
    if (!demoUserId) {
      toast.error(lang === 'fr' ? 'Veuillez créer un profil d\'abord' : 'Please create a profile first');
      return;
    }

    if (likedClubs.has(club.id)) {
      toast.info(lang === 'fr' ? 'Club déjà liké' : 'Club already liked');
      return;
    }

    setLikingClub(club.id);

    try {
      // Save to localStorage instead of database
      const storedMatches = localStorage.getItem('demoMatches');
      const matches = storedMatches ? JSON.parse(storedMatches) : [];
      
      const newMatch = {
        id: `match-${Date.now()}`,
        club_id: club.id,
        club_name: club.club_name,
        logo_url: club.logo_url,
        status: 'pending',
        match_score: club.score,
        unreadCount: 0
      };
      
      matches.push(newMatch);
      localStorage.setItem('demoMatches', JSON.stringify(matches));
      console.log('Saved liked club to localStorage:', newMatch);

      setLikedClubs(prev => new Set(prev).add(club.id));
      toast.success(lang === 'fr' ? `${club.club_name} ajouté à vos matchs !` : `${club.club_name} added to your matches!`);
      
      if (onLike) {
        onLike(club.id);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(lang === 'fr' ? 'Erreur lors du like' : 'Error liking club');
    } finally {
      setLikingClub(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {lang === 'fr' ? 'Clubs suggérés pour toi' : 'Suggested clubs for you'}
        </h2>
        {hasMore && onViewMore && (
          <Button variant="ghost" size="sm" onClick={onViewMore}>
            {lang === 'fr' ? `Voir tous (${clubs.length})` : `View all (${clubs.length})`}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {displayedClubs.map((club) => (
          <div
            key={club.id}
            className="bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="w-14 h-14 bg-gradient-sport rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                {club.logo_url || '🏆'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold truncate">{club.club_name}</h3>
                  <Badge 
                    variant="secondary" 
                    className="bg-primary/10 text-primary px-2 py-0.5 text-xs"
                  >
                    {Math.round(club.score * 100)}% match
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {club.city}, {club.country} • {club.division}
                </p>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {club.description}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    {club.recruitment_needs}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {club.budget}
                  </Badge>
                </div>
              </div>

              {/* Action */}
              <Button 
                size="icon" 
                onClick={() => handleLike(club)}
                disabled={likingClub === club.id || likedClubs.has(club.id)}
                className={`${
                  likedClubs.has(club.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gradient-sport text-white hover:shadow-lg'
                } transition-all flex-shrink-0`}
              >
                <Heart 
                  className={`w-4 h-4 ${likedClubs.has(club.id) ? 'fill-current' : ''}`}
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


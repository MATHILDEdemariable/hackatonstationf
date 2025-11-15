import { useState } from "react";
import { X, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

// Mock data
const mockClubs = [
  {
    id: 1,
    name: "FC Toulouse",
    city: "Toulouse",
    division: "National 2",
    matchScore: 92,
    logo: "🏟️",
    banner: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    recruitmentNeeds: { fr: ["Attaquant", "Milieu offensif"], en: ["Striker", "Offensive midfielder"] },
    budget: { min: 1200, max: 1800 },
    squadSize: 22,
    facilities: { 
      fr: ["Terrain synthétique", "Salle de musculation", "Kinésithérapeute"],
      en: ["Synthetic field", "Gym", "Physiotherapist"]
    },
  },
  {
    id: 2,
    name: "AS Lyon Nord",
    city: "Lyon",
    division: "Régional 1",
    matchScore: 85,
    logo: "⚽",
    banner: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
    recruitmentNeeds: { fr: ["Défenseur central", "Milieu défensif"], en: ["Center back", "Defensive midfielder"] },
    budget: { min: 800, max: 1200 },
    squadSize: 19,
    facilities: { 
      fr: ["Terrain naturel", "Vestiaires", "Local médical"],
      en: ["Natural field", "Locker rooms", "Medical room"]
    },
  },
  {
    id: 3,
    name: "Bordeaux Sport Club",
    city: "Bordeaux",
    division: "National 3",
    matchScore: 88,
    logo: "🎯",
    banner: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    recruitmentNeeds: { fr: ["Attaquant", "Ailier"], en: ["Striker", "Winger"] },
    budget: { min: 1000, max: 1500 },
    squadSize: 20,
    facilities: { 
      fr: ["Terrain synthétique", "Salle de musculation", "Analyses vidéo"],
      en: ["Synthetic field", "Gym", "Video analysis"]
    },
  },
];

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const currentClub = mockClubs[currentIndex];
  const hasMoreClubs = currentIndex < mockClubs.length - 1;
  const lang = i18n.language as 'fr' | 'en';

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);

    if (direction === "right") {
      toast({
        title: t('matches.newMatch'),
        description: `${currentClub.name} ${t('matches.interested')}`,
      });
    }

    setTimeout(() => {
      if (hasMoreClubs) {
        setCurrentIndex(currentIndex + 1);
      }
      setSwipeDirection(null);
    }, 300);
  };

  if (!hasMoreClubs && swipeDirection === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-2">{t('discover.noMore')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('discover.noMoreDescription')}
          </p>
          <Button onClick={() => setCurrentIndex(0)}>
            {t('discover.backButton')}
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('discover.title')}</h1>
          <Badge variant="secondary" className="text-sm">
            {mockClubs.length - currentIndex} club{mockClubs.length - currentIndex > 1 ? "s" : ""}
          </Badge>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] mb-6">
          <div 
            className={`absolute inset-0 ${
              swipeDirection === "left" 
                ? "animate-swipe-left" 
                : swipeDirection === "right" 
                  ? "animate-swipe-right" 
                  : ""
            }`}
          >
            {/* Main Card */}
            <div className="bg-card rounded-3xl overflow-hidden shadow-xl h-full flex flex-col">
              {/* Banner with Logo */}
              <div 
                className="h-48 relative flex items-center justify-center"
                style={{ background: currentClub.banner }}
              >
                <div className="text-8xl animate-scale-in">
                  {currentClub.logo}
                </div>
                
                {/* Match Score Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      currentClub.matchScore > 85 ? 'bg-success' : 'bg-secondary'
                    }`} />
                    <span className="font-bold text-sm">{currentClub.matchScore}% match</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Club Name & Location */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{currentClub.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg">📍 {currentClub.city}</span>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-background rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs text-muted-foreground mb-1">{t('discover.division')}</div>
                    <div className="font-semibold text-sm">{currentClub.division}</div>
                  </div>
                  <div className="bg-background rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-xs text-muted-foreground mb-1">{t('discover.budget')}</div>
                    <div className="font-semibold text-sm">
                      {currentClub.budget.min}-{currentClub.budget.max}k€
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">👥</div>
                    <div className="text-xs text-muted-foreground mb-1">{t('discover.squad')}</div>
                    <div className="font-semibold text-sm">
                      {currentClub.squadSize} {t('common.players')}
                    </div>
                  </div>
                </div>

                {/* Recruitment Needs */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    {t('discover.recruiting')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentClub.recruitmentNeeds[lang].map((need, index) => (
                      <Badge 
                        key={index} 
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span>🏟️</span>
                    {t('discover.facilities')}
                  </h3>
                  <ul className="space-y-2">
                    {currentClub.facilities[lang].map((facility, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6">
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => handleSwipe("left")}
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-12 h-12 rounded-full"
          >
            <Info className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-success hover:bg-success/90 text-white"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

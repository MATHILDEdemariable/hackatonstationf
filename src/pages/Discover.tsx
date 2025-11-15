import { useState } from "react";
import { X, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

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
    recruitmentNeeds: ["Attaquant", "Milieu offensif"],
    budget: { min: 1200, max: 1800 },
    squadSize: 22,
    facilities: ["Terrain synthétique", "Salle de musculation", "Kinésithérapeute"],
  },
  {
    id: 2,
    name: "AS Lyon Nord",
    city: "Lyon",
    division: "Régional 1",
    matchScore: 85,
    logo: "⚽",
    banner: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
    recruitmentNeeds: ["Défenseur central", "Milieu défensif"],
    budget: { min: 800, max: 1200 },
    squadSize: 19,
    facilities: ["Terrain naturel", "Vestiaires", "Local médical"],
  },
  {
    id: 3,
    name: "Bordeaux Sport Club",
    city: "Bordeaux",
    division: "National 3",
    matchScore: 88,
    logo: "🎯",
    banner: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    recruitmentNeeds: ["Attaquant", "Ailier"],
    budget: { min: 1000, max: 1500 },
    squadSize: 20,
    facilities: ["Terrain synthétique", "Salle de musculation", "Analyses vidéo"],
  },
];

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const { toast } = useToast();

  const currentClub = mockClubs[currentIndex];
  const hasMoreClubs = currentIndex < mockClubs.length - 1;

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);

    if (direction === "right") {
      toast({
        title: "C'est un Match ! 🎉",
        description: `${currentClub.name} est aussi intéressé !`,
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
          <h2 className="text-2xl font-bold mb-2">Plus de profils</h2>
          <p className="text-muted-foreground mb-6">
            Reviens plus tard pour découvrir de nouveaux clubs
          </p>
          <Button onClick={() => setCurrentIndex(0)}>
            Revoir les profils
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
          <h1 className="text-2xl font-bold">Découvrir</h1>
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
                className="h-48 relative"
                style={{ background: currentClub.banner }}
              >
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 bg-card rounded-3xl flex items-center justify-center text-5xl shadow-lg border-4 border-background">
                    {currentClub.logo}
                  </div>
                </div>
                {/* Match Score */}
                <div className="absolute top-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {currentClub.matchScore}% match
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 pt-16 overflow-y-auto scrollbar-hide">
                <h2 className="text-2xl font-bold mb-1">{currentClub.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{currentClub.division}</Badge>
                  <Badge variant="outline">📍 {currentClub.city}</Badge>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Budget</div>
                    <div className="font-bold text-sm">{currentClub.budget.min}-{currentClub.budget.max}€</div>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Effectif</div>
                    <div className="font-bold text-sm">{currentClub.squadSize} joueurs</div>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Division</div>
                    <div className="font-bold text-sm">{currentClub.division.split(" ")[1]}</div>
                  </div>
                </div>

                {/* Recruitment Needs */}
                <div className="mb-6">
                  <h3 className="font-bold mb-2">🎯 On recherche</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentClub.recruitmentNeeds.map((need) => (
                      <Badge key={need} className="bg-primary/10 text-primary hover:bg-primary/20">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="font-bold mb-2">🏋️ Nos installations</h3>
                  <ul className="space-y-2">
                    {currentClub.facilities.map((facility) => (
                      <li key={facility} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Swipe Overlays */}
            {swipeDirection === "left" && (
              <div className="absolute inset-0 bg-destructive/20 rounded-3xl flex items-center justify-center">
                <X className="w-32 h-32 text-destructive" strokeWidth={3} />
              </div>
            )}
            {swipeDirection === "right" && (
              <div className="absolute inset-0 bg-success/20 rounded-3xl flex items-center justify-center">
                <Heart className="w-32 h-32 text-success" strokeWidth={3} />
              </div>
            )}
          </div>

          {/* Preview Cards (behind) */}
          {hasMoreClubs && currentIndex + 1 < mockClubs.length && (
            <div 
              className="absolute inset-0 bg-card rounded-3xl shadow-lg"
              style={{ 
                top: "8px", 
                scale: "0.95",
                opacity: 0.5,
                zIndex: -1
              }}
            />
          )}
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
            className="w-14 h-14 rounded-full"
          >
            <Info className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-success hover:bg-success/90 text-success-foreground"
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

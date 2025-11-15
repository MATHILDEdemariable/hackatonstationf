import { Edit, MapPin, TrendingUp, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";

const mockProfile = {
  name: "Lucas Martin",
  age: 24,
  position: "Attaquant",
  city: "Lyon",
  level: "Semi-professionnel",
  avatar: "👤",
  coverGradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  stats: {
    goals: 23,
    assists: 12,
    matches: 38,
    minutesPlayed: 2840,
  },
  bio: "Attaquant rapide et technique, passionné de foot depuis l'enfance. À la recherche d'un nouveau challenge en National.",
  achievements: [
    { id: 1, title: "Meilleur buteur Régional 1", year: "2023" },
    { id: 2, title: "Vainqueur Coupe Régionale", year: "2022" },
  ],
  jerseyNumber: 9,
  strongFoot: "Droit",
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto">
        {/* Cover & Avatar */}
        <div 
          className="h-48 relative"
          style={{ background: mockProfile.coverGradient }}
        >
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          >
            <Edit className="w-4 h-4" />
          </Button>

          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 bg-card rounded-3xl flex items-center justify-center text-6xl shadow-xl border-4 border-background">
              {mockProfile.avatar}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 pt-20 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {mockProfile.name}, {mockProfile.age}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-primary text-primary-foreground">
                  {mockProfile.position}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  {mockProfile.city}
                </Badge>
                <Badge variant="secondary">
                  {mockProfile.level}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground mb-6">
            {mockProfile.bio}
          </p>

          {/* Tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="stats" className="flex-1">
                Statistiques
              </TabsTrigger>
              <TabsTrigger value="info" className="flex-1">
                Infos
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">
                Vidéos
              </TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">⚽</div>
                  <div className="text-2xl font-bold text-primary">
                    {mockProfile.stats.goals}
                  </div>
                  <div className="text-sm text-muted-foreground">Buts</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-success">
                    {mockProfile.stats.assists}
                  </div>
                  <div className="text-sm text-muted-foreground">Passes D.</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">🏃</div>
                  <div className="text-2xl font-bold text-secondary">
                    {mockProfile.stats.matches}
                  </div>
                  <div className="text-sm text-muted-foreground">Matchs</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-wellness">
                    {mockProfile.stats.minutesPlayed}
                  </div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-card rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Performance saison</h3>
                </div>
                <div className="h-40 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                  Graphique de performance
                </div>
              </div>
            </TabsContent>

            {/* Info Tab */}
            <TabsContent value="info" className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-md">
                <h3 className="font-bold mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-medium">{mockProfile.position}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Numéro</span>
                    <span className="font-medium">{mockProfile.jerseyNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pied fort</span>
                    <span className="font-medium">{mockProfile.strongFoot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Niveau</span>
                    <span className="font-medium">{mockProfile.level}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-md">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  🏆 Palmarès
                </h3>
                <div className="space-y-3">
                  {mockProfile.achievements.map((ach) => (
                    <div 
                      key={ach.id}
                      className="flex items-start gap-3 p-3 bg-muted rounded-xl"
                    >
                      <div className="text-2xl">🏆</div>
                      <div>
                        <div className="font-medium">{ach.title}</div>
                        <div className="text-sm text-muted-foreground">{ach.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="bg-card rounded-2xl p-6 shadow-md">
                <div className="text-center py-8">
                  <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-bold mb-2">Tes vidéos highlights</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajoute des vidéos pour montrer tes skills
                  </p>
                  <Button variant="outline">
                    Ajouter une vidéo
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

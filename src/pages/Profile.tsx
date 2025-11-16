import { Edit, MapPin, TrendingUp, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

const mockProfile = {
  name: "Lucas Martin",
  age: 24,
  position: { fr: "Attaquant", en: "Striker" },
  city: "Lyon",
  level: { fr: "Semi-professionnel", en: "Semi-professional" },
  avatar: "👤",
  coverGradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  stats: {
    goals: 23,
    assists: 12,
    matches: 38,
    minutesPlayed: 2840,
  },
  bio: {
    fr: "Attaquant rapide et technique, passionné de foot depuis l'enfance. À la recherche d'un nouveau challenge en National.",
    en: "Fast and technical striker, passionate about football since childhood. Looking for a new challenge in National league."
  },
  achievements: [
    { id: 1, title: { fr: "Meilleur buteur Régional 1", en: "Top scorer Regional 1" }, year: "2023" },
    { id: 2, title: { fr: "Vainqueur Coupe Régionale", en: "Regional Cup Winner" }, year: "2022" },
  ],
  jerseyNumber: 9,
  strongFoot: { fr: "Droit", en: "Right" },
};

export default function Profile() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';

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
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/athlete/onboarding'}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              {lang === 'fr' ? 'Mettre à jour mon profil' : 'Update my profile'}
            </Button>
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {mockProfile.name}, {mockProfile.age} {t('common.years')}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-primary text-primary-foreground">
                  {mockProfile.position[lang]}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  {mockProfile.city}
                </Badge>
                <Badge variant="secondary">
                  {mockProfile.level[lang]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground mb-6">
            {mockProfile.bio[lang]}
          </p>

          {/* Tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="stats" className="flex-1">
                {t('profile.tabs.stats')}
              </TabsTrigger>
              <TabsTrigger value="info" className="flex-1">
                {t('profile.tabs.about')}
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">
                {t('profile.tabs.videos')}
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
                  <div className="text-sm text-muted-foreground">{t('profile.stats.goals')}</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-success">
                    {mockProfile.stats.assists}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.assists')}</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">🏃</div>
                  <div className="text-2xl font-bold text-secondary">
                    {mockProfile.stats.matches}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.matches')}</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-wellness">
                    {mockProfile.stats.minutesPlayed}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.minutes')}</div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-card rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">{t('profile.performance')}</h3>
                </div>
                <div className="h-40 bg-gradient-to-r from-primary/5 to-success/5 rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">{lang === 'fr' ? 'Graphique à venir' : 'Chart coming soon'}</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <span>🏆</span>
                  {t('profile.achievements')}
                </h3>
                <div className="space-y-2">
                  {mockProfile.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-card rounded-xl p-4 shadow-sm flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-sport rounded-lg flex items-center justify-center text-xl">
                        🏆
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{achievement.title[lang]}</p>
                        <p className="text-sm text-muted-foreground">{achievement.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Info Tab */}
            <TabsContent value="info" className="space-y-4">
              <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.age')}</span>
                  <span className="font-semibold">{mockProfile.age} {t('common.years')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.location')}</span>
                  <span className="font-semibold">{mockProfile.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.position')}</span>
                  <span className="font-semibold">{mockProfile.position[lang]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.level')}</span>
                  <span className="font-semibold">{mockProfile.level[lang]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.jersey')}</span>
                  <span className="font-semibold">#{mockProfile.jerseyNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.foot')}</span>
                  <span className="font-semibold">{mockProfile.strongFoot[lang]}</span>
                </div>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Add Video Card */}
                <button className="aspect-video bg-card rounded-2xl shadow-md hover:shadow-lg transition-all hover-lift flex flex-col items-center justify-center gap-2">
                  <Video className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('profile.addVideo')}</span>
                </button>

                {/* Placeholder Video Cards */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-video bg-gradient-sport rounded-2xl shadow-md relative overflow-hidden cursor-pointer hover-lift"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[7px] border-y-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

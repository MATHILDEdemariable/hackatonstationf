import { Edit, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  // Mock profile data for demo
  const profile = {
    full_name: 'Demo Athlete',
    age: 24,
    primary_position: 'Midfielder',
    city: 'Paris',
    level: 'Semi-Pro',
    bio: 'Passionné de football depuis mon plus jeune âge, je cherche à rejoindre un club ambitieux pour progresser et atteindre mes objectifs professionnels.',
    stats: {
      goals: 15,
      assists: 10,
      matches_played: 100
    },
    strengths: ['speed', 'dribbling', 'shooting'],
    playing_style: ['attacking', 'fast-paced'],
    nationality: 'France',
    experience_years: 5,
    secondary_positions: ['Forward', 'Winger']
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto">
        {/* Cover & Avatar */}
        <div className="h-48 relative bg-gradient-to-br from-primary to-primary/60">
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          >
            <Edit className="w-4 h-4" />
          </Button>

          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 bg-card rounded-3xl flex items-center justify-center text-6xl shadow-xl border-4 border-background">
              👤
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 pt-20 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {profile.full_name}, {profile.age} ans
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-primary text-primary-foreground">
                  {profile.primary_position}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  {profile.city}
                </Badge>
                <Badge variant="secondary">
                  {profile.level}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground mb-6">
            {profile.bio}
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
              <TabsTrigger value="video" className="flex-1">
                {t('profile.tabs.highlights')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-4 text-center border">
                  <div className="text-3xl font-bold text-primary">{profile.stats.goals}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('profile.stats.goals')}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center border">
                  <div className="text-3xl font-bold text-primary">{profile.stats.assists}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('profile.stats.assists')}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center border">
                  <div className="text-3xl font-bold text-primary">{profile.stats.matches_played}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('profile.stats.matches')}
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-4 border">
                <h3 className="font-semibold mb-3">{t('profile.strengths')}</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.strengths.map((strength, idx) => (
                    <Badge key={idx} variant="secondary">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-4 border">
                <h3 className="font-semibold mb-3">{t('profile.playingStyle')}</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.playing_style.map((style, idx) => (
                    <Badge key={idx} variant="outline">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <div className="bg-card rounded-xl p-4 border">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('profile.info.position')}</span>
                    <span className="font-medium">{profile.primary_position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('profile.info.secondaryPositions')}</span>
                    <span className="font-medium">{profile.secondary_positions.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('profile.info.nationality')}</span>
                    <span className="font-medium">{profile.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('profile.info.experience')}</span>
                    <span className="font-medium">{profile.experience_years} {t('profile.info.years')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('profile.info.level')}</span>
                    <span className="font-medium">{profile.level}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              <div className="bg-card rounded-xl p-8 border text-center">
                <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  {t('profile.highlights.noVideo')}
                </p>
                <Button variant="outline" size="sm">
                  {t('profile.highlights.uploadVideo')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

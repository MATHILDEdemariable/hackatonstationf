import { Edit, MapPin, TrendingUp, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language as 'fr' | 'en';
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('athlete_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Profil non trouvé</div>;
  }

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
                {profile.full_name}, {profile.age} {t('common.years')}
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
            {profile.bio || t('profile.noBio')}
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
                    {profile.stats?.goals || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.goals')}</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-success">
                    {profile.stats?.assists || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.assists')}</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">🏃</div>
                  <div className="text-2xl font-bold text-secondary">
                    {profile.stats?.matches || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.matches')}</div>
                </div>

                <div className="bg-card rounded-2xl p-4 text-center shadow-md">
                  <div className="text-4xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-wellness">
                    {profile.stats?.minutesPlayed || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('profile.stats.minutes')}</div>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  {t('profile.strengths')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.strengths?.map((strength: string, i: number) => (
                    <Badge key={i} variant="secondary">{strength}</Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Info Tab */}
            <TabsContent value="info" className="space-y-4">
              <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.age')}</span>
                  <span className="font-semibold">{profile.age} {t('common.years')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.city')}</span>
                  <span className="font-semibold">{profile.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.position')}</span>
                  <span className="font-semibold">{profile.primary_position}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.level')}</span>
                  <span className="font-semibold">{profile.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('profile.info.strongFoot')}</span>
                  <span className="font-semibold">{profile.dominant_side}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Expérience</span>
                  <span className="font-semibold">{profile.experience_years} ans</span>
                </div>
              </div>
            </TabsContent>
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

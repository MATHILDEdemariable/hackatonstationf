import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Heart, Mic } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-sport rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {t('home.subtitle')}
          </p>
          <p className="text-muted-foreground">
            {t('home.description')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-primary">250+</div>
            <div className="text-xs text-muted-foreground">{t('home.stats.clubs')}</div>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-success">1.2k</div>
            <div className="text-xs text-muted-foreground">{t('home.stats.matches')}</div>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-secondary">98%</div>
            <div className="text-xs text-muted-foreground">{t('home.stats.satisfaction')}</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <Link to="/app/discover">
            <div className="bg-card hover:bg-accent rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{t('home.features.discover.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('home.features.discover.description')}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/app/matches">
            <div className="bg-card hover:bg-accent rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{t('home.features.matches.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('home.features.matches.description')}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/app/wellness">
            <div className="bg-card hover:bg-accent rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wellness/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mic className="w-6 h-6 text-wellness" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{t('home.features.wellness.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('home.features.wellness.description')}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-gradient-sport rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t('home.cta.title')}
          </h2>
          <p className="text-white/90 mb-6">
            {t('home.cta.description')}
          </p>
          <Link to="/app/discover">
            <Button size="lg" variant="secondary" className="w-full">
              {t('home.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Heart, Mic, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Landing() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-sport rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Match&Play</span>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-sport rounded-3xl mb-8 shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/app">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl hover-lift shadow-lg"
              >
                🏃 {t('landing.hero.ctaAthlete')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl hover-lift"
              onClick={() => {
                alert(t('landing.hero.clubComingSoon') || 'Bientôt disponible !');
              }}
            >
              🏟️ {t('landing.hero.ctaClub')}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-md"
            >
              <div className="text-3xl font-bold text-primary mb-1">250+</div>
              <div className="text-sm text-muted-foreground">{t('home.stats.clubs')}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-6 shadow-md"
            >
              <div className="text-3xl font-bold text-success mb-1">1.2k</div>
              <div className="text-sm text-muted-foreground">{t('home.stats.matches')}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 shadow-md"
            >
              <div className="text-3xl font-bold text-secondary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">{t('home.stats.satisfaction')}</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{t('landing.howItWorks.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Athletes */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏃 {t('landing.howItWorks.forAthletes')}
              </h3>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold mb-1">{t('landing.howItWorks.athlete.step1')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.howItWorks.athlete.step1Desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold mb-1">{t('landing.howItWorks.athlete.step2')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.howItWorks.athlete.step2Desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold mb-1">{t('landing.howItWorks.athlete.step3')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.howItWorks.athlete.step3Desc')}</p>
                </div>
              </div>
            </div>

            {/* For Clubs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏟️ {t('landing.howItWorks.forClubs')}
              </h3>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold mb-1">{t('landing.howItWorks.club.step1')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.howItWorks.club.step1Desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold mb-1">{t('landing.howItWorks.club.step2')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.howItWorks.club.step2Desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold mb-1">{t('landing.howItWorks.club.step3')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.howItWorks.club.step3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{t('landing.features.title')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{t('landing.features.matching')}</h3>
              <p className="text-sm text-muted-foreground">{t('landing.features.matchingDesc')}</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-bold mb-2">{t('landing.features.negotiation')}</h3>
              <p className="text-sm text-muted-foreground">{t('landing.features.negotiationDesc')}</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-wellness/10 rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-wellness" />
              </div>
              <h3 className="font-bold mb-2">{t('landing.features.wellness')}</h3>
              <p className="text-sm text-muted-foreground">{t('landing.features.wellnessDesc')}</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">{t('landing.features.stats')}</h3>
              <p className="text-sm text-muted-foreground">{t('landing.features.statsDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-sport py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('landing.cta.subtitle')}
          </p>
          <Link to="/athlete/onboarding">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 rounded-2xl hover-lift shadow-2xl"
            >
              {t('landing.cta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-sport rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">Match&Play</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Match&Play. {t('landing.footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

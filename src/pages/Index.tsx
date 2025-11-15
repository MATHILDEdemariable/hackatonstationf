import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Heart, Mic } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-sport rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Match&Play
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Tinder du Sport 2.0
          </p>
          <p className="text-muted-foreground">
            Trouve ton club idéal + Coach wellness IA
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-primary">250+</div>
            <div className="text-xs text-muted-foreground">Clubs actifs</div>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-success">1.2k</div>
            <div className="text-xs text-muted-foreground">Matchs réalisés</div>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-secondary">98%</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <Link to="/discover">
            <div className="bg-card hover:bg-accent rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Découvrir des clubs</h3>
                  <p className="text-sm text-muted-foreground">
                    Swipe les profils de clubs qui recrutent dans ta région
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/matches">
            <div className="bg-card hover:bg-accent rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Tes matchs</h3>
                  <p className="text-sm text-muted-foreground">
                    Discute avec les clubs intéressés et négocie ton contrat
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/wellness">
            <div className="bg-card hover:bg-accent rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wellness/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mic className="w-6 h-6 text-wellness" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Coach Wellness</h3>
                  <p className="text-sm text-muted-foreground">
                    Ton coach mental vocal IA pour booster ta performance
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-gradient-hero rounded-3xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Prêt à commencer ?</h2>
          <p className="mb-6 opacity-90">
            Commence à swiper et trouve ton club idéal
          </p>
          <Link to="/discover">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-bold px-8"
            >
              Découvrir maintenant
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

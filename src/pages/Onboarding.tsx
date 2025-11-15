import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayerProfile } from "@/types/matching.types";
import { toast } from "sonner";

import { Step1PersonalInfo } from "@/components/onboarding/Step1PersonalInfo";
import { Step2SportProfile } from "@/components/onboarding/Step2SportProfile";
import { Step3Statistics } from "@/components/onboarding/Step3Statistics";
import { Step4Preferences } from "@/components/onboarding/Step4Preferences";
import { Step5PlayingStyle } from "@/components/onboarding/Step5PlayingStyle";

const steps = [
  { number: 1, title: "Infos personnelles", icon: "👤" },
  { number: 2, title: "Profil sportif", icon: "⚽" },
  { number: 3, title: "Statistiques", icon: "📊" },
  { number: 4, title: "Préférences", icon: "🎯" },
  { number: 5, title: "Style de jeu", icon: "⚡" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  // Créer un UUID valide pour la démo
  const [demoUserId] = useState(() => crypto.randomUUID());
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string | null>(null); // Sera récupéré de la DB
  const [formData, setFormData] = useState<Partial<PlayerProfile['metadata']>>({
    stats: {
      goals: 0,
      assists: 0,
      matches: 0,
      minutesPlayed: 0,
      yellowCards: 0,
      redCards: 0,
    },
    secondaryPositions: [],
    strengths: [],
    playingStyle: [],
    personality: [],
  });

  const validateStep = (step: number, data: Partial<PlayerProfile['metadata']>): boolean => {
    // Pour la démo, on rend toutes les étapes optionnelles
    // On vérifie juste qu'au moins un champ principal est rempli
    switch (step) {
      case 1:
        return true; // Au moins le nom serait bien, mais pas obligatoire pour la démo
      case 2:
        return true; // Position, etc. optionnels
      case 3:
        return true; // Stats are optional
      case 4:
        return true; // Préférences optionnelles
      case 5:
        return true; // Strengths optionnels
      default:
        return true;
    }
  };

  const handleNext = async () => {
    // Pour la démo, plus besoin de validation stricte
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      await createPlayerProfile();
    }
  };

  const createPlayerProfile = async () => {
    console.log('Creating profile (DEMO MODE - localStorage only)...', { formData, demoUserId });
    
    toast.loading("Création de ton profil...");
    
    try {
      // Prepare athlete profile data for localStorage (no database)
      const profileData = {
        id: demoUserId,
        sport: 'Football',
        full_name: formData.name || 'Joueur Démo',
        birth_date: formData.birthDate || '2000-01-01',
        age: formData.age || 24,
        nationality: formData.nationality || 'FR',
        city: formData.city || 'Paris',
        primary_position: formData.position || 'Milieu',
        secondary_positions: formData.secondaryPositions || [],
        dominant_side: formData.strongFoot || 'Droit',
        level: formData.level || 'Amateur',
        experience_years: formData.experienceYears || 5,
        stats: formData.stats || { goals: 0, assists: 0, matches: 0, minutesPlayed: 0, yellowCards: 0, redCards: 0 },
        strengths: formData.strengths || ['Vitesse', 'Technique'],
        playing_style: formData.playingStyle || ['Offensif'],
        personality_traits: formData.personality || ['Motivé'],
        career_preferences: formData.careerGoals || { desiredDivision: 'Régional', salaryExpectation: 'Amateur' },
        created_at: new Date().toISOString(),
      };

      console.log('Profile data:', profileData);
      
      // Store in localStorage for demo
      localStorage.setItem('demoUserId', demoUserId);
      localStorage.setItem('demoProfile', JSON.stringify(profileData));
      console.log('Stored profile in localStorage');
      
      // Simulate a small delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));

      toast.dismiss();
      toast.success("Profil créé avec succès ! 🎉");
      
      // Navigate to discover page
      setTimeout(() => {
        navigate('/discover');
      }, 500);
      
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.dismiss();
      toast.error(`Erreur lors de la création du profil: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Progress indicator */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={cn(
                    "flex flex-col items-center gap-1",
                    step.number === currentStep && "text-primary",
                    step.number < currentStep && "text-success"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all",
                    step.number === currentStep && "bg-primary/20 ring-2 ring-primary scale-110",
                    step.number < currentStep && "bg-success/20",
                    step.number > currentStep && "bg-muted"
                  )}>
                    {step.number < currentStep ? "✓" : step.icon}
                  </div>
                  <span className="text-xs font-medium hidden md:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "h-0.5 w-8 mx-2 transition-colors",
                    step.number < currentStep ? "bg-success" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1PersonalInfo 
              key="step1"
              data={formData} 
              onChange={setFormData} 
            />
          )}
          {currentStep === 2 && (
            <Step2SportProfile 
              key="step2"
              data={formData} 
              onChange={setFormData} 
            />
          )}
          {currentStep === 3 && (
            <Step3Statistics 
              key="step3"
              data={formData} 
              onChange={setFormData} 
            />
          )}
          {currentStep === 4 && (
            <Step4Preferences 
              key="step4"
              data={formData} 
              onChange={setFormData} 
            />
          )}
          {currentStep === 5 && (
            <Step5PlayingStyle 
              key="step5"
              data={formData} 
              onChange={setFormData} 
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          className="flex items-center justify-between mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            ← Retour
          </Button>

          <Button onClick={handleNext} size="lg">
            {currentStep === 5 ? "Créer mon profil 🚀" : "Continuer →"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

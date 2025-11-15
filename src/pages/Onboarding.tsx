import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayerProfile } from "@/types/matching.types";
import { generatePlayerEmbedding } from "@/lib/embeddings";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string>('');
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

  useEffect(() => {
    // Wait for loading to complete before checking user
    if (loading) return;
    
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Load sport selection and progress from Supabase if exists
    const loadProgress = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      if (profile?.user_type !== 'athlete') {
        navigate('/club/onboarding');
      }
    };
    
    loadProgress();
  }, [user, loading, navigate]);

  const validateStep = (step: number, data: Partial<PlayerProfile['metadata']>): boolean => {
    switch (step) {
      case 1:
        return !!(data.name && data.age && data.nationality && data.city);
      case 2:
        return !!(data.position && data.strongFoot && data.level && data.experienceYears);
      case 3:
        return true; // Stats are optional
      case 4:
        return !!(data.careerGoals?.desiredDivision && data.careerGoals?.salaryExpectation);
      case 5:
        return !!(data.strengths && data.strengths.length > 0);
      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isValid = validateStep(currentStep, formData);
    
    if (!isValid) {
      toast.error("Merci de remplir tous les champs requis");
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      await createPlayerProfile();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  const createPlayerProfile = async () => {
    if (!user || !selectedSport) {
      toast.error("Session invalide");
      return;
    }

    toast.loading("Création de ton profil...");
    
    try {
      // Generate embedding
      const embedding = await generatePlayerEmbedding(formData);
      
      // Save to athlete_profiles table
      const { error: insertError } = await supabase
        .from('athlete_profiles')
        .insert({
          id: user.id,
          sport_id: selectedSport,
          full_name: formData.name || '',
          birth_date: formData.birthDate || new Date().toISOString(),
          age: formData.age,
          nationality: formData.nationality || '',
          city: formData.city || '',
          primary_position: formData.position || '',
          secondary_positions: formData.secondaryPositions || [],
          dominant_side: formData.strongFoot || '',
          level: formData.level || '',
          experience_years: formData.experienceYears || 0,
          stats: formData.stats || {},
          strengths: formData.strengths || [],
          playing_style: formData.playingStyle || [],
          personality_traits: formData.personality || [],
          career_preferences: formData.careerGoals || {},
          embedding_vector: embedding.join(','),
        });

      if (insertError) throw insertError;

      // Call match-with-clubs edge function
      const { data: matchData, error: matchError } = await supabase.functions.invoke('match-with-clubs', {
        body: { athlete_id: user.id }
      });

      if (matchError) {
        console.error('Matching error:', matchError);
      } else {
        console.log('Matching results:', matchData);
      }

      toast.success("Profil créé avec succès !");
      
      navigate('/discover');
      
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error("Erreur lors de la création du profil");
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

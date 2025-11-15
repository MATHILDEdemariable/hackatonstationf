import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { PlayerProfile } from "@/types/matching.types";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Step5Props {
  data: Partial<PlayerProfile['metadata']>;
  onChange: (data: Partial<PlayerProfile['metadata']>) => void;
}

const strengths = [
  { value: "speed", label: "🏃 Vitesse", emoji: "🏃" },
  { value: "technique", label: "⚽ Technique", emoji: "⚽" },
  { value: "vision", label: "🎯 Vision de jeu", emoji: "🎯" },
  { value: "heading", label: "🤸 Jeu de tête", emoji: "🤸" },
  { value: "shooting", label: "🎯 Tir", emoji: "🎯" },
  { value: "passing", label: "🎪 Passes", emoji: "🎪" },
  { value: "dribbling", label: "🕺 Dribble", emoji: "🕺" },
  { value: "defending", label: "🛡️ Défense", emoji: "🛡️" },
  { value: "physical", label: "💪 Physique", emoji: "💪" },
  { value: "tactical", label: "🧠 Tactique", emoji: "🧠" },
];

const playingStyles = [
  { value: "aggressive", label: "🔥 Agressif" },
  { value: "technical", label: "🎨 Technique" },
  { value: "tactical", label: "♟️ Tactique" },
  { value: "physical", label: "💪 Physique" },
];

const personalities = [
  { value: "leader", label: "👑 Leader" },
  { value: "team_player", label: "🤝 Joueur d'équipe" },
  { value: "competitive", label: "🔥 Compétiteur" },
  { value: "calm", label: "😌 Calme sous pression" },
  { value: "creative", label: "🎨 Créatif" },
  { value: "determined", label: "💪 Déterminé" },
];

export function Step5PlayingStyle({ data, onChange }: Step5Props) {
  const toggleItem = (
    field: 'strengths' | 'playingStyle' | 'personality',
    value: string
  ) => {
    const current = data[field] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onChange({ ...data, [field]: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Ton style de jeu ⚡</h2>
        <p className="text-muted-foreground">
          Décris tes forces et ta personnalité sur le terrain
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Points forts * (Sélectionne au moins 3)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {strengths.map(strength => (
              <Badge
                key={strength.value}
                variant={data.strengths?.includes(strength.value) ? "default" : "outline"}
                className="cursor-pointer text-base py-2 px-3"
                onClick={() => toggleItem('strengths', strength.value)}
              >
                {strength.label}
                {data.strengths?.includes(strength.value) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
          {(data.strengths?.length || 0) < 3 && (
            <p className="text-xs text-muted-foreground mt-1">
              Sélectionne au moins 3 points forts
            </p>
          )}
        </div>

        <div>
          <Label>Style de jeu (optionnel)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {playingStyles.map(style => (
              <Badge
                key={style.value}
                variant={data.playingStyle?.includes(style.value) ? "default" : "outline"}
                className="cursor-pointer text-base py-2 px-3"
                onClick={() => toggleItem('playingStyle', style.value)}
              >
                {style.label}
                {data.playingStyle?.includes(style.value) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Personnalité (optionnel)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {personalities.map(pers => (
              <Badge
                key={pers.value}
                variant={data.personality?.includes(pers.value) ? "default" : "outline"}
                className="cursor-pointer text-base py-2 px-3"
                onClick={() => toggleItem('personality', pers.value)}
              >
                {pers.label}
                {data.personality?.includes(pers.value) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-lg mb-2">🎉 Dernière étape !</h3>
          <p className="text-sm text-muted-foreground">
            Tu es sur le point de créer ton profil. Nous allons l'analyser avec notre IA pour 
            te proposer les clubs qui correspondent le mieux à ton profil !
          </p>
        </div>
      </div>
    </motion.div>
  );
}

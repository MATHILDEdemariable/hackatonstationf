import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerProfile } from "@/types/matching.types";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Step2Props {
  data: Partial<PlayerProfile['metadata']>;
  onChange: (data: Partial<PlayerProfile['metadata']>) => void;
}

const positions = [
  { value: "striker", label: "Attaquant" },
  { value: "midfielder", label: "Milieu" },
  { value: "defender", label: "Défenseur" },
  { value: "goalkeeper", label: "Gardien" },
];

export function Step2SportProfile({ data, onChange }: Step2Props) {
  const toggleSecondaryPosition = (position: string) => {
    const current = data.secondaryPositions || [];
    const updated = current.includes(position)
      ? current.filter(p => p !== position)
      : [...current, position];
    onChange({ ...data, secondaryPositions: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Ton profil sportif ⚽</h2>
        <p className="text-muted-foreground">
          Parle-nous de ton expérience sur le terrain
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="position">Position principale *</Label>
          <Select
            value={data.position}
            onValueChange={(val) => onChange({ ...data, position: val })}
          >
            <SelectTrigger id="position">
              <SelectValue placeholder="Sélectionne ta position..." />
            </SelectTrigger>
            <SelectContent>
              {positions.map(pos => (
                <SelectItem key={pos.value} value={pos.value}>
                  {pos.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Positions secondaires (optionnel)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {positions
              .filter(p => p.value !== data.position)
              .map(pos => (
                <Badge
                  key={pos.value}
                  variant={data.secondaryPositions?.includes(pos.value) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSecondaryPosition(pos.value)}
                >
                  {pos.label}
                  {data.secondaryPositions?.includes(pos.value) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
          </div>
        </div>

        <div>
          <Label htmlFor="strongFoot">Pied fort *</Label>
          <Select
            value={data.strongFoot}
            onValueChange={(val: "left" | "right" | "both") => 
              onChange({ ...data, strongFoot: val })
            }
          >
            <SelectTrigger id="strongFoot">
              <SelectValue placeholder="Quel est ton pied fort ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Gauche</SelectItem>
              <SelectItem value="right">Droit</SelectItem>
              <SelectItem value="both">Les deux</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="level">Niveau actuel *</Label>
          <Select
            value={data.level}
            onValueChange={(val: "amateur" | "semi-pro" | "professional") => 
              onChange({ ...data, level: val })
            }
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="À quel niveau joues-tu ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amateur">Amateur</SelectItem>
              <SelectItem value="semi-pro">Semi-professionnel</SelectItem>
              <SelectItem value="professional">Professionnel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="experience">Années d'expérience *</Label>
          <Input
            id="experience"
            type="number"
            min="0"
            max="40"
            value={data.experienceYears || ""}
            onChange={(e) => onChange({ 
              ...data, 
              experienceYears: parseInt(e.target.value) || 0 
            })}
            placeholder="5"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}

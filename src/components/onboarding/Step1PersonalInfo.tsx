import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerProfile } from "@/types/matching.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface Step1Props {
  data: Partial<PlayerProfile['metadata']>;
  onChange: (data: Partial<PlayerProfile['metadata']>) => void;
}

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export function Step1PersonalInfo({ data, onChange }: Step1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Bienvenue ! 👋</h2>
        <p className="text-muted-foreground">
          Commençons par quelques infos sur toi
        </p>
      </div>

      {/* Avatar Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={data.avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {data.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={data.name || ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Jean Dupont"
            required
          />
        </div>

        <div>
          <Label htmlFor="birthDate">Date de naissance *</Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate || ""}
            onChange={(e) => {
              const age = calculateAge(e.target.value);
              onChange({ ...data, birthDate: e.target.value, age });
            }}
            max={new Date().toISOString().split('T')[0]}
            required
          />
          {data.age && (
            <p className="text-xs text-muted-foreground mt-1">{data.age} ans</p>
          )}
        </div>

        <div>
          <Label htmlFor="nationality">Nationalité *</Label>
          <Select
            value={data.nationality}
            onValueChange={(val) => onChange({ ...data, nationality: val })}
          >
            <SelectTrigger id="nationality">
              <SelectValue placeholder="Sélectionne..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FR">🇫🇷 France</SelectItem>
              <SelectItem value="BE">🇧🇪 Belgique</SelectItem>
              <SelectItem value="CH">🇨🇭 Suisse</SelectItem>
              <SelectItem value="ES">🇪🇸 Espagne</SelectItem>
              <SelectItem value="IT">🇮🇹 Italie</SelectItem>
              <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
              <SelectItem value="DE">🇩🇪 Allemagne</SelectItem>
              <SelectItem value="GB">🇬🇧 Royaume-Uni</SelectItem>
              <SelectItem value="OTHER">🌍 Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">Ville actuelle *</Label>
          <Input
            id="city"
            value={data.city || ""}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            placeholder="Paris"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}

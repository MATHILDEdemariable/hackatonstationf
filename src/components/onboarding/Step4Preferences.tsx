import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerProfile } from "@/types/matching.types";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface Step4Props {
  data: Partial<PlayerProfile['metadata']>;
  onChange: (data: Partial<PlayerProfile['metadata']>) => void;
}

const divisions = [
  "Ligue 1",
  "Ligue 2",
  "National 1",
  "National 2",
  "National 3",
  "Régional 1",
  "Régional 2",
  "Régional 3"
];

export function Step4Preferences({ data, onChange }: Step4Props) {
  const careerGoals = data.careerGoals || {
    desiredDivision: [],
    salaryExpectation: { min: 800, max: 2000 },
    willingToRelocate: false,
    maxDistanceKm: 50,
    contractDuration: "medium"
  };

  const toggleDivision = (division: string) => {
    const current = careerGoals.desiredDivision || [];
    const updated = current.includes(division)
      ? current.filter(d => d !== division)
      : [...current, division];
    
    onChange({
      ...data,
      careerGoals: { ...careerGoals, desiredDivision: updated }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Tes préférences 🎯</h2>
        <p className="text-muted-foreground">
          Aide-nous à trouver le club parfait pour toi
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Divisions souhaitées *</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {divisions.map(div => (
              <Badge
                key={div}
                variant={careerGoals.desiredDivision.includes(div) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleDivision(div)}
              >
                {div}
                {careerGoals.desiredDivision.includes(div) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
          {careerGoals.desiredDivision.length === 0 && (
            <p className="text-xs text-destructive mt-1">Sélectionne au moins une division</p>
          )}
        </div>

        <div>
          <Label>Attentes salariales (€/mois) *</Label>
          <div className="space-y-4 mt-2">
            <Slider
              min={0}
              max={5000}
              step={100}
              value={[careerGoals.salaryExpectation.min, careerGoals.salaryExpectation.max]}
              onValueChange={([min, max]) => {
                onChange({
                  ...data,
                  careerGoals: {
                    ...careerGoals,
                    salaryExpectation: { min, max }
                  }
                });
              }}
            />
            <div className="flex justify-between text-sm">
              <span className="font-medium">{careerGoals.salaryExpectation.min}€</span>
              <span className="font-medium">{careerGoals.salaryExpectation.max}€</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="relocate">Prêt à déménager ?</Label>
            <p className="text-xs text-muted-foreground">
              Es-tu ouvert à changer de ville ?
            </p>
          </div>
          <Switch
            id="relocate"
            checked={careerGoals.willingToRelocate}
            onCheckedChange={(checked) => {
              onChange({
                ...data,
                careerGoals: { ...careerGoals, willingToRelocate: checked }
              });
            }}
          />
        </div>

        {!careerGoals.willingToRelocate && (
          <div>
            <Label htmlFor="maxDistance">Distance maximum (km)</Label>
            <Input
              id="maxDistance"
              type="number"
              min="0"
              max="500"
              value={careerGoals.maxDistanceKm}
              onChange={(e) => {
                onChange({
                  ...data,
                  careerGoals: {
                    ...careerGoals,
                    maxDistanceKm: parseInt(e.target.value) || 0
                  }
                });
              }}
              placeholder="50"
            />
          </div>
        )}

        <div>
          <Label htmlFor="contractDuration">Durée de contrat souhaitée</Label>
          <Select
            value={careerGoals.contractDuration}
            onValueChange={(val: "short" | "medium" | "long") => {
              onChange({
                ...data,
                careerGoals: { ...careerGoals, contractDuration: val }
              });
            }}
          >
            <SelectTrigger id="contractDuration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Court terme (6 mois)</SelectItem>
              <SelectItem value="medium">Moyen terme (1-2 ans)</SelectItem>
              <SelectItem value="long">Long terme (2+ ans)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="startDate">Date de disponibilité</Label>
          <Input
            id="startDate"
            type="date"
            value={data.availability?.startDate || ""}
            onChange={(e) => {
              onChange({
                ...data,
                availability: {
                  immediate: e.target.value === new Date().toISOString().split('T')[0],
                  startDate: e.target.value,
                  commitmentLevel: "full_time"
                }
              });
            }}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
    </motion.div>
  );
}

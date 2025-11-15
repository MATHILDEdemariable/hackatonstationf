import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayerProfile } from "@/types/matching.types";

interface Step3Props {
  data: Partial<PlayerProfile['metadata']>;
  onChange: (data: Partial<PlayerProfile['metadata']>) => void;
}

export function Step3Statistics({ data, onChange }: Step3Props) {
  const updateStats = (field: keyof PlayerProfile['metadata']['stats'], value: number) => {
    onChange({
      ...data,
      stats: {
        ...data.stats!,
        [field]: value
      }
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
        <h2 className="text-3xl font-bold mb-2">Tes statistiques 📊</h2>
        <p className="text-muted-foreground">
          Partage tes performances (saison actuelle ou dernière saison)
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="matches">Matchs joués</Label>
            <Input
              id="matches"
              type="number"
              min="0"
              value={data.stats?.matches || ""}
              onChange={(e) => updateStats('matches', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="minutes">Minutes jouées</Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              value={data.stats?.minutesPlayed || ""}
              onChange={(e) => updateStats('minutesPlayed', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="goals">Buts marqués</Label>
            <Input
              id="goals"
              type="number"
              min="0"
              value={data.stats?.goals || ""}
              onChange={(e) => updateStats('goals', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="assists">Passes décisives</Label>
            <Input
              id="assists"
              type="number"
              min="0"
              value={data.stats?.assists || ""}
              onChange={(e) => updateStats('assists', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="yellowCards">Cartons jaunes</Label>
            <Input
              id="yellowCards"
              type="number"
              min="0"
              value={data.stats?.yellowCards || ""}
              onChange={(e) => updateStats('yellowCards', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="redCards">Cartons rouges</Label>
            <Input
              id="redCards"
              type="number"
              min="0"
              value={data.stats?.redCards || ""}
              onChange={(e) => updateStats('redCards', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 Ces statistiques sont optionnelles mais aident les clubs à mieux évaluer ton profil
          </p>
        </div>
      </div>
    </motion.div>
  );
}

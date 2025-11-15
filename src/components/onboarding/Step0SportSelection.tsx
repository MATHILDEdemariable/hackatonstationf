import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface Sport {
  id: string;
  name: string;
  category: string;
  icon: string;
}

interface Step0SportSelectionProps {
  data: any;
  onChange: (data: any) => void;
}

export default function Step0SportSelection({ data, onChange }: Step0SportSelectionProps) {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSports = async () => {
      const { data: sportsData, error } = await supabase
        .from('sports')
        .select('*')
        .order('name');

      if (!error && sportsData) {
        setSports(sportsData);
      }
      setLoading(false);
    };

    fetchSports();
  }, []);

  if (loading) {
    return <div className="text-center">Chargement des sports...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Quel est ton sport ? 🏆</h2>
        <p className="text-muted-foreground">Choisis ton sport principal</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sports.map((sport) => (
          <Card
            key={sport.id}
            onClick={() => onChange({ ...data, sport_id: sport.id, sport_name: sport.name })}
            className={`cursor-pointer transition-all hover:scale-105 p-6 ${
              data.sport_id === sport.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-accent'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl">{sport.icon}</div>
              <h3 className="font-semibold text-center">{sport.name}</h3>
              <span className="text-xs text-muted-foreground capitalize">{sport.category}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Euro, Calendar, Gift, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  offer: {
    status: 'pending' | 'accepted' | 'rejected' | 'counter_offered';
    salary: number;
    duration: number;
    bonuses: string[];
    housing: boolean;
    insurance: boolean;
    transportation: boolean;
    startDate: string;
  };
  from: 'club' | 'player';
  timestamp: Date;
  onAccept: () => void;
  onReject: () => void;
  onCounter: () => void;
}

export default function OfferCard({ offer, from, timestamp, onAccept, onReject, onCounter }: OfferCardProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? fr : enUS;

  const isFromClub = from === 'club';

  return (
    <div className={cn("flex", isFromClub ? "justify-start" : "justify-end")}>
      <div className={cn(
        "max-w-[85%] rounded-2xl p-4 shadow-md",
        isFromClub ? "bg-card" : "bg-primary/10"
      )}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            💼
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">{t('negotiations.offer.title')}</h3>
            <p className="text-xs text-muted-foreground">
              {format(timestamp, 'dd MMM, HH:mm', { locale })}
            </p>
          </div>
          {offer.status !== 'pending' && (
            <Badge variant={offer.status === 'accepted' ? 'default' : 'destructive'}>
              {offer.status === 'accepted' ? '✓ ' : '✗ '}
              {t(`negotiations.status.${offer.status}`)}
            </Badge>
          )}
        </div>

        {/* Offer Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Euro className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <strong>{offer.salary}€</strong> {t('negotiations.offer.perMonth')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <strong>{offer.duration} {t('negotiations.offer.months')}</strong>
            </span>
          </div>

          {offer.bonuses.length > 0 && (
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-success" />
              <span className="text-sm">{offer.bonuses.join(', ')}</span>
            </div>
          )}

          {offer.housing && (
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-secondary" />
              <span className="text-sm">{t('negotiations.offer.housing')}</span>
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap mt-2">
            {offer.insurance && (
              <Badge variant="outline" className="text-xs">
                ✓ {t('negotiations.offer.insurance')}
              </Badge>
            )}
            {offer.transportation && (
              <Badge variant="outline" className="text-xs">
                ✓ {t('negotiations.offer.transportation')}
              </Badge>
            )}
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            {t('negotiations.offer.startDate')}: {format(new Date(offer.startDate), 'dd MMMM yyyy', { locale })}
          </div>
        </div>

        {/* Actions */}
        {offer.status === 'pending' && isFromClub && (
          <div className="flex flex-col gap-2">
            <Button
              onClick={onAccept}
              className="w-full"
              size="sm"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('negotiations.offer.accept')}
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={onCounter}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                {t('negotiations.offer.counter')}
              </Button>
              <Button
                onClick={onReject}
                variant="destructive"
                className="flex-1"
                size="sm"
              >
                <XCircle className="w-4 h-4 mr-2" />
                {t('negotiations.offer.reject')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

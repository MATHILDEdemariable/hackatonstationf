import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface CounterOfferModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (counterOffer: any) => void;
}

export default function CounterOfferModal({ open, onClose, onSubmit }: CounterOfferModalProps) {
  const { t } = useTranslation();
  const [counterOffer, setCounterOffer] = useState({
    salary: 1800,
    duration: 12,
    housing: true,
    bonuses: true,
    transportation: true,
    message: '',
  });

  const handleSubmit = () => {
    onSubmit(counterOffer);
    // Reset form
    setCounterOffer({
      salary: 1800,
      duration: 12,
      housing: true,
      bonuses: true,
      transportation: true,
      message: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('negotiations.counterOffer.title')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Salary */}
          <div className="space-y-2">
            <Label>{t('negotiations.offer.salary')}</Label>
            <Slider
              min={1000}
              max={5000}
              step={100}
              value={[counterOffer.salary]}
              onValueChange={([value]) => setCounterOffer({ ...counterOffer, salary: value })}
            />
            <div className="text-right text-lg font-bold text-primary">
              {counterOffer.salary}€ / {t('negotiations.offer.month')}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>{t('negotiations.offer.duration')}</Label>
            <Select
              value={counterOffer.duration.toString()}
              onValueChange={(value) => setCounterOffer({ ...counterOffer, duration: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 {t('negotiations.offer.months')}</SelectItem>
                <SelectItem value="12">12 {t('negotiations.offer.months')}</SelectItem>
                <SelectItem value="18">18 {t('negotiations.offer.months')}</SelectItem>
                <SelectItem value="24">24 {t('negotiations.offer.months')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Conditions */}
          <div className="space-y-3">
            <Label>{t('negotiations.counterOffer.additionalConditions')}</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="housing"
                checked={counterOffer.housing}
                onCheckedChange={(checked) => 
                  setCounterOffer({ ...counterOffer, housing: checked as boolean })
                }
              />
              <label
                htmlFor="housing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('negotiations.offer.housing')}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="bonuses"
                checked={counterOffer.bonuses}
                onCheckedChange={(checked) => 
                  setCounterOffer({ ...counterOffer, bonuses: checked as boolean })
                }
              />
              <label
                htmlFor="bonuses"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('negotiations.offer.performanceBonuses')}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="transportation"
                checked={counterOffer.transportation}
                onCheckedChange={(checked) => 
                  setCounterOffer({ ...counterOffer, transportation: checked as boolean })
                }
              />
              <label
                htmlFor="transportation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('negotiations.offer.transportation')}
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>{t('negotiations.counterOffer.message')}</Label>
            <Textarea
              placeholder={t('negotiations.counterOffer.messagePlaceholder')}
              value={counterOffer.message}
              onChange={(e) => setCounterOffer({ ...counterOffer, message: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            {t('negotiations.counterOffer.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            {t('negotiations.counterOffer.send')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

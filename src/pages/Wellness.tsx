import { useState } from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

// Declare the custom element type for ElevenLabs
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}

export default function Wellness() {
  const [sessionActive, setSessionActive] = useState(false);
  const { t, i18n } = useTranslation();
  
  const lang = i18n.language as 'fr' | 'en';

  const moodOptions = [
    { emoji: "😊", label: t('wellness.moods.great'), value: "great" },
    { emoji: "🙂", label: t('wellness.moods.good'), value: "good" },
    { emoji: "😐", label: t('wellness.moods.okay'), value: "neutral" },
    { emoji: "😟", label: t('wellness.moods.bad'), value: "bad" },
    { emoji: "😰", label: t('wellness.moods.terrible'), value: "stressed" },
  ];

  const quickActions = [
    { icon: "🧘", label: t('wellness.quickActions.meditation') },
    { icon: "💪", label: t('wellness.quickActions.motivation') },
    { icon: "😰", label: t('wellness.quickActions.stress') },
    { icon: "🎯", label: t('wellness.quickActions.goals') },
  ];

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-wellness/30 backdrop-blur-sm px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/app">
              <Button variant="ghost" size="icon" className="text-wellness-foreground">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-wellness-foreground">{t('wellness.title')}</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-8">
          {!sessionActive ? (
            <div className="space-y-8">
              {/* Coach Avatar */}
              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center text-6xl shadow-2xl animate-scale-in">
                  🧠
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {t('wellness.welcome')} {lang === 'fr' ? 'Champion' : 'Champion'} 👋
                </h2>
                <p className="text-wellness-light text-lg">
                  {t('wellness.howFeeling')}
                </p>
              </div>

              {/* Mood Selector */}
              <div className="bg-white/95 rounded-3xl p-6 shadow-xl">
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSessionActive(true)}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-wellness/10 transition-all hover-lift"
                    >
                      <span className="text-4xl">{mood.emoji}</span>
                      <span className="text-xs text-center font-medium">
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-muted-foreground uppercase tracking-wider">
                      {t('wellness.or')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSessionActive(true)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-wellness/5 to-wellness/10 hover:from-wellness/10 hover:to-wellness/20 transition-all border border-wellness/20 hover-lift"
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insights Preview */}
              <div className="bg-white/90 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-wellness/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-wellness" />
                  </div>
                  <h3 className="font-bold text-lg">{t('wellness.weeklyInsights')}</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>✨ {t('wellness.sessionCount')}</p>
                  <p>📈 {t('wellness.moodImprovement')}</p>
                  <p>🎯 {t('wellness.goalsAchieved')}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Session */}
              <div className="bg-white/95 rounded-3xl p-6 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-wellness/10 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl animate-pulse">
                    🧠
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t('wellness.coachActive')}</h3>
                  <p className="text-muted-foreground">{t('wellness.listening')}</p>
                </div>

                {/* ElevenLabs Widget - Assistant vocal intégré */}
                <div className="w-full flex flex-col items-center justify-center py-8 px-4">
                  <div className="w-full bg-gradient-to-br from-wellness/10 to-wellness/5 rounded-2xl p-6 shadow-lg border border-wellness/20">
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Assistant vocal</p>
                        <div className="h-1 w-16 bg-wellness rounded-full mx-auto"></div>
                      </div>
                    </div>
                    <elevenlabs-convai agent-id="agent_7901ka3n4540fbvsfav10f0e59yk"></elevenlabs-convai>
                  </div>
                </div>

                <Button
                  onClick={() => setSessionActive(false)}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {t('wellness.endSession')}
                </Button>
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

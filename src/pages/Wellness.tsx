import { useState } from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

export default function Wellness() {
  const [sessionActive, setSessionActive] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
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
        {/* Header - Compact */}
        <div className="bg-wellness/30 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-wellness-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-wellness-foreground">{t('wellness.title')}</h1>
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
                      onClick={() => {
                        setSessionActive(true);
                        setIsConversationActive(true);
                      }}
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
                    <span className="bg-white px-2 text-muted-foreground">{lang === 'fr' ? 'ou' : 'or'}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => {
                        setSessionActive(true);
                        setIsConversationActive(true);
                      }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-wellness/5 to-wellness/10 hover:from-wellness/10 hover:to-wellness/20 transition-all hover-lift"
                    >
                      <span className="text-3xl">{action.icon}</span>
                      <span className="text-sm font-medium text-left">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insights Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {t('wellness.insights.title')}
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/90 rounded-2xl p-4 text-center">
                    <div className="text-3xl mb-2">🔥</div>
                    <div className="text-2xl font-bold text-wellness">12</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t('wellness.insights.streak')}
                    </div>
                  </div>

                  <div className="bg-white/90 rounded-2xl p-4 text-center">
                    <div className="text-3xl mb-2">😊</div>
                    <div className="text-2xl font-bold text-success">{lang === 'fr' ? 'Bien' : 'Good'}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t('wellness.insights.avgMood')}
                    </div>
                  </div>

                  <div className="bg-white/90 rounded-2xl p-4 text-center">
                    <div className="text-3xl mb-2">⏱️</div>
                    <div className="text-2xl font-bold text-primary">24m</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t('wellness.insights.avgTime')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Active Session - Widget centré et dominant
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-6">
              {/* Compact Coach Avatar and Status */}
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center text-4xl">
                  🧠
                </div>
                <p className="text-white/80 text-sm font-medium">
                  {lang === 'fr' ? 'Coach actif' : 'Coach active'}
                </p>
              </div>

              {/* ElevenLabs Widget - Centered, no background box */}
              <div className="w-full max-w-md px-4">
                <ElevenLabsWidget
                  agentId="agent_7901ka3n4540fbvsfav10f0e59yk"
                  isActive={isConversationActive}
                  onConversationStart={() => {
                    console.log("Conversation started");
                    setIsConversationActive(true);
                  }}
                  onConversationEnd={() => {
                    console.log("Conversation ended");
                    setIsConversationActive(false);
                  }}
                />
              </div>

              {/* End Session Button */}
              <div className="pt-8">
                <Button
                  onClick={() => {
                    setSessionActive(false);
                    setIsConversationActive(false);
                  }}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  {t('wellness.endSession')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

import { useState } from "react";
import { Mic, ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";

const moodOptions = [
  { emoji: "😊", label: "Super bien", value: "great" },
  { emoji: "🙂", label: "Bien", value: "good" },
  { emoji: "😐", label: "Neutre", value: "neutral" },
  { emoji: "😟", label: "Pas top", value: "bad" },
  { emoji: "😰", label: "Stressé", value: "stressed" },
];

const quickActions = [
  { icon: "🧘", label: "Méditation guidée" },
  { icon: "💪", label: "Boost motivation" },
  { icon: "😰", label: "Gérer le stress" },
  { icon: "🎯", label: "Fixer des objectifs" },
];

export default function Wellness() {
  const [isRecording, setIsRecording] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-wellness/30 backdrop-blur-sm px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-wellness-foreground">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-wellness-foreground">Coach Wellness</h1>
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
                  Bonjour Champion 👋
                </h2>
                <p className="text-wellness-light text-lg">
                  Comment te sens-tu aujourd'hui ?
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
                    <span className="bg-white px-2 text-muted-foreground">ou</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setSessionActive(true)}
                      className="bg-gradient-to-br from-wellness/10 to-wellness/5 rounded-2xl p-4 text-center hover:from-wellness/20 hover:to-wellness/10 transition-all hover-lift"
                    >
                      <div className="text-3xl mb-2">{action.icon}</div>
                      <div className="text-sm font-medium">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="bg-white/95 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-wellness" />
                  <h3 className="font-bold">Tes insights</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-muted rounded-xl">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground">jours consécutifs</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-xl">
                    <div className="text-2xl mb-1">😊</div>
                    <div className="text-xl font-bold">Bonne</div>
                    <div className="text-xs text-muted-foreground">humeur moy.</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-xl">
                    <div className="text-2xl mb-1">⏱️</div>
                    <div className="text-xl font-bold">24m</div>
                    <div className="text-xs text-muted-foreground">temps/session</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Session */}
              <div className="bg-white/95 rounded-3xl p-6 shadow-xl min-h-[400px]">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-wellness/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    🧠
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Je suis là pour t'accompagner. Parle-moi de ce qui te préoccupe..."
                  </p>
                </div>

                {/* Conversation would go here */}
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-2xl p-4 max-w-[80%]">
                    <p className="text-sm">
                      Bonjour ! Comment puis-je t'aider aujourd'hui ?
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice Input */}
              <div className="bg-white/95 rounded-3xl p-6 shadow-xl">
                {isRecording && (
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <div className="w-1 h-8 bg-wellness rounded-full animate-pulse" />
                      <div className="w-1 h-12 bg-wellness rounded-full animate-pulse delay-75" />
                      <div className="w-1 h-10 bg-wellness rounded-full animate-pulse delay-150" />
                      <div className="w-1 h-14 bg-wellness rounded-full animate-pulse" />
                      <div className="w-1 h-8 bg-wellness rounded-full animate-pulse delay-75" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      En écoute...
                    </p>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4">
                  <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={cn(
                      "w-20 h-20 rounded-full transition-all flex items-center justify-center shadow-lg",
                      isRecording 
                        ? "bg-destructive animate-pulse-ring scale-110" 
                        : "bg-wellness hover:bg-wellness/90 hover:scale-105"
                    )}
                  >
                    <Mic className="w-8 h-8 text-white" />
                  </button>

                  <p className="text-sm text-center text-muted-foreground">
                    {isRecording 
                      ? "Relâche pour envoyer" 
                      : "Maintiens appuyé pour parler"
                    }
                  </p>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSessionActive(false)}
                    className="text-muted-foreground"
                  >
                    Terminer la session
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

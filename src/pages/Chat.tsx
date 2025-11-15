import { useState, useEffect, useRef } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { MarkdownMessage } from "@/components/chat/MarkdownMessage";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { 
  sendMessageToMistral, 
  buildMatchesContext, 
  getSystemPrompt,
  type ChatMessage 
} from "@/lib/mistral";

interface Message extends ChatMessage {
  id: string;
  timestamp: Date;
}

// Mock matches data - in a real app, this would come from your state management
const mockMatches = [
  {
    id: 1,
    name: "FC Toulouse",
    lastMessage: {
      preview: {
        fr: "Super ! On aimerait discuter des détails...",
        en: "Great! We'd like to discuss the details..."
      }
    },
    status: "active",
  },
  {
    id: 2,
    name: "AS Lyon Nord",
    lastMessage: {
      preview: {
        fr: "Quand es-tu disponible pour un essai ?",
        en: "When are you available for a trial?"
      }
    },
    status: "active",
  },
  {
    id: 3,
    name: "Bordeaux Sport Club",
    lastMessage: {
      preview: {
        fr: "Merci pour ton intérêt !",
        en: "Thanks for your interest!"
      }
    },
    status: "active",
  },
];

const quickPrompts = {
  fr: [
    "💭 Analyse mes matchs actuels",
    "💰 Conseils pour négocier",
    "📊 Quelle offre choisir ?",
    "🎯 Préparer un essai",
  ],
  en: [
    "💭 Analyze my current matches",
    "💰 Negotiation tips",
    "📊 Which offer to choose?",
    "🎯 Prepare for a trial",
  ],
};

export default function Chat() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: lang === 'fr' 
        ? "Bonjour ! 👋 Je suis votre assistant personnel spécialisé dans le conseil sportif. Je peux vous aider à:\n\n• Analyser vos matchs avec les clubs\n• Préparer vos négociations\n• Comprendre les offres de contrat\n• Vous donner des conseils pour votre carrière\n\nComment puis-je vous aider aujourd'hui ?" 
        : "Hello! 👋 I'm your personal assistant specialized in sports counseling. I can help you:\n\n• Analyze your matches with clubs\n• Prepare for negotiations\n• Understand contract offers\n• Give advice for your career\n\nHow can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowQuickPrompts(false);

    try {
      const matchesContext = buildMatchesContext(mockMatches, lang);
      const systemPrompt = getSystemPrompt(matchesContext, lang);
      
      // Filter out the welcome message for API calls
      const conversationHistory = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({ role: m.role, content: m.content }));

      const responseContent = await sendMessageToMistral(
        conversationHistory,
        systemPrompt,
        textToSend
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling Mistral API:", error);
      toast({
        title: lang === 'fr' ? "Erreur" : "Error",
        description: lang === 'fr' 
          ? "Impossible de contacter l'assistant. Veuillez réessayer." 
          : "Unable to contact the assistant. Please try again.",
        variant: "destructive",
      });
      
      // Remove the user message if there was an error
      setMessages((prev) => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    // Remove emoji and trim
    const cleanPrompt = prompt.replace(/^[^\w\s]+\s*/, '');
    sendMessage(cleanPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-screen pb-16">
        {/* Header */}
        <div className="bg-card border-b border-border px-3 sm:px-4 py-3 sm:py-4 sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-bold text-base sm:text-lg truncate">{t('chat.title')}</h1>
                <Badge variant="secondary" className="text-[10px] sm:text-xs flex-shrink-0">Mistral AI</Badge>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {lang === 'fr' ? 'En ligne' : 'Online'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-3 sm:px-4 md:px-6 py-4" ref={scrollRef}>
          <div className="space-y-3 sm:space-y-4 pb-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] md:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <MarkdownMessage 
                      content={message.content}
                      className={message.role === "user" ? "prose-invert" : ""}
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  )}
                  <p
                    className={`text-[10px] sm:text-xs mt-1 sm:mt-1.5 ${
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString(lang, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-primary" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {lang === 'fr' ? 'Réflexion en cours...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Prompts */}
            {showQuickPrompts && messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  {lang === 'fr' ? 'Suggestions rapides :' : 'Quick suggestions:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickPrompts[lang].map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-2.5 sm:py-3 px-3 text-left justify-start whitespace-normal hover:bg-accent transition-colors"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      <span className="text-xs sm:text-sm">{prompt}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="bg-card border-t border-border px-3 sm:px-4 md:px-6 py-3 sm:py-4 space-y-2 pb-safe">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.inputPlaceholder')}
                disabled={isLoading}
                className="flex-1 rounded-2xl min-h-[44px] py-2.5 sm:py-3 text-sm"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full w-11 h-11 flex-shrink-0"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2">
              {t('chat.disclaimer')}
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}


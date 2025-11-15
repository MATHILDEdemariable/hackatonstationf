import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import BottomNav from "@/components/BottomNav";
import { MarkdownMessage } from "@/components/chat/MarkdownMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
  timestamp?: Date;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("assistant-messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Welcome message
      setMessages([
        {
          role: "assistant",
          content: "Bonjour ! 👋 Je suis ton assistant personnel spécialisé dans le conseil sportif. Je peux t'aider à:\n\n• Analyser tes opportunités avec les clubs\n• Préparer tes négociations de contrat\n• Comprendre les offres des clubs\n• Prendre des décisions éclairées sur ta carrière\n\nComment puis-je t'aider aujourd'hui ?",
          id: "welcome",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      localStorage.setItem("assistant-messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: [...messages, userMessage] },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling chat function:", error);
      toast({
        title: "Erreur",
        description: "Impossible de contacter l'assistant. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-card/80 backdrop-blur-sm border-b border-border px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">
                  Assistant IA
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Ton conseiller personnel pour trouver le club idéal
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1 hidden sm:flex">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs">IA</span>
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-3 sm:px-4 py-4 sm:py-6 scrollbar-thin" ref={scrollRef}>
          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto pb-4">
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex gap-2 sm:gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in-up`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 mt-1">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border shadow-sm"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <MarkdownMessage content={message.content} />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 mt-1">
                    <AvatarFallback className="bg-secondary/50">
                      <span className="text-xs sm:text-sm font-medium">U</span>
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 sm:gap-3 justify-start">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 mt-1">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="bg-card/95 backdrop-blur-md border-t border-border px-3 sm:px-4 py-3 sm:py-4 shadow-lg">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écris ton message..."
              disabled={isLoading}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-sm sm:text-base"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="shrink-0 h-10 w-10 sm:h-10 sm:w-10"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

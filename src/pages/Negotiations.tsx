import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical, PaperclipIcon, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import OfferCard from "@/components/chat/OfferCard";
import CounterOfferModal from "@/components/chat/CounterOfferModal";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

interface Message {
  id: string;
  type: 'text' | 'offer' | 'system';
  from: 'club' | 'player';
  content?: string;
  timestamp: Date;
  offer?: {
    status: 'pending' | 'accepted' | 'rejected' | 'counter_offered';
    salary: number;
    duration: number;
    bonuses: string[];
    housing: boolean;
    insurance: boolean;
    transportation: boolean;
    startDate: string;
  };
}

const mockClubs: Record<string, any> = {
  '1': { name: 'FC Toulouse', logo: '🏟️', isOnline: true },
  '2': { name: 'AS Lyon Nord', logo: '⚽', isOnline: false },
  '3': { name: 'Bordeaux Sport Club', logo: '🎯', isOnline: true },
};

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'text',
    from: 'club',
    content: 'Bonjour ! Nous avons été impressionnés par ton profil. 👍',
    timestamp: new Date('2024-01-10T10:00:00'),
  },
  {
    id: '2',
    type: 'text',
    from: 'player',
    content: 'Merci beaucoup ! Je suis très intéressé par votre club.',
    timestamp: new Date('2024-01-10T10:05:00'),
  },
  {
    id: '3',
    type: 'offer',
    from: 'club',
    timestamp: new Date('2024-01-10T10:10:00'),
    offer: {
      status: 'pending',
      salary: 1500,
      duration: 12,
      bonuses: ['Performance', 'Présence'],
      housing: false,
      insurance: true,
      transportation: true,
      startDate: '2024-02-01',
    }
  }
];

export default function Negotiations() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageInput, setMessageInput] = useState('');
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [showVoiceCall, setShowVoiceCall] = useState(false);

  const club = mockClubs[matchId || '1'];
  const locale = i18n.language === 'fr' ? fr : enUS;

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      from: 'player',
      content: messageInput,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAcceptOffer = (offerId: string) => {
    setMessages(messages.map(msg => 
      msg.id === offerId && msg.offer
        ? { ...msg, offer: { ...msg.offer, status: 'accepted' } }
        : msg
    ));
    
    // Add system message
    const systemMsg: Message = {
      id: Date.now().toString(),
      type: 'system',
      from: 'club',
      content: t('negotiations.status.offerAccepted'),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, systemMsg]);
  };

  const handleRejectOffer = (offerId: string) => {
    setMessages(messages.map(msg => 
      msg.id === offerId && msg.offer
        ? { ...msg, offer: { ...msg.offer, status: 'rejected' } }
        : msg
    ));
  };

  const handleCounterOffer = (offerId: string) => {
    setActiveOfferId(offerId);
    setShowCounterModal(true);
  };

  const submitCounterOffer = (counterOffer: any) => {
    const newOffer: Message = {
      id: Date.now().toString(),
      type: 'offer',
      from: 'player',
      timestamp: new Date(),
      offer: {
        status: 'pending',
        salary: counterOffer.salary,
        duration: counterOffer.duration,
        bonuses: counterOffer.bonuses ? ['Performance', 'Présence'] : [],
        housing: counterOffer.housing,
        insurance: true,
        transportation: counterOffer.transportation,
        startDate: counterOffer.startDate || '2024-02-01',
      }
    };

    setMessages([...messages, newOffer]);
    setShowCounterModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/app/matches')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-sport rounded-xl flex items-center justify-center text-2xl">
            {club.logo}
          </div>
          <div>
            <h2 className="font-bold">{club.name}</h2>
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                club.isOnline ? "bg-success" : "bg-muted-foreground"
              )} />
              <span className="text-xs text-muted-foreground">
                {club.isOnline ? t('negotiations.online') : t('negotiations.offline')}
              </span>
            </div>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Voice Call Widget */}
      {showVoiceCall && (
        <div className="h-96 border-b bg-card p-4">
          <ElevenLabsWidget 
            agentId="agent_6501ka3skkdwegqa1w8kbea3wh79"
            isActive={showVoiceCall}
            onConversationStart={() => console.log('Voice call started')}
            onConversationEnd={() => setShowVoiceCall(false)}
          />
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-muted/50 text-muted-foreground text-xs px-3 py-1.5 rounded-full">
                  {msg.content}
                </div>
              </div>
            );
          }

          if (msg.type === 'offer') {
            return (
              <OfferCard
                key={msg.id}
                offer={msg.offer!}
                from={msg.from}
                timestamp={msg.timestamp}
                onAccept={() => handleAcceptOffer(msg.id)}
                onReject={() => handleRejectOffer(msg.id)}
                onCounter={() => handleCounterOffer(msg.id)}
              />
            );
          }

          // Text message
          const isPlayer = msg.from === 'player';
          return (
            <div
              key={msg.id}
              className={cn("flex", isPlayer ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2",
                  isPlayer
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  isPlayer ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {format(msg.timestamp, 'HH:mm', { locale })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border px-4 py-3 flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <PaperclipIcon className="w-5 h-5" />
        </Button>
        
        <Input
          placeholder={t('negotiations.inputPlaceholder')}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        
        <Button
          size="icon"
          onClick={sendMessage}
          disabled={!messageInput.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Counter Offer Modal */}
      <CounterOfferModal
        open={showCounterModal}
        onClose={() => setShowCounterModal(false)}
        onSubmit={submitCounterOffer}
      />
    </div>
  );
}

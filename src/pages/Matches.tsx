import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

const mockMatches = [
  {
    id: 1,
    name: "FC Toulouse",
    logo: "🏟️",
    lastMessage: {
      preview: { fr: "Super ! On aimerait discuter des détails...", en: "Great! We'd like to discuss the details..." },
      timestamp: { fr: "Il y a 2h", en: "2h ago" },
    },
    unreadCount: 2,
    status: "active",
  },
  {
    id: 2,
    name: "AS Lyon Nord",
    logo: "⚽",
    lastMessage: {
      preview: { fr: "Quand es-tu disponible pour un essai ?", en: "When are you available for a trial?" },
      timestamp: { fr: "Hier", en: "Yesterday" },
    },
    unreadCount: 0,
    status: "active",
  },
  {
    id: 3,
    name: "Bordeaux Sport Club",
    logo: "🎯",
    lastMessage: {
      preview: { fr: "Merci pour ton intérêt !", en: "Thanks for your interest!" },
      timestamp: { fr: "Il y a 3j", en: "3d ago" },
    },
    unreadCount: 1,
    status: "active",
  },
];

export default function Matches() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t('matches.title')}</h1>
            <p className="text-sm text-muted-foreground">
              {mockMatches.length} conversation{mockMatches.length > 1 ? "s" : ""}
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            {mockMatches.filter(m => m.unreadCount > 0).length} {lang === 'fr' ? 'nouveaux' : 'new'}
          </Badge>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder={lang === 'fr' ? "Rechercher un match..." : "Search a match..."} 
            className="pl-10 h-12 rounded-2xl"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              {lang === 'fr' ? 'Tous' : 'All'} ({mockMatches.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex-1">
              {lang === 'fr' ? 'Actifs' : 'Active'} (3)
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex-1">
              {lang === 'fr' ? 'Archivés' : 'Archived'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Matches List */}
        <div className="space-y-3">
          {mockMatches.map((match) => (
            <div
              key={match.id}
              className="bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer hover-lift"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 bg-gradient-sport rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                  {match.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold truncate">{match.name}</h3>
                    {match.unreadCount > 0 && (
                      <Badge 
                        variant="default" 
                        className="h-5 min-w-[20px] px-1.5 bg-primary text-primary-foreground"
                      >
                        {match.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {match.lastMessage.preview[lang]}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {match.lastMessage.timestamp[lang]}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (hidden when there are matches) */}
        {mockMatches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">{t('matches.noMatches')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('matches.noMatchesDescription')}
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

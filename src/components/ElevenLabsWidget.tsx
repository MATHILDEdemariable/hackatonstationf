import { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
        style?: React.CSSProperties;
      };
    }
  }
}

interface ElevenLabsWidgetProps {
  agentId: string;
  isActive: boolean;
  onConversationStart?: () => void;
  onConversationEnd?: () => void;
}

export function ElevenLabsWidget({
  agentId,
  isActive,
  onConversationStart,
  onConversationEnd,
}: ElevenLabsWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !widgetRef.current) return;

    const widget = widgetRef.current.querySelector('elevenlabs-convai');
    if (!widget) return;

    const handleConversationStart = () => {
      onConversationStart?.();
    };

    const handleConversationEnd = () => {
      onConversationEnd?.();
    };

    widget.addEventListener('conversationStarted', handleConversationStart);
    widget.addEventListener('conversationEnded', handleConversationEnd);

    return () => {
      widget.removeEventListener('conversationStarted', handleConversationStart);
      widget.removeEventListener('conversationEnded', handleConversationEnd);
    };
  }, [isActive, onConversationStart, onConversationEnd]);

  if (!isActive) return null;

  return (
    <div ref={widgetRef} className="w-full h-full min-h-[400px] flex items-center justify-center">
      <elevenlabs-convai agent-id={agentId} style={{ width: '100%', height: '400px', display: 'block' }} />
    </div>
  );
}

import { lazy, Suspense } from "react";

const ChatInterface = lazy(() =>
  import("@/components/chat/chat").then((m) => ({ default: m.ChatInterface }))
);

export function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-4">Loading chat…</div>}>
        <ChatInterface />
      </Suspense>
    </div>
  );
}

export default ChatPage;

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Sparkles, Loader2, ArrowRight as LucideArrowRight, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WidgetConfig, ChatMessage } from "@/types/api";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AskAIWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_QUESTIONS = [
  {
    id: "q1",
    text: "What standards do your products meet?",
    answer: "Our products carry major international certifications including CE, EN standards, and ANSI Z359 for safety equipment."
  },
  {
    id: "q2",
    text: "How do I purchase industrial equipment?",
    answer: "To purchase equipment, technical teams can contact us directly at info@vertacore.ae with their requirements. We fulfill orders for Oil & Gas, Marine, and major industrial sectors worldwide."
  },
  {
    id: "q3",
    text: "Which industries do you serve?",
    answer: "VERTACORE serves major enterprise clients in Oil & Gas, Marine, Construction, Manufacturing, and Mining sectors worldwide."
  },
  {
    id: "q4",
    text: "Do you supply welding products?",
    answer: "Yes, we provide a comprehensive range of welding systems, protective gear, and industrial consumables from leading global brands."
  },
];

const WELCOME_MESSAGE =
  "Hi, I'm VERTACORE AI. I can help with product information and technical industrial sourcing enquiries. How can I help?";

export function AskAIWidget({ isOpen, onClose }: AskAIWidgetProps) {
  const [config, setConfig] = useState<WidgetConfig>({ enabled: true, questions: DEFAULT_QUESTIONS });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load widget config
  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/chat/questions")
      .then((r) => r.json())
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setConfig(data);
        }
      })
      .catch(() => { });
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const sendMessage = useCallback(
    async (text: string, predefinedAnswer?: string | null) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError("");
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setLoading(true);

      // Use predefined answer if available
      if (predefinedAnswer) {
        await new Promise((r) => setTimeout(r, 600));
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: predefinedAnswer },
        ]);
        setLoading(false);
        return;
      }

      if (!config?.enabled) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "The AI assistant is currently offline. Please contact our team directly at info@vertacore.ae.",
          },
        ]);
        setLoading(false);
        return;
      }

      try {
        const allMessages: ChatMessage[] = [
          ...messages,
          { role: "user", content: trimmed },
        ];
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages.slice(-10) }),
        });

        const data = await res.json();

        if (res.status === 503 || data.error?.includes("offline")) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "The AI assistant is currently offline. For immediate assistance, please email our technical team directly at info@vertacore.ae."
            },
          ]);
          setLoading(false);
          return;
        }

        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm having trouble connecting to the AI service right now. Please try a suggested question above or reach us at info@vertacore.ae."
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, config, messages],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showChips = messages.length === 0 && config?.questions && config.questions.length > 0;

  return (
    <>
      {/* Backdrop (Transparent, only for click-to-close) */}
      <div
        className={cn(
          "fixed inset-0 top-[80px] md:top-[105px] z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Widget Side Panel */}
      <div
        className={cn(
          "fixed right-0 top-[80px] md:top-[93px] bottom-0 z-[101] flex flex-col bg-navy border-l border-gold/20 shadow-2xl transition-transform duration-300 ease-out",
          "w-full max-w-[400px]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="VERTACORE AI Assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-navy-dark border-b border-steel/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gold/10">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-base font-bold text-surface tracking-tight">VERTACORE AI</p>
              <p className="text-xs text-steel-muted">Procurement assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={() => { setMessages([]); setError(""); }}
                className="p-2 text-surface/50 hover:text-error transition-colors rounded-xl hover:bg-error/10 border border-transparent hover:border-error/20"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <Trash className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-surface/50 hover:text-gold transition-colors rounded-xl hover:bg-navy-light/30 border border-transparent hover:border-gold/20"
              aria-label="Close AI assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Welcome message */}
          <div className="flex gap-2.5">
            <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="h-3 w-3 text-gold" />
            </div>
            <div className="bg-graphite border border-steel/40 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[92%] shadow-md">
              <p className="text-[14px] text-surface/90 font-medium leading-[1.6]">{WELCOME_MESSAGE}</p>
            </div>
          </div>

          {/* Suggested questions */}
          {showChips && (
            <div className="mt-1 space-y-3 pb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60 px-1">
                Suggested Questions
              </p>
              <div className="flex flex-col gap-2.5">
                {config.questions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => sendMessage(q.text, q.answer)}
                    className="w-full text-left text-[13px] text-surface/90 bg-navy-light/40 border border-steel/30 hover:border-gold/50 hover:text-gold hover:bg-gold/5 px-4 py-3 rounded-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>{q.text}</span>
                      <LucideArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* Conversation messages */}
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2.5",
                message.role === "user" && "flex-row-reverse",
              )}
            >
              {message.role === "assistant" && (
                <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3 w-3 text-gold" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-2xl px-5 py-4 max-w-[92%] text-[14px] leading-[1.6] shadow-md",
                  message.role === "user"
                    ? "bg-gold text-navy rounded-tr-sm font-bold"
                    : "bg-graphite border border-steel/40 text-surface/90 rounded-tl-sm",
                )}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-invert prose-sm max-w-none 
                    prose-p:leading-relaxed prose-p:mb-3 last:prose-p:mb-0
                    prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
                    prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-5
                    prose-li:my-1.5
                    prose-strong:text-gold prose-strong:font-bold
                    prose-headings:text-gold prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2
                    prose-li:marker:text-gold/60
                    text-surface/90 font-medium">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-2.5">
              <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="h-3 w-3 text-gold" />
              </div>
              <div className="bg-graphite border border-steel/40 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                <Loader2 className="h-4 w-4 text-gold animate-spin" />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-xs text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2 text-center">
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 p-6 pb-8 border-t border-steel/30 bg-navy-dark">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none bg-navy-light/40 border border-steel/40 rounded-xl px-3.5 py-2.5 text-sm text-surface placeholder:text-steel-muted focus:outline-none focus:border-gold/50 transition-colors max-h-24 disabled:opacity-50"
              style={{ minHeight: "40px" }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-gold text-navy rounded-xl hover:bg-gold-muted transition-colors disabled:opacity-50 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="text-[10px] text-steel-muted/50 text-center mt-2">
            VERTACORE AI may make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </>
  );
}

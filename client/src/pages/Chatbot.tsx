import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Array<{ role: string; content: any }>>([
    {
      role: "assistant",
      content:
        "Bonjour! Je suis HeritageFlow AI, votre assistant touristique personnel. Comment puis-je vous aider aujourd'hui?",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("fr");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chatbot.ask.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const result = await chatMutation.mutateAsync({
      question: input,
      language,
    });

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: result.answer,
      },
    ]);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-cyan-400" />
              Assistant IA
            </h1>
          </div>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                variant={language === lang.code ? "default" : "outline"}
                className={
                  language === lang.code
                    ? "bg-gradient-to-r from-cyan-500 to-amber-500"
                    : "border-slate-600 text-slate-300 hover:border-cyan-400 text-sm"
                }
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-[calc(100vh-300px)]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                    : "bg-slate-800/50 border border-slate-700 text-slate-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Posez votre question sur le patrimoine culturel..."
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            disabled={chatMutation.isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || chatMutation.isPending}
            className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

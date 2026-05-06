import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { getChatResponse } from "../services/geminiService";
import { cn } from "@/lib/utils";
import useSound from "use-sound";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Sound effects
  const [playHover] = useSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", { volume: 0.1 });
  const [playClick] = useSound("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", { volume: 0.2 });

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await getChatResponse(userMessage, history);
    setMessages((prev) => [...prev, { role: "model", text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => playHover()}
        onClick={() => {
          setIsOpen(!isOpen);
          playClick();
        }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-accent-gold text-primary rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center border-4 border-white/10"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-[350px] md:w-[400px] h-[600px] bg-black/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border border-white/5"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-gold to-[#0B0B0F] p-8 text-primary flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                  <Bot size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg tracking-widest uppercase">Latheef AI</h3>
                  <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-bold font-sans">Luxury Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-primary"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="text-center py-12 space-y-8">
                  <div className="w-20 h-20 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto border border-accent-gold/20">
                    <Bot size={40} className="text-accent-gold opacity-60" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-light-grey/60 text-sm font-serif italic max-w-[200px] mx-auto">
                      Looking for coir fiber export? How can I assist you with our premium solutions today?
                    </p>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 gap-3 px-4">
                    <button 
                      onClick={() => {
                        window.location.href = "/get-quote";
                        setIsOpen(false);
                      }}
                      className="w-full py-4 bg-accent-gold text-primary rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-lg shadow-accent-gold/20"
                    >
                      Get Quote
                    </button>
                    <button 
                      onClick={() => {
                        window.location.href = "/products";
                        setIsOpen(false);
                      }}
                      className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      View Products
                    </button>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={cn(
                    "flex gap-4 max-w-[90%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                    msg.role === "user" ? "bg-accent-gold text-primary" : "bg-black/40 text-white border border-white/10"
                  )}>
                    {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={cn(
                    "p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-xl",
                    msg.role === "user" 
                      ? "bg-accent-gold text-primary font-bold rounded-tr-none" 
                      : "bg-black/40 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-white border border-white/10">
                    <Bot size={18} />
                  </div>
                  <div className="bg-black/40 p-5 rounded-[1.5rem] border border-white/10 rounded-tl-none backdrop-blur-md">
                    <Loader2 size={20} className="animate-spin text-accent-gold" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-black/40 border-t border-white/5 backdrop-blur-xl">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="w-full pl-8 pr-16 py-5 bg-black/40 border border-white/10 rounded-full text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                />
                <button
                  onClick={() => {
                    handleSend();
                    playClick();
                  }}
                  onMouseEnter={() => playHover()}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent-gold text-primary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

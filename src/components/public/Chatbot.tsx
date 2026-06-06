"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Loader2, 
  ArrowRight,
  Package,
  Coins,
  Code,
  Search
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
}

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);


export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDialOpen, setIsDialOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [processedLeads, setProcessedLeads] = useState<string[]>([]); // Track processed lead payloads to prevent duplicates

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 1. Initial mounting checks
  useEffect(() => {
    // Load session ID and messages from localStorage
    const savedSessionId = localStorage.getItem("alphadigify_chat_session_id");
    const savedMessages = localStorage.getItem("alphadigify_chat_messages");
    
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Error parsing saved messages:", e);
      }
    } else {
      // Add initial greeting from assistant
      setMessages([
        {
          role: "assistant",
          content: "👋 Welcome to **Alphadigify**! I am **Alpha**, your elite business scaling operator. Whether you need to dominate **Amazon**, explode sales on **TikTok Shop**, optimize **SEO**, build custom **Next.js websites**, or run high-conversion campaigns, I'm here to lay down the strategy. \n\nHow can I help you scale today?",
          createdAt: new Date(),
        }
      ]);
    }
  }, []);

  // 2. Trigger greeting toast after 5 seconds if chat is closed and dial is closed
  useEffect(() => {
    if (isOpen || isDialOpen) {
      setShowGreeting(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, isDialOpen]);

  // Sync messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("alphadigify_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages or open state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Auto-close greeting toast when user opens the chat
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
    setIsDialOpen(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsDialOpen(false);
  };

  const toggleDial = () => {
    setIsDialOpen(!isDialOpen);
    if (!isDialOpen) {
      setShowGreeting(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your conversation history?")) {
      localStorage.removeItem("alphadigify_chat_session_id");
      localStorage.removeItem("alphadigify_chat_messages");
      setSessionId(null);
      setMessages([
        {
          role: "assistant",
          content: "👋 Welcome to **Alphadigify**! I am **Alpha**, your elite business scaling operator. Whether you need to dominate **Amazon**, explode sales on **TikTok Shop**, optimize **SEO**, build custom **Next.js websites**, or run high-conversion campaigns, I'm here to lay down the strategy. \n\nHow can I help you scale today?",
          createdAt: new Date(),
        }
      ]);
    }
  };

  // Extract and process any [[CREATE_LEAD: ...]] block
  const checkAndSubmitLead = async (text: string, currentSessionId: string | null) => {
    const leadRegex = /\[\[CREATE_LEAD:\s*({.*?})\s*\]\]/;
    const match = text.match(leadRegex);
    if (match) {
      const payloadStr = match[1];
      
      // Prevent processing same lead block twice in a single session
      if (processedLeads.includes(payloadStr)) return;

      try {
        const leadData = JSON.parse(payloadStr);
        setProcessedLeads((prev) => [...prev, payloadStr]);

        const response = await fetch("/api/chat/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: currentSessionId,
            name: leadData.name,
            email: leadData.email,
            service: leadData.service,
            budget: leadData.budget,
            message: leadData.message,
          }),
        });

        if (response.ok) {
          console.log("AI Chatbot successfully registered lead in the database:", leadData);
        }
      } catch (err) {
        console.error("Failed to parse and submit lead payload:", err);
      }
    }
  };

  const cleanMessageText = (text: string) => {
    return text.replace(/\[\[CREATE_LEAD:.*?\]\]/g, "").trim();
  };

  // Form submit / Send Message
  const handleSendMessage = async (textToSend: string) => {
    const messageText = textToSend.trim();
    if (!messageText) return;

    // Clear input
    setInputValue("");
    setIsTyping(true);

    // Create user message
    const userMsg: Message = { role: "user", content: messageText, createdAt: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach assistant");
      }

      // Handle custom session ID header from server
      const serverSessionId = response.headers.get("x-session-id");
      let activeSessionId = sessionId;
      if (serverSessionId && serverSessionId !== sessionId) {
        setSessionId(serverSessionId);
        localStorage.setItem("alphadigify_chat_session_id", serverSessionId);
        activeSessionId = serverSessionId;
      }

      // Read response stream
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader stream on response");
      }

      // Add temporary empty assistant message
      const assistantMsgIndex = updatedMessages.length;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      let streamedResponseText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        streamedResponseText += chunk;

        // Update active typing message
        setMessages((prev) => {
          const newMsgs = [...prev];
          if (newMsgs[assistantMsgIndex]) {
            newMsgs[assistantMsgIndex].content = streamedResponseText;
          }
          return newMsgs;
        });
      }

      setIsTyping(false);

      // Check for lead registration tags
      await checkAndSubmitLead(streamedResponseText, activeSessionId);

    } catch (error) {
      console.error("Chat transmission error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ **System Communication Issue**: I encountered an issue connecting with our servers. Please check your network or try again shortly.",
        }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Helper to split text tokens by regex and map matches
  const tokenizeRegex = (
    tokens: (string | React.ReactElement)[], 
    regex: RegExp, 
    mapper: (match: RegExpExecArray, idx: number) => React.ReactElement
  ): (string | React.ReactElement)[] => {
    const result: (string | React.ReactElement)[] = [];
    let uniqueId = 0;

    for (const token of tokens) {
      if (typeof token !== "string") {
        result.push(token);
        continue;
      }

      let lastIndex = 0;
      let match;
      regex.lastIndex = 0; // Reset global regex index

      while ((match = regex.exec(token)) !== null) {
        if (match.index > lastIndex) {
          result.push(token.substring(lastIndex, match.index));
        }
        result.push(mapper(match, uniqueId++));
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < token.length) {
        result.push(token.substring(lastIndex));
      }
    }

    return result;
  };

  const parseInlineStyles = (text: string): React.ReactNode => {
    let tokens: (string | React.ReactElement)[] = [text];
    
    // Tokenize Links: [/services/...]
    tokens = tokenizeRegex(tokens, /\[(\/.*?)\]/g, (match, idx) => {
      const linkPath = match[1];
      const linkLabel = linkPath.split("/").pop()?.replace(/-/g, " ").toUpperCase() || "VISIT PAGE";
      return (
        <a 
          key={`link-${idx}`} 
          href={linkPath}
          className="inline-flex items-center mx-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer shrink-0"
        >
          <span>{linkLabel}</span>
          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
        </a>
      );
    });

    // Tokenize Bold: **bold**
    tokens = tokenizeRegex(tokens, /\*\*(.*?)\*\*/g, (match, idx) => (
      <strong key={`bold-${idx}`} className="font-bold text-yellow-600 dark:text-yellow-400">
        {match[1]}
      </strong>
    ));

    // Tokenize Inline Code: `code`
    tokens = tokenizeRegex(tokens, /`(.*?)`/g, (match, idx) => (
      <code key={`code-${idx}`} className="bg-slate-100 dark:bg-slate-800 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200/50 dark:border-slate-800">
        {match[1]}
      </code>
    ));

    // Tokenize Italics: *italic*
    tokens = tokenizeRegex(tokens, /\*(.*?)\*/g, (match, idx) => (
      <em key={`italic-${idx}`} className="italic">
        {match[1]}
      </em>
    ));

    return <>{tokens}</>;
  };

  const renderMessageContent = (content: string): React.ReactNode => {
    const cleanedText = cleanMessageText(content);
    const lines = cleanedText.split("\n");
    const nodes: React.ReactNode[] = [];
    
    let inList = false;
    let listItems: React.ReactNode[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Bullet lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        const itemText = line.trim().substring(2);
        listItems.push(
          <li key={`li-${i}`} className="ml-4 list-disc mb-1 text-slate-750 dark:text-slate-300">
            {parseInlineStyles(itemText)}
          </li>
        );
        continue;
      } else {
        if (inList) {
          nodes.push(<ul key={`ul-${i}`} className="mb-3 space-y-1 list-disc pl-2">{listItems}</ul>);
          inList = false;
        }
      }
      
      // Headings
      if (line.startsWith("### ")) {
        nodes.push(
          <h3 key={i} className="text-sm sm:text-base font-bold text-yellow-600 dark:text-yellow-400 mt-3 mb-1.5 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-500 shrink-0" />
            <span>{parseInlineStyles(line.substring(4))}</span>
          </h3>
        );
        continue;
      }
      if (line.startsWith("#### ")) {
        nodes.push(
          <h4 key={i} className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white mt-2.5 mb-1">
            {parseInlineStyles(line.substring(5))}
          </h4>
        );
        continue;
      }
      if (line.startsWith("## ")) {
        nodes.push(
          <h2 key={i} className="text-base sm:text-lg font-black text-slate-950 dark:text-white mt-4 mb-2 border-b border-slate-100 dark:border-slate-800/50 pb-1">
            {parseInlineStyles(line.substring(3))}
          </h2>
        );
        continue;
      }
      
      // Normal paragraph
      if (line.trim()) {
        nodes.push(
          <p key={i} className="mb-2 last:mb-0 leading-relaxed text-slate-750 dark:text-slate-350 text-sm">
            {parseInlineStyles(line)}
          </p>
        );
      } else {
        nodes.push(<div key={i} className="h-1.5" />);
      }
    }
    
    if (inList) {
      nodes.push(<ul key={`ul-end`} className="mb-3 space-y-1 list-disc pl-2">{listItems}</ul>);
    }
    
    return <div className="space-y-1">{nodes}</div>;
  };

  const suggestedFaqs = [
    { text: "Amazon Scale", icon: Package, msg: "I want to scale my Amazon seller account. What services do you offer for Amazon sellers?" },
    { text: "TikTok Ads", icon: Coins, msg: "Can you help me scale TikTok Shop using Creator Affiliates and UGC ads?" },
    { text: "Next.js Dev", icon: Code, msg: "I need a premium Next.js custom website that loads fast. Can you give me pricing details?" },
    { text: "Audit SEO", icon: Search, msg: "How can I rank my business #1 on Google? Can I get a technical SEO audit?" },
  ];

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans antialiased text-slate-800 dark:text-slate-100">
      
      {/* 5-second automatic sliding greeting bubble */}
      {showGreeting && !isDialOpen && !isOpen && (
        <div className="absolute bottom-20 right-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-4 pr-10 animate-fade-in-slide duration-500 z-50">
          <button 
            onClick={() => setShowGreeting(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-inner flex-shrink-0 border border-yellow-500/30">
              <Image src="/alpha-ai.png" alt="Alpha AI" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-500 uppercase tracking-widest mb-0.5">
                AI Operator
              </p>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Let&apos;s scale your business!
              </h4>
              <p className="text-xs text-slate-650 dark:text-slate-405 leading-relaxed mb-3">
                Hey, I am Alpha. Looking to dominate Amazon, TikTok, or SEO? Let&apos;s formulate a strategy!
              </p>
              
              <button
                onClick={handleOpenChat}
                className="inline-flex items-center text-[11px] font-extrabold text-black bg-yellow-400 hover:bg-yellow-500 rounded-full px-3 py-1.5 transition-colors shadow-sm"
              >
                <span>Chat with Alpha</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Speed Dial */}
      {!isOpen && (
        <div className="relative flex flex-col items-center">
          
          {/* Child Buttons Container */}
          <div className={`absolute bottom-16 flex flex-col items-center space-y-3 transition-all duration-300 ${
            isDialOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}>
            
            {/* Child Button: WhatsApp */}
            <div className="flex items-center relative">
              {/* Tooltip */}
              <span className={`absolute right-14 whitespace-nowrap bg-zinc-900/90 dark:bg-black/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/[0.08] shadow-lg transition-all duration-200 pointer-events-none ${
                isDialOpen 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-2"
              }`}>
                Chat on WhatsApp
              </span>
              <a
                href="https://wa.me/923001001483?text=Hey%20Alphadigify!%20I%20am%20interested%20in%20scaling%20my%20business%20and%20would%20love%20to%20get%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDialOpen(false)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </a>
            </div>

            {/* Child Button: AI Assistant */}
            <div className="flex items-center relative">
              {/* Tooltip */}
              <span className={`absolute right-14 whitespace-nowrap bg-zinc-900/90 dark:bg-black/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/[0.08] shadow-lg transition-all duration-200 pointer-events-none ${
                isDialOpen 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-2"
              }`}>
                Chat with Alpha AI
              </span>
              <button
                onClick={handleOpenChat}
                className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-black dark:bg-zinc-900 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(250,204,21,0.25)] hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Chat with Alpha AI"
              >
                <Image src="/alpha-ai.png" alt="Alpha AI" width={48} height={48} className="w-full h-full object-cover" />
              </button>
            </div>

          </div>

          {/* Main Dial Toggle Button */}
          <button
            onClick={toggleDial}
            className="relative flex items-center justify-center w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-[0_4px_25px_rgba(250,204,21,0.4)] hover:shadow-[0_4px_35px_rgba(250,204,21,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group"
            aria-label="Toggle contact dial"
          >
            {/* Pulsing ring (only pulse when dial is closed) */}
            {!isDialOpen && (
              <span className="absolute -inset-1 rounded-full bg-yellow-400/20 animate-ping group-hover:bg-yellow-400/30" />
            )}

            {/* Notification Badge (only show when dial is closed) */}
            {!isDialOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white dark:border-zinc-950"></span>
              </span>
            )}

            {/* Rotating Icon */}
            <div className="transition-transform duration-300 transform group-hover:rotate-6">
              {isDialOpen ? (
                <X className="w-6 h-6 transform rotate-90 duration-300" />
              ) : (
                <MessageSquare className="w-6 h-6" />
              )}
            </div>
          </button>

        </div>
      )}

      {/* Chatbox Window Container */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="relative flex flex-col w-[calc(100vw-2rem)] min-[350px]:w-[350px] sm:w-[420px] h-[550px] sm:h-[600px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden animate-chat-popup z-50 flex-shrink-0 transition-colors duration-300"
        >
          
          {/* Header Banner - Yellow & White / High Contrast */}
          <div className="flex items-center justify-between px-5 py-4 bg-yellow-400 text-black border-b border-yellow-500/20 relative">
            <div className="absolute top-0 right-12 w-32 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none skew-x-12" />
            
            <div className="flex items-center space-x-3 z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border-2 border-black/20">
                  <Image src="/alpha-ai.png" alt="Alpha AI" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-yellow-400" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold tracking-tight text-base text-slate-950">
                    ALPHA
                  </h3>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-black text-yellow-400 uppercase tracking-widest">
                    SYSTEM OPERATOR
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900/80">
                  Ready to scale your digital presence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 z-10">
              <button
                onClick={handleClearHistory}
                title="Clear Conversation"
                className="p-1.5 rounded-full hover:bg-black/10 text-slate-900 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseChat}
                className="p-1.5 rounded-full hover:bg-black/10 text-slate-900 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Messages Pane */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/20 scrollbar-thin">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div 
                  key={index} 
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"} items-start space-x-2.5 max-w-[90%] ${isAssistant ? "mr-auto" : "ml-auto"}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-inner mt-1 border border-yellow-500/30">
                      <Image src="/alpha-ai.png" alt="Alpha AI" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isAssistant 
                        ? "bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-tl-sm text-slate-850 dark:text-slate-150 shadow-sm" 
                        : "bg-yellow-400 text-black rounded-tr-sm font-medium shadow-sm"
                    }`}>
                      {renderMessageContent(msg.content)}
                    </div>
                    {/* Timestamp display if needed */}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start items-center space-x-2.5 max-w-[80%]">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-inner border border-yellow-500/30">
                  <Image src="/alpha-ai.png" alt="Alpha AI" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-tl-sm shadow-sm flex items-center space-x-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200" />
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ / Suggested Question Chips */}
          {messages.length <= 2 && (
            <div className="px-4 py-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900/50">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center space-x-1 px-1">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span>Suggested Scaling Pathways</span>
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {suggestedFaqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(faq.msg)}
                    className="flex items-center space-x-2 text-left px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-yellow-400/10 dark:bg-slate-900/50 dark:hover:bg-yellow-400/15 border border-slate-200/50 dark:border-slate-800/80 hover:border-yellow-400/40 dark:hover:border-yellow-400/30 text-slate-700 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 truncate"
                  >
                    <faq.icon className="w-4 h-4 text-yellow-500 shrink-0" />
                    <span className="truncate">{faq.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Interactive Inputs */}
          <div className="px-4 py-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900/60 flex items-center space-x-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Query Alpha... (e.g. scale Amazon sales)"
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 dark:focus:ring-yellow-400/30 dark:focus:border-yellow-400 resize-none max-h-20 scrollbar-none text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 dark:placeholder-slate-500"
              rows={1}
            />
            
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                inputValue.trim() && !isTyping 
                  ? "bg-yellow-400 text-black hover:bg-yellow-500 active:scale-95 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
                  : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>

        </div>
      )}

      {/* Styled Animations for Chatbot */}
      <style jsx global>{`
        @keyframes chatPopup {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-chat-popup {
          animation: chatPopup 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-slide {
          animation: fadeInSlide 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
}

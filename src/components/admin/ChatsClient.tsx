"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Trash2, 
  Clock, 
  Search, 
  UserCheck, 
  ChevronLeft,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Briefcase,
  Zap,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface SerializedMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface SerializedLead {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  status: string;
}

interface SerializedSession {
  id: string;
  ipAddress: string | null;
  createdAt: string;
  updatedAt: string;
  leadId: string | null;
  lead: SerializedLead | null;
  messages: SerializedMessage[];
}

interface ChatsClientProps {
  initialSessions: SerializedSession[];
}

export default function ChatsClient({ initialSessions }: ChatsClientProps) {
  const [sessions, setSessions] = useState<SerializedSession[]>(initialSessions);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    initialSessions.length > 0 ? initialSessions[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "leads" | "no-leads">("all");
  
  // Mobile-view toggle: 'list' | 'detail'
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  // Stats summaries
  const totalSessions = sessions.length;
  const totalMessages = sessions.reduce((sum, s) => sum + s.messages.length, 0);
  const leadsGenerated = sessions.filter((s) => s.leadId !== null).length;
  const conversionRate = totalSessions > 0 ? ((leadsGenerated / totalSessions) * 100).toFixed(1) : "0";

  // Filter & Search logic
  const filteredSessions = sessions.filter((s) => {
    const matchesFilter = 
      filterType === "all" ||
      (filterType === "leads" && s.leadId !== null) ||
      (filterType === "no-leads" && s.leadId === null);

    const matchesSearch = 
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.ipAddress && s.ipAddress.includes(searchQuery)) ||
      (s.lead && s.lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.lead && s.lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.lead && s.lead.service.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleSelectSession = (id: string) => {
    setSelectedSessionId(id);
    setMobileView("detail");
  };

  const handleDeleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this chat session? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/chat/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSessionId === id) {
          const remaining = sessions.filter((s) => s.id !== id);
          setSelectedSessionId(remaining.length > 0 ? remaining[0].id : null);
          setMobileView("list");
        }
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete chat session.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error occurred deleting chat session.");
    }
  };

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMessageText = (content: string) => {
    // Strips [[CREATE_LEAD: ...]] block
    const cleaned = content.replace(/\[\[CREATE_LEAD:.*?\]\]/g, "").trim();
    return cleaned;
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
      <code key={`code-${idx}`} className="bg-slate-100 dark:bg-zinc-800 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200/50 dark:border-zinc-800/80">
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
    const cleanedText = formatMessageText(content);
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
          <li key={`li-${i}`} className="ml-4 list-disc mb-1 text-slate-750 dark:text-zinc-350">
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
          <h2 key={i} className="text-base sm:text-lg font-black text-slate-950 dark:text-white mt-4 mb-2 border-b border-slate-100 dark:border-zinc-800/80 pb-1">
            {parseInlineStyles(line.substring(3))}
          </h2>
        );
        continue;
      }
      
      // Normal paragraph
      if (line.trim()) {
        nodes.push(
          <p key={i} className="mb-2 last:mb-0 leading-relaxed text-slate-750 dark:text-zinc-350 text-sm">
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

  return (
    <div className="space-y-6">
      
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI Chat Conversations
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">
            Monitor client queries, audit transcripts, and review live lead acquisitions.
          </p>
        </div>
      </div>

      {/* Numerical Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Total Sessions
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{totalSessions}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Total Messages
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{totalMessages}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Leads Acquired
          </p>
          <div className="flex items-baseline space-x-2 mt-2 text-yellow-600 dark:text-yellow-400">
            <span className="text-3xl font-black">{leadsGenerated}</span>
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full ml-2">
              Sync
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Conversion Rate
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{conversionRate}%</span>
          </div>
        </div>

      </div>

      {/* Main Console Split Pane */}
      <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden h-[650px] flex shadow-sm">
        
        {/* Left List Pane */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-zinc-800 flex flex-col shrink-0 ${
          mobileView === "detail" ? "hidden md:flex" : "flex"
        }`}>
          
          {/* List Toolbar / Search */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 space-y-3 bg-slate-50/50 dark:bg-zinc-950/20">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search IP, name or email..."
                className="w-full bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>
            
            {/* Filter segments */}
            <div className="flex bg-slate-100 dark:bg-zinc-900 p-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
              <button
                onClick={() => setFilterType("all")}
                className={`flex-1 py-1.5 text-center rounded-md transition-all ${
                  filterType === "all" 
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("leads")}
                className={`flex-1 py-1.5 text-center rounded-md transition-all flex items-center justify-center space-x-1 ${
                  filterType === "leads" 
                    ? "bg-white dark:bg-zinc-800 text-yellow-600 dark:text-yellow-400 shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                }`}
              >
                <UserCheck className="w-3 h-3" />
                <span>Leads</span>
              </button>
              <button
                onClick={() => setFilterType("no-leads")}
                className={`flex-1 py-1.5 text-center rounded-md transition-all ${
                  filterType === "no-leads" 
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                }`}
              >
                Chats
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-900/60">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 dark:text-zinc-500">
                No matching chat sessions found.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isActive = session.id === selectedSessionId;
                const hasLead = session.leadId !== null;
                const lastMsg = session.messages[session.messages.length - 1]?.content || "(Empty Conversation)";

                return (
                  <div
                    key={session.id}
                    onClick={() => handleSelectSession(session.id)}
                    className={`p-4 cursor-pointer transition-all flex flex-col text-left border-l-4 ${
                      isActive 
                        ? "bg-yellow-400/[0.04] dark:bg-zinc-900/40 border-yellow-400" 
                        : "border-transparent hover:bg-slate-50/70 dark:hover:bg-zinc-900/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500 font-mono">
                          IP: {session.ipAddress || "Unknown"}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5">
                        {hasLead && (
                          <span className="bg-yellow-400 text-black text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded">
                            LEAD
                          </span>
                        )}
                        <button
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          title="Delete Session"
                          className="text-slate-300 hover:text-red-500 dark:text-zinc-700 dark:hover:text-red-400 p-1 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 truncate">
                      {hasLead ? session.lead?.name : `Anonymous Session`}
                    </h4>
                    
                    <p className="text-[11px] text-slate-450 dark:text-zinc-400 mt-1 truncate max-w-[280px]">
                      {formatMessageText(lastMsg)}
                    </p>

                    <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 mt-2.5">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(session.createdAt)}</span>
                      <span className="dark:text-zinc-700">•</span>
                      <span>{session.messages.length} msg</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail / Transcript Pane */}
        <div className={`flex-1 flex flex-col bg-slate-50/20 dark:bg-black/10 ${
          mobileView === "list" ? "hidden md:flex" : "flex"
        }`}>
          {selectedSession ? (
            <>
              {/* Transcript Header bar */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-950">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setMobileView("list")}
                    className="md:hidden p-1 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 mr-1"
                    title="Back to List"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>Conversation audit</span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 font-normal">
                        ({selectedSession.id})
                      </span>
                    </h3>
                    <p className="text-xs text-slate-450 dark:text-zinc-400 flex items-center mt-0.5">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <span>Session created on {formatDate(selectedSession.createdAt)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Linked Lead Details Banner */}
              {selectedSession.lead && (
                <div className="m-4 bg-yellow-400 text-black p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/10 to-transparent skew-x-12 pointer-events-none" />
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-black text-yellow-400 flex items-center justify-center font-bold text-sm shrink-0">
                      🤝
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-900/60">
                        Qualified Conversion Lead
                      </h4>
                      <h3 className="text-base font-black mt-0.5">
                        {selectedSession.lead.name} ({selectedSession.lead.email})
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-900/80 mt-1.5">
                        <span className="flex items-center">
                          <Briefcase className="w-3.5 h-3.5 mr-1" />
                          {selectedSession.lead.service}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5" />
                          Budget: {selectedSession.lead.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href="/admin/leads"
                    className="inline-flex items-center text-xs font-black bg-black text-yellow-400 rounded-xl px-4 py-2 hover:bg-zinc-900 transition-all flex-shrink-0"
                  >
                    <span>View Lead Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              )}

              {/* Messages List Stream */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedSession.messages.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <AlertCircle className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p className="text-sm font-medium">Session contains no messages.</p>
                  </div>
                ) : (
                  selectedSession.messages.map((msg) => {
                    const isUser = msg.role === "user";
                    return (
                      <div 
                        key={msg.id}
                        className={`flex ${isUser ? "justify-end" : "justify-start"} items-start space-x-2.5 max-w-[85%] ${
                          isUser ? "ml-auto" : "mr-auto"
                        }`}
                      >
                        {!isUser && (
                          <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center flex-shrink-0 shadow-inner mt-1">
                            <Zap className="w-4 h-4 fill-current" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            isUser 
                              ? "bg-yellow-400 text-black font-medium rounded-tr-sm shadow-sm" 
                              : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-850 dark:text-zinc-150 rounded-tl-sm shadow-sm"
                          }`}>
                            {isUser ? (
                              <p className="whitespace-pre-wrap">{formatMessageText(msg.content)}</p>
                            ) : (
                              renderMessageContent(msg.content)
                            )}
                          </div>
                          <span className={`text-[9px] text-slate-400 mt-1 ${isUser ? "text-right" : "text-left"}`}>
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-3 animate-bounce" />
              <h3 className="font-bold text-sm">No Session Selected</h3>
              <p className="text-xs text-slate-450 mt-1">Select an active chat session from the list to review details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

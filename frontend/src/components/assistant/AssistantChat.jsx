import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, SendHorizonal, Sparkles } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "Which projects need immediate action this week?",
  "Explain why LA-1011 has such a high delay risk.",
  "How can we reduce compensation-related delays?",
  "Summarize the district with the worst delay trend.",
];

export function AssistantChat({ compact = false }) {
  const [sessionId] = useState(() => {
    let id = localStorage.getItem("lg_chat_session");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("lg_chat_session", id);
    }
    return id;
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/assistant/history?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []))
      .catch(() => {});
  }, [sessionId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  const patchLast = (content) =>
    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { role: "assistant", content };
      return copy;
    });

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || sending) return;
    setInput("");
    setSending(true);
    setMessages((m) => [...m, { role: "user", content: msg }, { role: "assistant", content: "" }]);
    try {
      const res = await fetch(`${API}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop();
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") {
            done = true;
            break;
          }
          try {
            const json = JSON.parse(payload);
            if (json.delta) {
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                copy[copy.length - 1] = { role: "assistant", content: last.content + json.delta };
                return copy;
              });
            } else if (json.error) {
              patchLast("Claude is unreachable right now — please try again in a moment.");
            }
          } catch {
            /* partial chunk */
          }
        }
      }
    } catch {
      patchLast("Network error — please try again.");
    }
    setSending(false);
  };

  const thinking = sending && messages.length > 0 && messages[messages.length - 1].content === "";

  return (
    <div className="flex h-full min-h-0 flex-col" data-testid="assistant-chat">
      <div ref={scrollRef} className={`flex-1 space-y-5 overflow-y-auto ${compact ? "p-4" : "p-6"}`} data-testid="assistant-messages">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-full flex-col items-center justify-center text-center"
          >
            <div className="rounded-2xl bg-[#0B3D91]/10 p-4">
              <Sparkles className="h-6 w-6 text-[#0B3D91]" />
            </div>
            <p className="font-display mt-4 text-lg font-bold text-slate-900">Ask me anything about your portfolio</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              Delay risk, district trends, compensation bottlenecks — answered with explainable AI.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={s}
                  data-testid={`assistant-suggestion-${i}`}
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all hover:border-[#0B3D91]/40 hover:bg-[#0B3D91]/5 hover:text-[#0B3D91]"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end" data-testid={`assistant-message-user-${i}`}>
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#0B3D91] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0B3D91]/20">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2.5" data-testid={`assistant-message-claude-${i}`}>
              <div className="mt-0.5 shrink-0 rounded-lg bg-[#0B3D91] p-1.5">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                {m.content === "" && thinking ? (
                  <span className="flex items-center gap-1.5 py-1" data-testid="assistant-typing">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0B3D91]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0B3D91] [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0B3D91] [animation-delay:240ms]" />
                  </span>
                ) : (
                  <div className="assistant-md">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
                        ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
                        h1: ({ children }) => <p className="font-display mb-2 text-sm font-extrabold text-slate-900">{children}</p>,
                        h2: ({ children }) => <p className="font-display mb-2 text-sm font-extrabold text-slate-900">{children}</p>,
                        h3: ({ children }) => <p className="font-display mb-1.5 text-sm font-bold text-slate-900">{children}</p>,
                        hr: () => <hr className="my-3 border-slate-200" />,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className={`flex items-center gap-2 border-t border-slate-200 ${compact ? "p-3" : "p-4"}`}
      >
        <input
          data-testid="assistant-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about delay risk, districts, compensation..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#0B3D91] focus:ring-4 focus:ring-[#0B3D91]/10"
        />
        <motion.button
          type="submit"
          data-testid="assistant-send-btn"
          disabled={sending || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-[#0B3D91] p-2.5 text-white shadow-md shadow-[#0B3D91]/25 transition-colors hover:bg-[#09337A] disabled:opacity-40"
          aria-label="Send message"
        >
          <SendHorizonal className="h-4 w-4" />
        </motion.button>
      </form>
      <p className="border-t border-slate-100 px-4 py-2.5 text-center text-[10px] font-medium text-slate-400">
        AI responses generated and should be verified against official records.
      </p>
    </div>
  );
}

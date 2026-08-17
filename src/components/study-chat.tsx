import { useEffect, useRef, useState } from "react";
import { Bot, CornerDownLeft, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { id: number; role: "assistant" | "user"; text: string };

const suggestions = [
  "Explain photosynthesis simply",
  "Make a 7-day revision plan",
  "Summarise my lecture notes",
  "Quiz me on data structures",
];

function draftAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("plan") || q.includes("schedule") || q.includes("timetable")) {
    return "Here is a starter plan: split each day into two 50-minute focus blocks with 10-minute breaks. Days 1-3 cover new material, days 4-5 revise with active recall, days 6-7 practise past papers and review weak topics.";
  }
  if (q.includes("summar") || q.includes("notes")) {
    return "Paste your notes and I will condense them into key definitions, three main ideas, and a short list of exam-style questions to test yourself with.";
  }
  if (q.includes("quiz") || q.includes("test")) {
    return "Quick quiz: 1) Define the core concept in one sentence. 2) Give a real-world example. 3) Name one common mistake students make. Answer these and I will mark them.";
  }
  if (q.includes("explain") || q.includes("what is") || q.includes("how")) {
    return "Think of it in three layers: the simple idea, the mechanism behind it, and where it is used. Tell me the topic and I will walk through each layer with an example you can revise from.";
  }
  return "Good question. Break it into what you already know, what the question is actually asking, and the one step connecting them. Share more detail and I will guide you through it step by step.";
}

export function StudyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I'm StudyMate. Ask me about any topic, or pick a suggestion below to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", text: draftAnswer(trimmed) },
      ]);
      setThinking(false);
    }, 700);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border glass-panel shadow-elegant">
      <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand">
            <Bot className="size-4 text-primary-foreground" />
          </span>
          <div>
            <p className="text-sm font-semibold">StudyMate Assistant</p>
            <p className="text-xs text-muted-foreground">
              Demo responses — ready for a live AI model
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs text-muted-foreground sm:flex">
          <span className="size-2 rounded-full bg-primary" />
          Online
        </span>
      </div>

      <div ref={listRef} className="max-h-96 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
              {m.role === "user" ? (
                <User className="size-4 text-lavender" />
              ) : (
                <Bot className="size-4 text-blush" />
              )}
            </span>
            <p
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary/25 text-foreground"
                  : "border border-border bg-surface-2/60 text-foreground/90"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {thinking ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> StudyMate is thinking…
          </div>
        ) : null}
      </div>

      <div className="border-t border-border/70 px-5 py-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask StudyMate anything about your studies…"
            aria-label="Message StudyMate"
            className="h-11 bg-surface-2/60"
          />
          <Button type="submit" variant="hero" size="lg" disabled={!input.trim() || thinking}>
            Send <CornerDownLeft className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

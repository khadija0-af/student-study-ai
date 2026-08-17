import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookMarked, Calculator, FlaskConical, Globe2, Code2, Landmark } from "lucide-react";
import { ZapierChatbot } from "@/components/zapier-chatbot";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/study-help")({
  head: () => ({
    meta: [
      { title: "Study Help & AI Assistant — StudyMate AI" },
      {
        name: "description",
        content:
          "Chat with the StudyMate AI assistant, pick a subject focus and track revision progress across your topics.",
      },
      { property: "og:title", content: "Study Help & AI Assistant — StudyMate AI" },
      {
        property: "og:description",
        content: "Ask StudyMate for explanations, quizzes and revision plans in any subject.",
      },
    ],
  }),
  component: StudyHelpPage,
});

const subjects = [
  { icon: Calculator, name: "Mathematics", progress: 72 },
  { icon: FlaskConical, name: "Sciences", progress: 58 },
  { icon: Code2, name: "Computing", progress: 84 },
  { icon: Globe2, name: "Languages", progress: 41 },
  { icon: Landmark, name: "Business", progress: 63 },
  { icon: BookMarked, name: "Humanities", progress: 50 },
];

function StudyHelpPage() {
  const [active, setActive] = useState("Computing");

  return (
    <div className="bg-hero-glow">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blush">Study Help</p>
          <h1 className="mt-3 text-4xl font-semibold">Your study dashboard</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Choose a subject focus, then ask StudyMate for explanations, summaries or practice
            questions.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-3">
            <div className="rounded-3xl border border-border bg-surface/60 p-5">
              <h2 className="text-sm font-semibold">Subject focus</h2>
              <div className="mt-4 space-y-2">
                {subjects.map((s) => {
                  const isActive = s.name === active;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setActive(s.name)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                        isActive
                          ? "border-primary/60 bg-primary/20 text-foreground"
                          : "border-border bg-surface-2/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <s.icon className="size-4" />
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/60 p-5">
              <h2 className="text-sm font-semibold">Revision progress</h2>
              <div className="mt-4 space-y-4">
                {subjects.slice(0, 4).map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{s.name}</span>
                      <span>{s.progress}%</span>
                    </div>
                    <Progress value={s.progress} className="mt-2 h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface/60 p-6">
              <h2 className="text-lg font-semibold">{active} focus</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                StudyMate will tailor examples and practice questions to {active.toLowerCase()}{" "}
                topics while this focus is selected.
              </p>
              <Button
                variant="soft"
                size="sm"
                className="mt-4"
                onClick={() =>
                  document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ask StudyMate
              </Button>
            </div>

            <section id="chat" className="scroll-mt-28">
              <h2 className="mb-4 text-lg font-semibold">Ask StudyMate</h2>
              <ZapierChatbot subject={active} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

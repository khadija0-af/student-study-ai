import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Notes & Resources — StudyMate AI" },
      {
        name: "description",
        content:
          "Search StudyMate's library of note templates, summary packs, reading lists and revision checklists organised by subject.",
      },
      { property: "og:title", content: "Notes & Resources — StudyMate AI" },
      {
        property: "og:description",
        content: "Searchable note templates, summary sheets and revision checklists for students.",
      },
    ],
  }),
  component: ResourcesPage,
});

const categories = ["All", "Notes", "Summaries", "Practice", "Planning"] as const;

const items = [
  {
    title: "Cornell note template",
    category: "Notes",
    subject: "Any subject",
    text: "Split-page layout for cues, notes and a summary line.",
  },
  {
    title: "Mind-map starter sheet",
    category: "Notes",
    subject: "Sciences",
    text: "Branch structure for linking definitions and processes.",
  },
  {
    title: "Exam summary pack",
    category: "Summaries",
    subject: "Business",
    text: "One page per topic with key terms and models.",
  },
  {
    title: "Formula reference sheet",
    category: "Summaries",
    subject: "Mathematics",
    text: "Grouped formulas with worked examples beside each.",
  },
  {
    title: "Past-paper question bank",
    category: "Practice",
    subject: "Computing",
    text: "Mixed short and long answer questions with mark hints.",
  },
  {
    title: "Active recall flashcards",
    category: "Practice",
    subject: "Languages",
    text: "Printable card grid for vocabulary and definitions.",
  },
  {
    title: "7-day revision planner",
    category: "Planning",
    subject: "Any subject",
    text: "Timetable with focus blocks, breaks and review slots.",
  },
  {
    title: "Deadline tracker",
    category: "Planning",
    subject: "Any subject",
    text: "Assignment log with progress and submission dates.",
  },
];

function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (category === "All" || i.category === category) &&
        (q === "" ||
          i.title.toLowerCase().includes(q) ||
          i.subject.toLowerCase().includes(q) ||
          i.text.toLowerCase().includes(q)),
    );
  }, [query, category]);

  return (
    <div className="bg-hero-glow">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blush">
            Notes &amp; Resources
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Study library</h1>
          <p className="mt-3 text-muted-foreground">
            Search templates, summaries and planners, then take them into your next study session.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources…"
              aria-label="Search resources"
              className="h-11 bg-surface-2/60 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                  category === c
                    ? "border-primary/60 bg-primary/20 text-foreground"
                    : "border-border bg-surface-2/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-surface/60 p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No resources match that search. Try another keyword or category.
            </p>
            <Button
              variant="soft"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-3xl border border-border bg-surface/60 p-6 card-lift"
              >
                <div className="flex items-center justify-between">
                  <FileText className="size-5 text-lavender" />
                  <span className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.text}</p>
                <p className="mt-3 text-xs text-muted-foreground">{item.subject}</p>
                <Button
                  variant="soft"
                  size="sm"
                  className="mt-5 self-start"
                  onClick={() =>
                    toast.success(`${item.title} added to your study list`, {
                      description: "Open Study Help to work through it with StudyMate.",
                    })
                  }
                >
                  <Download className="size-4" /> Save to list
                </Button>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-border bg-surface/60 p-8 text-center">
          <h2 className="text-2xl font-semibold">Need help using a resource?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Ask StudyMate to walk you through any template or turn it into a revision plan.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-5">
            <Link to="/study-help" hash="chat">
              Ask StudyMate
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

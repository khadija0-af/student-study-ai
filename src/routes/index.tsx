import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  GraduationCap,
  Highlighter,
  LineChart,
  ListChecks,
  MessageSquare,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyMate AI — Smart Study Assistant for Students" },
      {
        name: "description",
        content:
          "StudyMate AI is your smart companion for learning, revision and study support: AI study help, organised notes and resources, and answers to common questions.",
      },
      { property: "og:title", content: "StudyMate AI — Smart Study Assistant for Students" },
      {
        property: "og:description",
        content:
          "StudyMate AI is your smart companion for learning, revision and study support: AI study help, organised notes and resources, and answers to common questions.",
      },
    ],
  }),
  component: Home,
});

const studyHelp = [
  {
    icon: Brain,
    title: "Concept explainers",
    text: "Turn dense lecture material into plain-language explanations with examples you can revise from.",
  },
  {
    icon: ListChecks,
    title: "Practice questions",
    text: "Generate quizzes and self-test prompts from any topic to check what actually stuck.",
  },
  {
    icon: Timer,
    title: "Revision planning",
    text: "Build focused study blocks with spaced repetition so exam week never feels rushed.",
  },
];

const resources = [
  {
    icon: FileText,
    title: "Note templates",
    text: "Cornell, mind-map and summary sheets ready to fill in.",
  },
  {
    icon: Highlighter,
    title: "Summary packs",
    text: "Condensed topic sheets for fast pre-exam review.",
  },
  {
    icon: BookOpen,
    title: "Reading lists",
    text: "Curated references grouped by subject and difficulty.",
  },
  {
    icon: LineChart,
    title: "Progress tracking",
    text: "See which topics need another pass before the exam.",
  },
];

const stats = [
  { value: "12+", label: "Study tools" },
  { value: "24/7", label: "Assistant access" },
  { value: "6", label: "Subject areas" },
  { value: "100%", label: "Student focused" },
];

const faqs = [
  {
    q: "What is StudyMate AI?",
    a: "StudyMate AI is a study assistant that helps you understand topics, organise notes and plan revision. It combines an AI chat companion with a library of study resources in one dashboard.",
  },
  {
    q: "How does the AI assistant help me revise?",
    a: "Ask it to explain a concept, summarise your notes, or quiz you. It responds with structured guidance you can turn straight into revision material.",
  },
  {
    q: "Is StudyMate AI suitable for any subject?",
    a: "Yes. It works across sciences, humanities, computing and business subjects — anywhere you need explanations, summaries or practice questions.",
  },
  {
    q: "Can I use it on my phone?",
    a: "The interface is fully responsive, so the dashboard, resources and chat all adapt to mobile, tablet and desktop screens.",
  },
  {
    q: "Will it replace my lectures and reading?",
    a: "No. StudyMate is a support tool: it clarifies material and structures your revision, while your course content stays the primary source.",
  },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-4 py-1.5 text-xs text-muted-foreground">
              <GraduationCap className="size-3.5 text-lavender" />
              AI study assistant for students
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight sm:text-6xl">
              StudyMate <span className="text-gradient">AI</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Your smart companion for learning, revision and study support.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link to="/study-help" hash="chat">
                  Ask StudyMate <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link to="/resources">Browse resources</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-surface/60 p-5 text-center card-lift"
              >
                <p className="font-display text-2xl font-semibold text-lavender">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Help */}
      <section id="study-help" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blush">Study Help</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Support for every stage of learning
          </h2>
          <p className="mt-3 text-muted-foreground">
            From first read-through to final revision, StudyMate breaks work into steps you can
            actually finish.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {studyHelp.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border bg-surface/60 p-6 card-lift"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/20">
                <item.icon className="size-5 text-lavender" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button asChild variant="soft">
            <Link to="/study-help">
              Open Study Help <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="border-y border-border/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blush">
              Notes &amp; Resources
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              A tidy library instead of scattered files
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-background/40 p-6 card-lift"
              >
                <item.icon className="size-5 text-blush" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild variant="soft">
              <Link to="/resources">
                View all resources <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Assistant callout */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-hero-glow p-8 shadow-elegant sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-lavender">
                <MessageSquare className="size-4" /> AI Assistant
              </span>
              <h2 className="mt-3 text-3xl font-semibold">Talk it through with StudyMate</h2>
              <p className="mt-3 text-muted-foreground">
                Ask a question, paste your notes, or request a revision plan. The assistant lives on
                the Study Help page.
              </p>
            </div>
            <Button asChild variant="hero" size="xl">
              <Link to="/study-help" hash="chat">
                Ask StudyMate <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-surface/60 px-5"
            >
              <AccordionTrigger className="text-left text-base hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

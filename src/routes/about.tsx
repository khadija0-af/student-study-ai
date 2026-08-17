import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About StudyMate AI — Project Overview" },
      {
        name: "description",
        content:
          "Learn what StudyMate AI does, the technology behind the study assistant, and how to get in touch with the project team.",
      },
      { property: "og:title", content: "About StudyMate AI — Project Overview" },
      {
        property: "og:description",
        content: "The purpose, approach and roadmap behind the StudyMate AI study assistant.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Sparkles,
    title: "Clarity first",
    text: "Explanations are written in plain language with concrete examples, not jargon.",
  },
  {
    icon: Users,
    title: "Built for students",
    text: "Every feature maps to a real study habit: understand, summarise, practise, review.",
  },
  {
    icon: ShieldCheck,
    title: "Support, not shortcuts",
    text: "StudyMate guides your thinking so your own understanding is what improves.",
  },
];

function AboutPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="bg-hero-glow">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blush">About</p>
          <h1 className="mt-3 text-4xl font-semibold">About StudyMate AI</h1>
          <p className="mt-4 text-muted-foreground">
            StudyMate AI is a student study assistant that brings explanations, notes, resources and
            revision planning into a single calm interface. It was designed as a university project
            to show how an AI companion can support learning without replacing it.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-border bg-surface/60 p-6 card-lift"
            >
              <v.icon className="size-5 text-lavender" />
              <h2 className="mt-4 font-semibold">{v.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-border bg-surface/60 p-7">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">1. Pick a focus.</span> Choose a
              subject on the Study Help dashboard so answers stay relevant.
            </li>
            <li>
              <span className="font-semibold text-foreground">2. Ask the assistant.</span> Request
              explanations, summaries, quizzes or revision plans in the chat panel.
            </li>
            <li>
              <span className="font-semibold text-foreground">3. Use the library.</span> Pair each
              answer with a template or summary pack from Resources.
            </li>
            <li>
              <span className="font-semibold text-foreground">4. Track progress.</span> Review which
              topics still need another pass before your exam.
            </li>
          </ol>
          <p className="mt-5 text-sm text-muted-foreground">
            The chat panel currently runs on demo responses and is structured so a live AI model can
            be connected in place of them.
          </p>
          <Button asChild variant="hero" className="mt-6">
            <Link to="/study-help" hash="chat">
              Try the assistant
            </Link>
          </Button>
        </section>

        <section id="contact" className="mt-12 scroll-mt-28">
          <h2 className="text-2xl font-semibold">Contact the team</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Questions, feedback or evaluation notes — send them over.
          </p>

          {sent ? (
            <div className="mt-6 rounded-3xl border border-primary/50 bg-primary/15 p-8 text-center">
              <Mail className="mx-auto size-6 text-lavender" />
              <p className="mt-3 font-semibold">Thanks, {form.name || "friend"}!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your message has been recorded. We'll reply to {form.email}.
              </p>
              <Button
                variant="soft"
                className="mt-5"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", message: "" });
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              className="mt-6 space-y-4 rounded-3xl border border-border bg-surface/60 p-7"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Message sent to the StudyMate team");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-surface-2/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@university.edu"
                    className="bg-surface-2/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can StudyMate help you?"
                  className="bg-surface-2/60"
                />
              </div>
              <Button type="submit" variant="hero" size="lg">
                Send message
              </Button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

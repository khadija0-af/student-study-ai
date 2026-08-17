import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-brand">
              <Sparkles className="size-4 text-primary-foreground" />
            </span>
            <span className="font-display font-semibold">StudyMate AI</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Your smart companion for learning, revision and study support.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/study-help" className="transition-colors hover:text-foreground">
                Study Help
              </Link>
            </li>
            <li>
              <Link to="/resources" className="transition-colors hover:text-foreground">
                Notes &amp; Resources
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                to="/study-help"
                hash="chat"
                className="transition-colors hover:text-foreground"
              >
                Ask StudyMate
              </Link>
            </li>
            <li>
              <Link to="/" hash="faq" className="transition-colors hover:text-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/about" hash="contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        StudyMate AI — university project demo. Built for students.
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { Bot, Loader2 } from "lucide-react";

const SCRIPT_SRC =
  "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
const CHATBOT_ID = "cmsx95mwx000f8yhygx6i149p";

function useZapierScript() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.customElements?.get("zapier-interfaces-chatbot-embed")) {
      setReady(true);
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.type = "module";
      script.async = true;
      document.head.appendChild(script);
    }

    let cancelled = false;
    window.customElements
      ?.whenDefined("zapier-interfaces-chatbot-embed")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

export function ZapierChatbot({ subject }: { subject?: string }) {
  const ready = useZapierScript();

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
              {subject ? `Study interest: ${subject}` : "Ask anything about your studies"}
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs text-muted-foreground sm:flex">
          <span className="size-2 rounded-full bg-primary" />
          Online
        </span>
      </div>

      {subject ? (
        <p className="border-b border-border/70 bg-surface-2/40 px-5 py-3 text-xs text-muted-foreground">
          Your selected study interest is <span className="text-foreground">{subject}</span>. You can
          ask StudyMate anything about this subject.
        </p>
      ) : null}

      <div className="relative min-h-[560px] w-full px-2 py-3 sm:px-4">
        {!ready ? (
          <div className="flex h-[560px] items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading StudyMate assistant…
          </div>
        ) : null}
        <zapier-interfaces-chatbot-embed
          is-popup="false"
          chatbot-id={CHATBOT_ID}
          height="600px"
          width="100%"
          style={{ display: ready ? "block" : "none", width: "100%", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "zapier-interfaces-chatbot-embed": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "is-popup"?: string;
          "chatbot-id"?: string;
          height?: string;
          width?: string;
        },
        HTMLElement
      >;
    }
  }
}

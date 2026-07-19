import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

declare global {
  interface Window {
    YQV5?: {
      trackSingle: (config: {
        YQ_ContainerId: string;
        YQ_Height: number;
        YQ_Fc: string;
        YQ_Lang: string;
        YQ_Num: string;
      }) => void;
    };
  }
}

const WIDGET_CONTAINER_ID = "track-order-widget";
let widgetScriptPromise: Promise<void> | null = null;

function loadWidgetScript() {
  if (!widgetScriptPromise) {
    widgetScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://www.17track.net/externalcall.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load 17TRACK widget"));
      document.body.appendChild(script);
    });
  }
  return widgetScriptPromise;
}

export function TrackOrder() {
  const [tracking, setTracking] = useState("");
  const [showWidget, setShowWidget] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = tracking.trim();
    if (!num) return;

    setWidgetError(false);
    setShowWidget(true);

    try {
      await loadWidgetScript();
      // The container needs to exist before trackSingle renders into it.
      requestAnimationFrame(() => {
        window.YQV5?.trackSingle({
          YQ_ContainerId: WIDGET_CONTAINER_ID,
          YQ_Height: 420,
          YQ_Fc: "0",
          YQ_Lang: "en",
          YQ_Num: num,
        });
      });
    } catch {
      setWidgetError(true);
    }
  };

  return (
    <section className="px-5 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mx-auto text-center transition-[max-width] ${showWidget ? "max-w-2xl" : "max-w-xl"}`}
      >
        <PackageSearch size={36} className="mx-auto text-teal-300" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
          Track your order
        </h1>
        <p className="mt-3 text-neutral-400">
          Please enter you tracking number below. If your tracking number
          doesn't work feel free to contact us.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
          <input
            type="text"
            required
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="Tracking number"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-teal-300"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-teal-400 py-3.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-[1.01] cursor-pointer"
          >
            Track order
          </button>
        </form>

        {showWidget && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left">
            {widgetError ? (
              <div className="p-5 text-sm text-neutral-400">
                Couldn't load the tracking widget. You can also{" "}
                <a
                  href={`https://www.17track.net/en/track?nums=${encodeURIComponent(tracking.trim())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-300 underline"
                >
                  track it directly on 17TRACK
                </a>
                .
              </div>
            ) : (
              <div id={WIDGET_CONTAINER_ID} ref={containerRef} />
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}

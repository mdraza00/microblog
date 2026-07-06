import { Link } from "react-router-dom";
import { Button } from "/components/ui/button";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 select-none">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 md:p-10 text-center flex flex-col items-center gap-6 shadow-[0_8px_30px_oklch(0.145_0_0_/_3%)] hover:shadow-[0_12px_40px_oklch(0.145_0_0_/_6%)] transition-all duration-500 ease-out hover:-translate-y-1">
        {/* Playful status tag */}
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/20 tracking-wider uppercase">
          404 Lost
        </span>

        {/* Playground themed SVG Illustration */}
        <div className="w-full flex justify-center py-2 text-accent/90 hover:text-accent transition-colors duration-300">
          <svg
            viewBox="0 0 200 160"
            width="100%"
            height="140"
            className="max-w-[200px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Top Frame */}
            <line
              x1="30"
              y1="20"
              x2="170"
              y2="20"
              strokeWidth="4"
              className="text-foreground/20"
            />

            {/* Left Frame Legs */}
            <line
              x1="50"
              y1="20"
              x2="25"
              y2="140"
              className="text-foreground/15"
            />
            <line
              x1="50"
              y1="20"
              x2="70"
              y2="140"
              className="text-foreground/15"
            />

            {/* Right Frame Legs */}
            <line
              x1="150"
              y1="20"
              x2="130"
              y2="140"
              className="text-foreground/15"
            />
            <line
              x1="150"
              y1="20"
              x2="175"
              y2="140"
              className="text-foreground/15"
            />

            {/* Swaying swing ropes (slanted to simulate motion) */}
            <line x1="85" y1="20" x2="98" y2="92" className="stroke-accent" />
            <line x1="115" y1="20" x2="128" y2="92" className="stroke-accent" />

            {/* Hanging swing seat */}
            <path
              d="M 92 92 L 134 92 A 3 3 0 0 1 134 98 L 92 98 A 3 3 0 0 1 92 92 Z"
              fill="currentColor"
              fillOpacity="0.1"
              className="text-accent stroke-accent"
            />

            {/* Dashed motion arc */}
            <path
              d="M 65 96 Q 110 115 155 96"
              strokeDasharray="4 4"
              className="text-accent/30"
              strokeWidth="1.5"
            />

            {/* Playful fallen leaf on ground */}
            <path
              d="M 112 135 C 117 130, 126 133, 121 138 C 116 143, 109 140, 112 135 Z"
              fill="currentColor"
              fillOpacity="0.3"
              className="text-accent stroke-none"
            />
          </svg>
        </div>

        {/* Messaging */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
            Oops! You've drifted away.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[32ch] mx-auto text-balance">
            The playground swing is empty here. The page you are looking for has
            wandered off or never existed.
          </p>
        </div>

        {/* Go to Home Action */}
        <Button
          asChild
          size="lg"
          className="w-full sm:w-auto px-8 rounded-2xl bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold shadow-sm hover:shadow-md active:translate-y-px transition-all duration-300"
        >
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};

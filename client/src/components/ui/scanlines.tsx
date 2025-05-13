import { cn } from "@/lib/utils";

interface ScanlinesProps {
  className?: string;
}

export const Scanlines = ({ className }: ScanlinesProps) => {
  return (
    <div className={cn(
      "fixed top-0 left-0 w-full h-full pointer-events-none z-50",
      "bg-scanlines opacity-15",
      className
    )}></div>
  );
};

// Add scanlines to global styles in index.css
const scanlineStyle = `
  .bg-scanlines {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 4px;
  }
`;

// Inject the scanline style into document head if not in index.css
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = scanlineStyle;
  document.head.appendChild(styleEl);
}

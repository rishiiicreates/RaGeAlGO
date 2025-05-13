import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
}

export const ProgressBar = ({ value, color = "bg-retro-teal", label }: ProgressBarProps) => {
  return (
    <div className="progress-container">
      <div 
        className={cn("progress-bar", color)}
        style={{ width: `${value}%` }}
      ></div>
      {label && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs">
          {label}
        </div>
      )}
    </div>
  );
};

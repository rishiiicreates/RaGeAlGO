import { cn } from "@/lib/utils";

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
}

export const PixelCard = ({ children, className }: PixelCardProps) => {
  return (
    <div className={cn("pixel-card", className)}>
      {children}
    </div>
  );
};

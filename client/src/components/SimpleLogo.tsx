import { cn } from "../lib/utils";

interface SimpleLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function SimpleLogo({ size = "md", showText = true, className }: SimpleLogoProps) {
  const sizeClasses = {
    sm: "h-4 w-4 text-xs",
    md: "h-8 w-8 text-sm", 
    lg: "h-12 w-12 text-lg"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/logo.png" 
        alt="Home Elem Logo" 
        className={cn(sizeClasses[size], "object-contain")}
        onError={(e) => {
          // Hide image if it fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
      {showText && (
        <span className={cn("font-extrabold tracking-tight", textSizeClasses[size])}>
          Home Elem
        </span>
      )}
    </div>
  );
}

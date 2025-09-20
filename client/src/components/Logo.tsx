import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
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
        alt="HomeElem Logo" 
        className={cn(sizeClasses[size], "object-contain")}
        onError={(e) => {
          // Fallback to text if image fails to load
          e.currentTarget.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = cn(
            sizeClasses[size], 
            "flex items-center justify-center rounded-md bg-primary text-primary-foreground font-black"
          );
          fallback.textContent = 'H';
          e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget);
        }}
      />
      {showText && (
        <span className={cn("font-extrabold tracking-tight", textSizeClasses[size])}>
          HomeElem
        </span>
      )}
    </div>
  );
}

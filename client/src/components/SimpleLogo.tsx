import { cn } from "@/lib/utils";

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
      <div className={cn(
        sizeClasses[size], 
        "flex items-center justify-center rounded-md bg-primary text-primary-foreground font-black",
        "relative overflow-hidden"
      )}>
        {/* House icon using CSS */}
        <div className="relative w-3/4 h-3/4">
          {/* House base */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-current rounded-sm"></div>
          {/* Roof */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-current"></div>
          {/* Door */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1/2 bg-primary rounded-sm"></div>
          {/* Windows */}
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary rounded-sm"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary rounded-sm"></div>
        </div>
      </div>
      {showText && (
        <span className={cn("font-extrabold tracking-tight", textSizeClasses[size])}>
          HomeElem
        </span>
      )}
    </div>
  );
}

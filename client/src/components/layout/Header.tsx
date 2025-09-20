import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="HomeElem Logo" 
            className="h-8 w-8 object-contain"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = "h-8 w-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-black";
              fallback.textContent = 'H';
              e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget);
            }}
          />
          <span className="text-xl font-extrabold tracking-tight">HomeElem</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to="/customer-service">Support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Register Product</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

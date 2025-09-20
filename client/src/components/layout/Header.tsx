import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-black">H</span>
          <span className="text-xl font-extrabold tracking-tight">HomeElem</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>Products</NavLink>
          <a href="/#categories" className="text-muted-foreground hover:text-foreground">Categories</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/register">Register Product</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

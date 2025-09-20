import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setIsAnimating(true);
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header ref={menuRef} className="sticky top-0 z-[100] w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="HomeElem Logo" 
              className="h-8 w-8 object-contain flex-shrink-0"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = "h-8 w-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-black flex-shrink-0";
                fallback.textContent = 'H';
                e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget);
              }}
            />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight truncate">HomeElem</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/products">Products</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/about">About Us</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/contact">Contact</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/customer-service">Support</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Register Product</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-1 flex-shrink-0">
            {/* Always visible Register Product button on mobile */}
            <Button asChild variant="outline" size="sm" className="text-xs px-2 py-1 h-8">
              <Link to="/register" onClick={closeMenu}>Register</Link>
            </Button>
            
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-1 h-8 w-8 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className={`md:hidden fixed inset-0 bg-black/30 z-[9998] transition-opacity duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
          />
          
          {/* Sidebar */}
          <div className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
            isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
            
            {/* Sidebar Content */}
            <div className="p-6 space-y-3">
              <Link 
                to="/products" 
                className="block w-full p-4 text-left text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="block w-full p-4 text-left text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block w-full p-4 text-left text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/customer-service" 
                className="block w-full p-4 text-left text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Support
              </Link>
              
              {/* Separator */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
              
              {/* Register Product Button */}
              <Link 
                to="/register" 
                className="block w-full p-4 text-center text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Register Product
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

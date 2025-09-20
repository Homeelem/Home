export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} HomeElem. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="HomeElem Logo" 
            className="h-4 w-4 object-contain"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = "h-4 w-4 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-black text-xs";
              fallback.textContent = 'H';
              e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget);
            }}
          />
          <span className="font-semibold text-foreground">HomeElem</span>
          <span>• Home & Kitchen Excellence</span>
        </p>
      </div>
    </footer>
  );
}

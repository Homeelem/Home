import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} HomeElem. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Logo size="sm" showText={true} />
          <span>• Home & Kitchen Excellence</span>
        </div>
      </div>
    </footer>
  );
}

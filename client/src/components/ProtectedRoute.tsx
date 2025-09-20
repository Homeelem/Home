import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminAuth from "./AdminAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  pageName?: string;
}

export default function ProtectedRoute({ children, pageName = "Admin Panel" }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsChecking(false);
      if (!user) {
        setShowAuth(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setShowAuth(false);
  };

  const handleAuthCancel = () => {
    setShowAuth(false);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!user || showAuth) {
    return (
      <AdminAuth
        onSuccess={handleAuthSuccess}
        onCancel={handleAuthCancel}
      />
    );
  }

  // Show protected content if authenticated
  return (
    <div>
      <div className="bg-muted/50 border-b">
        <div className="container py-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {pageName} - Authenticated as {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

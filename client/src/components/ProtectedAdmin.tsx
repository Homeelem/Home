import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../pages/Admin";
import PasswordDialog from "./PasswordDialog";

const ADMIN_SESSION_KEY = "admin_authenticated";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export default function ProtectedAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    try {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (sessionData) {
        const { timestamp } = JSON.parse(sessionData);
        const now = Date.now();
        
        // Check if session is still valid (30 minutes)
        if (now - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear it
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } finally {
      setIsChecking(false);
    }
  };

  const handlePasswordSuccess = () => {
    // Store authentication in localStorage with timestamp
    const sessionData = {
      timestamp: Date.now(),
      authenticated: true
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
    
    setIsAuthenticated(true);
    setShowPasswordDialog(false);
  };

  const handlePasswordCancel = () => {
    setShowPasswordDialog(false);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    navigate("/");
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

  // Show password dialog if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <PasswordDialog
          open={showPasswordDialog || true}
          onSuccess={handlePasswordSuccess}
          onCancel={handlePasswordCancel}
        />
        <div className="container py-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Authentication required to access admin panel.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show admin panel if authenticated
  return (
    <div>
      <div className="bg-muted/50 border-b">
        <div className="container py-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Admin Panel - Authenticated</span>
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Admin />
    </div>
  );
}

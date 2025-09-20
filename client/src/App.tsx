import "./global.css";

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import ThankYou from "./pages/ThankYou";
import LogoTest from "./pages/LogoTest";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import RegistrationsAdmin from "./pages/RegistrationsAdmin";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/logo-test" element={<LogoTest />} />
          <Route path="/admin-secret-2024" element={<ProtectedRoute pageName="Products Admin"><Admin /></ProtectedRoute>} />
          <Route path="/admin-registrations-secret-2024" element={<ProtectedRoute pageName="Registrations Admin"><RegistrationsAdmin /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

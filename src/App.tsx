import { lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { MotionConfig } from "framer-motion";
import RouteMetadata from "./components/v2/RouteMetadata";
import RouteLoadingBoundary from "./components/RouteLoadingBoundary";
import Analytics from "./components/Analytics";

const TrainingPlans = lazy(() => import("./pages/TrainingPlans"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Challenges = lazy(() => import("./pages/Challenges"));
const Footballers = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Terms = lazy(() => import("./pages/Terms"));

const queryClient = new QueryClient();

const App = () => (
  <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <RouteMetadata />
          <Analytics />
          <CookieBanner />
          <ScrollToTop />
          <WhatsAppButton />
          <RouteLoadingBoundary>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/planes" element={<TrainingPlans />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/retos" element={<Challenges />} />
              <Route path="/blog" element={<Navigate to="/retos" replace />} />
              <Route path="/clientes" element={<Footballers />} />
              <Route path="/futbolistas" element={<Navigate to="/clientes" replace />} />
              <Route path="/reviews" element={<Navigate to="/clientes" replace />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/privacidad" element={<PrivacyPolicy />} />
              <Route path="/aviso-legal" element={<LegalNotice />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="/condiciones" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteLoadingBoundary>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </MotionConfig>
);

export default App;

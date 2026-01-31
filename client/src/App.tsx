import { Switch, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import Calculator from "@/pages/Calculator";
import BlogPage from "@/pages/BlogPage";
import PostPage from "@/pages/PostPage";

// New Product Pages
import CTCReport from './pages/products/CTCReport';
import NegotiationLetter from './pages/products/NegotiationLetter';
import TaxStrategy from './pages/products/TaxStrategy';

// New Essential Pages
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Thank You Page
import ThankYou from './pages/ThankYou';

function Router() {
  return (
    <Switch>
      {/* Existing Routes */}
      <Route path="/" component={Home} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={PostPage} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      
      {/* New Product Routes - Revenue Pages */}
      <Route path="/products/ctc-report" component={CTCReport} />
      <Route path="/products/negotiation-letter" component={NegotiationLetter} />
      <Route path="/products/tax-strategy" component={TaxStrategy} />
      
      {/* New Essential Routes */}
      <Route path="/about" component={About} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      
      {/* Thank You Page - After Payment */}
      <Route path="/thank-you" component={ThankYou} />
      
      {/* 404 Page - Keep Last */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DataCenter from "./pages/DataCenter";
import Crops from "./pages/Crops";
import Livestock from "./pages/Livestock";
import DecisionSupport from "./pages/DecisionSupport";
import Financing from "./pages/Financing";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <main className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/data-center" element={<DataCenter />} />
                  <Route path="/crops" element={<Crops />} />
                  <Route path="/livestock" element={<Livestock />} />
                  <Route path="/decision-support" element={<DecisionSupport />} />
                  <Route path="/financing" element={<Financing />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

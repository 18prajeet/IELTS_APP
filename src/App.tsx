import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import Arena from "@/pages/arena";
import NotFound from "@/pages/not-found";

// Placeholder components for routes not yet fully implemented
function Plan() {
  return <div className="p-8 text-center text-muted-foreground">Study Plan Feature Coming Soon</div>;
}

function Mentor() {
  return <div className="p-8 text-center text-muted-foreground">AI Mentor Chat Feature Coming Soon</div>;
}

function Profile() {
  return <div className="p-8 text-center text-muted-foreground">Profile Settings Feature Coming Soon</div>;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/arena" component={Arena} />
        <Route path="/plan" component={Plan} />
        <Route path="/mentor" component={Mentor} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

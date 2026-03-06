import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "./components/Toast";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Recommendations from "./pages/Recommendations";
import Presentation3D from "./pages/Presentation3D";
import Presentation3DAdvanced from "./pages/Presentation3DAdvanced";
import SiteDetail from "./pages/SiteDetail";
import Dashboard from "./pages/Dashboard";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/explore"} component={Explore} />
      <Route path={"/recommendations"} component={Recommendations} />
      <Route path={"/presentation"} component={Presentation3D} />
      <Route path={"/presentation-advanced"} component={Presentation3DAdvanced} />
      <Route path={"/site/:id"} component={SiteDetail} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <ToastContainer />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

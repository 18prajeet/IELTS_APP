import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Swords, 
  Calendar, 
  BrainCircuit, 
  User, 
  Bell, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Arena", icon: Swords, href: "/arena" },
  { label: "Plan", icon: Calendar, href: "/plan" },
  { label: "AI Mentor", icon: BrainCircuit, href: "/mentor" },
  { label: "Profile", icon: User, href: "/profile" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: user } = useUser();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-card border-b sticky top-0 z-50">
        <div className="flex items-center gap-2 font-display font-bold text-xl text-primary">
          <BrainCircuit className="w-8 h-8 text-secondary" />
          <span>PrepAI</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center gap-2 font-display font-bold text-2xl text-primary border-b border-border/40">
          <BrainCircuit className="w-8 h-8 text-secondary" />
          <span>PrepAI</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Mini Profile */}
        {user && (
          <div className="p-4 border-t border-border/40">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarImage src={user.avatar || undefined} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Band {user.targetBand}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-display font-bold text-primary">
              {NAV_ITEMS.find(n => n.href === location)?.label || "Dashboard"}
            </h1>
            <p className="text-sm text-muted-foreground">Welcome back, let's keep the momentum going.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border shadow-sm">
              <span className="text-xl">🔥</span>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold">{user?.currentStreak || 0} Day Streak</span>
                <span className="text-[10px] text-muted-foreground">Keep it up!</span>
              </div>
            </div>
            
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

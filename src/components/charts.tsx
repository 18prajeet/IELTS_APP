import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format, subDays } from "date-fns";

const mockData = Array.from({ length: 14 }).map((_, i) => ({
  date: format(subDays(new Date(), 13 - i), 'MMM dd'),
  score: 60 + Math.random() * 30 + (i * 1.5), // Upward trend
  momentum: 40 + Math.random() * 40 + (i * 2),
}));

export function MomentumChart() {
  return (
    <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Momentum & Consistency</CardTitle>
        <CardDescription>Your learning velocity over the last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                }}
                itemStyle={{ fontSize: "12px", fontWeight: 600 }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                name="Proficiency"
                stroke="hsl(var(--secondary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
              <Area 
                type="monotone" 
                dataKey="momentum" 
                name="Momentum"
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMomentum)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityHeatmap({ activities }: { activities?: any[] }) {
  // Mock generating 365 days of activity
  const days = Array.from({ length: 52 * 7 }).map((_, i) => {
    // Random intensity 0-4, higher probability for 0
    const rand = Math.random();
    let intensity = 0;
    if (rand > 0.9) intensity = 4;
    else if (rand > 0.7) intensity = 3;
    else if (rand > 0.5) intensity = 2;
    else if (rand > 0.3) intensity = 1;
    
    return {
      date: subDays(new Date(), 364 - i),
      intensity,
    };
  });

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Activity Map</CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="w-2 h-2 rounded-sm bg-slate-200"></div>
            <div className="w-2 h-2 rounded-sm bg-teal-200"></div>
            <div className="w-2 h-2 rounded-sm bg-teal-300"></div>
            <div className="w-2 h-2 rounded-sm bg-teal-400"></div>
            <div className="w-2 h-2 rounded-sm bg-teal-700"></div>
            <span>More</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
            {days.map((day, i) => (
              <div 
                key={i}
                className={cn(
                  "w-3 h-3 rounded-[2px] transition-colors hover:ring-1 hover:ring-offset-1 hover:ring-primary/20",
                  day.intensity === 0 && "bg-slate-100",
                  day.intensity === 1 && "bg-teal-200/50",
                  day.intensity === 2 && "bg-teal-300",
                  day.intensity === 3 && "bg-teal-500",
                  day.intensity === 4 && "bg-teal-700"
                )}
                title={`${format(day.date, 'MMM dd')}: Level ${day.intensity}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper needed for cn
import { cn } from "@/lib/utils";

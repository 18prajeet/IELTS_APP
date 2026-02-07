import { useUser, useDailyChallenges, useCompleteChallenge, useBadges, useLeaderboard } from "@/hooks/use-data";
import { MomentumChart, ActivityHeatmap } from "@/components/charts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { 
  Trophy, 
  Flame, 
  Target, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Circle,
  BrainCircuit,
  Medal,
  Star,
  Swords,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: user } = useUser();
  const { data: challenges } = useDailyChallenges();
  const { data: badges } = useBadges();
  const { data: leaderboard } = useLeaderboard();
  const completeChallenge = useCompleteChallenge();

  const primaryWeakness = user?.weaknesses?.[0] || "Speaking";

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-8 pb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item} className="col-span-1 md:col-span-2">
          {/* AI Insight Banner */}
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-primary-foreground shadow-xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BrainCircuit className="w-64 h-64 -translate-y-1/2 translate-x-1/4" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-none">
                    <BrainCircuit className="w-3 h-3 mr-1" />
                    AI Insight
                  </Badge>
                  <span className="text-primary-foreground/70 text-sm font-medium">Daily Focus</span>
                </div>
                <h2 className="text-2xl font-bold font-display mb-1">Target your weakness: {primaryWeakness}</h2>
                <p className="text-primary-foreground/80 max-w-lg">
                  We noticed a dip in your {primaryWeakness} scores. Today's challenges are tailored to boost this specific skill.
                </p>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg border-0 font-semibold shrink-0">
                Start Focused Practice <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full bg-secondary/5 border-secondary/20 shadow-sm relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-5">
              <Target className="w-32 h-32 text-secondary" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-secondary flex items-center gap-2">
                <Target className="w-5 h-5" /> Current Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-display text-primary mb-1">
                Band {user?.targetBand || "7.5"}
              </div>
              <p className="text-muted-foreground text-sm mb-4">Estimated completion: 3 weeks</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span>Progress</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2 bg-secondary/20" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Charts Section */}
          <motion.div variants={item} className="grid grid-cols-1 gap-6">
            <MomentumChart />
            <ActivityHeatmap />
          </motion.div>

          {/* Daily Challenges */}
          <motion.div variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-display flex items-center gap-2">
                <Swords className="w-5 h-5 text-accent" />
                Daily Quests
              </h3>
              <span className="text-sm text-muted-foreground">Resets in 04:32:11</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges?.map((challenge) => (
                <Card 
                  key={challenge.id} 
                  className={cn(
                    "border transition-all duration-300 hover:shadow-md group",
                    challenge.isCompleted ? "bg-muted/30 border-border/50" : "bg-card border-border"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={cn(
                        "mb-2",
                        challenge.skill === "Speaking" && "bg-blue-50 text-blue-700 border-blue-200",
                        challenge.skill === "Writing" && "bg-purple-50 text-purple-700 border-purple-200",
                        challenge.skill === "Reading" && "bg-green-50 text-green-700 border-green-200",
                        challenge.skill === "Listening" && "bg-orange-50 text-orange-700 border-orange-200",
                      )}>
                        {challenge.skill}
                      </Badge>
                      {challenge.isAiTailored && (
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
                          <BrainCircuit className="w-3 h-3 mr-1" /> AI Pick
                        </Badge>
                      )}
                    </div>
                    <CardTitle className={cn("text-base", challenge.isCompleted && "line-through text-muted-foreground")}>
                      {challenge.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {challenge.estimatedTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {challenge.difficulty}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      className={cn("w-full transition-all", challenge.isCompleted ? "bg-green-600 hover:bg-green-700" : "")}
                      variant={challenge.isCompleted ? "default" : "outline"}
                      disabled={challenge.isCompleted || completeChallenge.isPending}
                      onClick={() => !challenge.isCompleted && completeChallenge.mutate(challenge.id)}
                    >
                      {challenge.isCompleted ? (
                        <>Completed <CheckCircle2 className="w-4 h-4 ml-2" /></>
                      ) : (
                        <>Start Challenge <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Badges */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-accent" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {badges?.slice(0, 6).map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center text-center gap-2 group cursor-pointer">
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm border-2 transition-transform group-hover:scale-110",
                        badge.isUnlocked 
                          ? "bg-gradient-to-br from-yellow-100 to-amber-100 border-accent text-accent-foreground" 
                          : "bg-muted border-transparent grayscale opacity-50"
                      )}>
                        {badge.icon}
                      </div>
                      <span className="text-xs font-medium leading-tight">{badge.name}</span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-sm text-muted-foreground hover:text-primary">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Leaderboard */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>Based on weekly momentum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaderboard?.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      entry.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                      entry.rank === 2 ? "bg-slate-100 text-slate-700" :
                      entry.rank === 3 ? "bg-orange-100 text-orange-700" :
                      "text-muted-foreground"
                    )}>
                      {entry.rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={entry.avatar || undefined} />
                      <AvatarFallback>{entry.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{entry.name}</p>
                    </div>
                    <div className="text-sm font-semibold text-primary">{entry.momentum} pts</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Upload */}
          <motion.div variants={item}>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg">Quick Assessment</h3>
                <p className="text-primary-foreground/70 text-sm">
                  Upload a writing sample or recording for instant AI grading.
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Upload Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

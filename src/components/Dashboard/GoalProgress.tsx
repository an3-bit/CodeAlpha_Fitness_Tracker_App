
import { Activity, ChevronRight, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const goals = [
  {
    id: 1,
    title: "Run 20 miles",
    progress: 12,
    total: 20,
    unit: "miles",
    category: "cardio",
    daysLeft: 5,
  },
  {
    id: 2,
    title: "Bench Press 200 lbs",
    progress: 185,
    total: 200,
    unit: "lbs",
    category: "strength",
    daysLeft: 14,
  },
  {
    id: 3,
    title: "Complete 30 Workouts",
    progress: 24,
    total: 30,
    unit: "workouts",
    category: "consistency",
    daysLeft: 21,
  },
];

const GoalProgress = () => {
  return (
    <div className="workout-card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Active Goals</h2>
        <button className="text-xs text-primary flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-5">
        {goals.map((goal) => {
          const percentage = Math.round((goal.progress / goal.total) * 100);
          let statusColor = "";
          let bgColor = "";

          if (goal.category === "cardio") {
            statusColor = "text-primary";
            bgColor = "bg-primary/10";
          } else if (goal.category === "strength") {
            statusColor = "text-secondary";
            bgColor = "bg-secondary/10";
          } else {
            statusColor = "text-fitness-purple";
            bgColor = "bg-fitness-purple/10";
          }

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("p-2 rounded-full", bgColor)}>
                    {goal.category === "consistency" ? (
                      <Trophy className={cn("h-4 w-4", statusColor)} />
                    ) : (
                      <Activity className={cn("h-4 w-4", statusColor)} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{goal.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {goal.daysLeft} days left
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {goal.progress} / {goal.total} {goal.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className={cn(
                  "h-1.5", 
                  goal.category === "cardio" ? "bg-primary/20" : 
                  goal.category === "strength" ? "bg-secondary/20" : "bg-fitness-purple/20"
                )}
                indicatorClassName={
                  goal.category === "cardio" ? "bg-primary" : 
                  goal.category === "strength" ? "bg-secondary" : "bg-fitness-purple"
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalProgress;

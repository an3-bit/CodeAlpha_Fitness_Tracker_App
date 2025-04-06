
import { Dumbbell, Heart, Timer, Trophy } from 'lucide-react';

const WorkoutSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="workout-card p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Workouts</h3>
            <p className="text-2xl font-bold mt-1">24</p>
            <p className="text-xs text-green-500 mt-1">+3 this week</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="w-full h-1 bg-muted mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">70% of monthly goal</p>
      </div>
      
      <div className="workout-card p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Active Minutes</h3>
            <p className="text-2xl font-bold mt-1">856</p>
            <p className="text-xs text-green-500 mt-1">+120 this week</p>
          </div>
          <div className="bg-secondary/10 p-3 rounded-full">
            <Timer className="w-5 h-5 text-secondary" />
          </div>
        </div>
        <div className="w-full h-1 bg-muted mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full" style={{ width: '62%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">62% of weekly goal</p>
      </div>
      
      <div className="workout-card p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Calories Burned</h3>
            <p className="text-2xl font-bold mt-1">12,456</p>
            <p className="text-xs text-green-500 mt-1">+1,843 this week</p>
          </div>
          <div className="bg-accent/10 p-3 rounded-full">
            <Heart className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="w-full h-1 bg-muted mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: '85%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">85% of weekly goal</p>
      </div>
      
      <div className="workout-card p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Active Days</h3>
            <p className="text-2xl font-bold mt-1">16</p>
            <p className="text-xs text-green-500 mt-1">+2 this month</p>
          </div>
          <div className="bg-fitness-purple/10 p-3 rounded-full">
            <Trophy className="w-5 h-5 text-fitness-purple" />
          </div>
        </div>
        <div className="w-full h-1 bg-muted mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-fitness-purple rounded-full" style={{ width: '55%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">55% of monthly goal</p>
      </div>
    </div>
  );
};

export default WorkoutSummary;

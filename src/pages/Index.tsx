
import { ArrowUpRight, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import WorkoutSummary from '@/components/Dashboard/WorkoutSummary';
import ActivityChart from '@/components/Dashboard/ActivityChart';
import GoalProgress from '@/components/Dashboard/GoalProgress';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pb-20">
        <div className="py-6 md:py-10 space-y-8">
          {/* Hero section */}
          <div className="hero-gradient rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-left mb-6 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome to FitTrack</h1>
              <p className="text-muted-foreground max-w-md mb-4">
                Track your fitness journey, set goals, and watch your progress. Let's build healthy habits together.
              </p>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Log Today's Workout
              </Button>
            </div>
            <div className="h-40 w-40 md:h-48 md:w-48 relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Fitness"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>
          
          {/* Workout Summary */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold">Your Fitness Summary</h2>
            <WorkoutSummary />
          </section>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <div>
              <GoalProgress />
            </div>
          </div>
          
          {/* Recent Workouts */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Workouts</h2>
              <Button variant="ghost" size="sm" className="flex items-center text-primary">
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="workout-card overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                  <img 
                    src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Upper Body Workout"
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Yesterday
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Upper Body Strength</h3>
                  <p className="text-sm text-muted-foreground mb-2">45 min • 5 exercises</p>
                  <div className="flex gap-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Chest</span>
                    <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">Arms</span>
                  </div>
                </div>
              </div>
              
              <div className="workout-card overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-secondary/20 to-accent/20 relative">
                  <img 
                    src="https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Cardio Workout"
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    2 days ago
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Morning Cardio</h3>
                  <p className="text-sm text-muted-foreground mb-2">30 min • 3 exercises</p>
                  <div className="flex gap-2">
                    <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">Running</span>
                    <span className="bg-fitness-purple/10 text-fitness-purple text-xs px-2 py-1 rounded-full">HIIT</span>
                  </div>
                </div>
              </div>
              
              <div className="workout-card overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-accent/20 to-fitness-purple/20 relative">
                  <img 
                    src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Leg Workout"
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    3 days ago
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Leg Day</h3>
                  <p className="text-sm text-muted-foreground mb-2">50 min • 6 exercises</p>
                  <div className="flex gap-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Squats</span>
                    <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">Deadlifts</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default Index;

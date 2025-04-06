
import { ArrowUpRight, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import WorkoutSummary from '@/components/Dashboard/WorkoutSummary';
import ActivityChart from '@/components/Dashboard/ActivityChart';
import GoalProgress from '@/components/Dashboard/GoalProgress';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  const isMobile = useIsMobile();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pb-20">
        <div className="py-6 md:py-10 space-y-8">
          {/* Hero section with background video */}
          <div className="hero-gradient rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="object-cover w-full h-full opacity-30"
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src="https://player.vimeo.com/progressive_redirect/playback/363625327/rendition/720p/file.mp4?loc=external&signature=5a5f6ca6d7fbbce5b0ffdfe2d9daf9c1cc9bfa00b06d8b1ac7d2c8ff2b19182e" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <div className="text-left mb-6 md:mb-0 z-10 relative">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome to FitTrack</h1>
              <p className="text-muted-foreground max-w-md mb-4">
                Track your fitness journey, set goals, and watch your progress. Let's build healthy habits together.
              </p>
              <div className="flex gap-3">
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Log Today's Workout
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/login" className="flex items-center">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="h-40 w-40 md:h-48 md:w-48 relative overflow-hidden z-10">
              <div className="animate-pulse-light">
                <img 
                  src="https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Fitness"
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
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
              <div className="workout-card overflow-hidden group hover:scale-[1.02] transition-all">
                <div className="h-32 relative">
                  <img 
                    src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Upper Body Workout"
                    className="w-full h-full object-cover"
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
              
              <div className="workout-card overflow-hidden group hover:scale-[1.02] transition-all">
                <div className="h-32 relative">
                  <img 
                    src="https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Cardio Workout"
                    className="w-full h-full object-cover"
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
              
              <div className="workout-card overflow-hidden group hover:scale-[1.02] transition-all">
                <div className="h-32 relative">
                  <img 
                    src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Leg Workout"
                    className="w-full h-full object-cover"
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


import Navbar from '@/components/Navbar';
import WorkoutForm from '@/components/Workout/WorkoutForm';
import { useIsMobile } from '@/hooks/use-mobile';

const WorkoutPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pb-20">
        <div className="py-6 md:py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Log Workout</h1>
          <WorkoutForm />
        </div>
      </main>
      
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default WorkoutPage;

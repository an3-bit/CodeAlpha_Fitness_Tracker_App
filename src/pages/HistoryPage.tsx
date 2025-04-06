
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar as CalendarIcon, Filter, ListFilter, Search } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

type Workout = {
  id: number;
  name: string;
  type: string;
  date: Date;
  duration: number;
  exercises: number;
  notes?: string;
};

const mockWorkouts: Workout[] = [
  {
    id: 1,
    name: 'Upper Body Strength',
    type: 'Strength',
    date: new Date('2025-04-05'),
    duration: 45,
    exercises: 5,
    notes: 'Felt good, increased bench press weight by 5 lbs',
  },
  {
    id: 2,
    name: 'Morning Cardio',
    type: 'Cardio',
    date: new Date('2025-04-03'),
    duration: 30,
    exercises: 3,
    notes: 'Easy run, focused on maintaining pace',
  },
  {
    id: 3,
    name: 'Leg Day',
    type: 'Strength',
    date: new Date('2025-04-02'),
    duration: 50,
    exercises: 6,
    notes: 'Focused on proper form for squats',
  },
  {
    id: 4,
    name: 'Full Body HIIT',
    type: 'HIIT',
    date: new Date('2025-03-30'),
    duration: 20,
    exercises: 8,
  },
  {
    id: 5,
    name: 'Recovery Yoga',
    type: 'Flexibility',
    date: new Date('2025-03-29'),
    duration: 40,
    exercises: 10,
    notes: 'Worked on hip flexibility',
  },
  {
    id: 6,
    name: 'Push Workout',
    type: 'Strength',
    date: new Date('2025-03-27'),
    duration: 55,
    exercises: 6,
  },
  {
    id: 7,
    name: 'Hill Sprints',
    type: 'Cardio',
    date: new Date('2025-03-25'),
    duration: 25,
    exercises: 1,
    notes: '8 sprints, 30 seconds each with 1 minute rest',
  },
];

const workoutTypeColors: Record<string, string> = {
  'Strength': 'bg-primary/10 text-primary',
  'Cardio': 'bg-secondary/10 text-secondary',
  'HIIT': 'bg-fitness-purple/10 text-fitness-purple',
  'Flexibility': 'bg-accent/10 text-accent',
};

const HistoryPage = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Filter workouts based on date, search query, and type
  const filteredWorkouts = mockWorkouts.filter(workout => {
    // Date filter
    const dateMatch = !date || format(workout.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    
    // Search query filter
    const searchMatch = !searchQuery || 
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (workout.notes && workout.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    const typeMatch = typeFilter === 'all' || workout.type.toLowerCase() === typeFilter.toLowerCase();
    
    return dateMatch && searchMatch && typeMatch;
  });
  
  // Group workouts by month
  const groupedWorkouts: Record<string, Workout[]> = {};
  
  filteredWorkouts.forEach(workout => {
    const monthKey = format(workout.date, 'MMMM yyyy');
    if (!groupedWorkouts[monthKey]) {
      groupedWorkouts[monthKey] = [];
    }
    groupedWorkouts[monthKey].push(workout);
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pb-20">
        <div className="py-6 md:py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Workout History</h1>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workouts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{typeFilter === 'all' ? 'All Types' : typeFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  {date && (
                    <div className="p-3 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setDate(undefined)}
                        className="text-muted-foreground text-xs w-full"
                      >
                        Clear date
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Workout history list */}
          {Object.keys(groupedWorkouts).length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-muted rounded-lg">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No workouts found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchQuery || date || typeFilter !== 'all' 
                  ? "Try adjusting your search filters to find your workouts." 
                  : "Start logging your workouts to track your fitness journey."}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedWorkouts).map(([month, workouts]) => (
                <div key={month} className="space-y-4">
                  <h2 className="text-lg font-bold">{month}</h2>
                  <div className="space-y-3">
                    {workouts.map((workout) => (
                      <div 
                        key={workout.id} 
                        className="workout-card p-4 flex flex-col md:flex-row justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h3 className="font-bold">{workout.name}</h3>
                            <span className={cn("px-2 py-1 rounded-full text-xs inline-flex w-fit", workoutTypeColors[workout.type])}>
                              {workout.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <span>{format(workout.date, 'EEEE, MMM d')}</span>
                            <span>•</span>
                            <span>{workout.duration} min</span>
                            <span>•</span>
                            <span>{workout.exercises} exercises</span>
                          </div>
                          {workout.notes && (
                            <p className="mt-3 text-sm">{workout.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center mt-4 md:mt-0">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default HistoryPage;

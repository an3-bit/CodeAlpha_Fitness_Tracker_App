
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import GoalCard from '@/components/Goals/GoalCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Target } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';

type Goal = {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'weight' | 'consistency';
};

const mockGoals: Goal[] = [
  {
    id: 1,
    title: 'Run 100 miles',
    target: 100,
    current: 68,
    unit: 'miles',
    deadline: '2025-05-01',
    category: 'cardio',
  },
  {
    id: 2,
    title: 'Bench Press 225 lbs',
    target: 225,
    current: 185,
    unit: 'lbs',
    deadline: '2025-06-15',
    category: 'strength',
  },
  {
    id: 3,
    title: 'Complete 30 Workouts',
    target: 30,
    current: 30,
    unit: 'workouts',
    deadline: '2025-04-20',
    category: 'consistency',
  },
  {
    id: 4,
    title: 'Complete 20 Yoga Sessions',
    target: 20,
    current: 12,
    unit: 'sessions',
    deadline: '2025-05-30',
    category: 'flexibility',
  },
  {
    id: 5,
    title: 'Lose 10 lbs',
    target: 10,
    current: 6,
    unit: 'lbs',
    deadline: '2025-06-01',
    category: 'weight',
  },
];

const GoalsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New goal form state
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({
    title: '',
    target: 0,
    current: 0,
    unit: '',
    deadline: '',
    category: 'cardio',
  });
  
  const handleInputChange = (field: keyof Omit<Goal, 'id'>, value: string | number) => {
    setNewGoal({ ...newGoal, [field]: value });
  };
  
  const handleAddGoal = () => {
    // Validation
    if (!newGoal.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your goal.",
        variant: "destructive"
      });
      return;
    }
    
    if (newGoal.target <= 0) {
      toast({
        title: "Invalid target",
        description: "Please enter a target greater than zero.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newGoal.unit.trim()) {
      toast({
        title: "Unit required",
        description: "Please specify a unit for your goal.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newGoal.deadline) {
      toast({
        title: "Deadline required",
        description: "Please set a deadline for your goal.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the new goal
    const newId = Math.max(0, ...goals.map(g => g.id)) + 1;
    setGoals([...goals, { ...newGoal, id: newId }]);
    
    // Reset form
    setNewGoal({
      title: '',
      target: 0,
      current: 0,
      unit: '',
      deadline: '',
      category: 'cardio',
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Goal created!",
      description: "Your new fitness goal has been added.",
    });
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal deleted",
      description: "Your fitness goal has been removed.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pb-20">
        <div className="py-6 md:py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">My Fitness Goals</h1>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Goal Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Run 100 miles"
                      value={newGoal.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target">Target</Label>
                      <Input
                        id="target"
                        type="number"
                        min="1"
                        placeholder="e.g. 100"
                        value={newGoal.target || ''}
                        onChange={(e) => handleInputChange('target', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        placeholder="e.g. miles, lbs, workouts"
                        value={newGoal.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Progress</Label>
                      <Input
                        id="current"
                        type="number"
                        min="0"
                        placeholder="e.g. 25"
                        value={newGoal.current || ''}
                        onChange={(e) => handleInputChange('current', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newGoal.category} 
                      onValueChange={(value) => handleInputChange('category', value as Goal['category'])}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="weight">Weight</SelectItem>
                        <SelectItem value="consistency">Consistency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleAddGoal}>
                    <Target className="mr-2 h-4 w-4" /> Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {goals.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-muted rounded-lg">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No Goals Set Yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Setting fitness goals helps you stay motivated and track your progress over time.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Goal
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <GoalCard 
                  key={goal.id}
                  {...goal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default GoalsPage;

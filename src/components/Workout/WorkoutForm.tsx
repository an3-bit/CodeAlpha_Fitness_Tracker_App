
import { useState } from 'react';
import { Dumbbell, Plus, Trash2, Clock, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ExerciseItem from './ExerciseItem';
import { useToast } from '@/components/ui/use-toast';

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  duration?: number;
  type: 'strength' | 'cardio' | 'flexibility';
};

const workoutTypes = ['Full Body', 'Upper Body', 'Lower Body', 'Push', 'Pull', 'Legs', 'Cardio', 'HIIT', 'Yoga', 'Custom'];

const WorkoutForm = () => {
  const { toast } = useToast();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  
  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      type: 'strength'
    };
    
    setExercises([...exercises, newExercise]);
  };
  
  const updateExercise = (id: string, updatedExercise: Partial<Exercise>) => {
    setExercises(
      exercises.map((exercise) => 
        exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
      )
    );
  };
  
  const removeExercise = (id: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!workoutName.trim()) {
      toast({
        title: "Workout name required",
        description: "Please enter a name for your workout.",
        variant: "destructive"
      });
      return;
    }
    
    if (exercises.length === 0) {
      toast({
        title: "No exercises added",
        description: "Please add at least one exercise to your workout.",
        variant: "destructive"
      });
      return;
    }
    
    // Check for incomplete exercises
    const incompleteExercise = exercises.find(ex => !ex.name.trim());
    if (incompleteExercise) {
      toast({
        title: "Incomplete exercise",
        description: "Please fill in all exercise names.",
        variant: "destructive"
      });
      return;
    }
    
    // Success - would normally save to DB here
    toast({
      title: "Workout saved!",
      description: `${workoutName} has been added to your workouts.`,
    });
    
    // Reset form
    setWorkoutName('');
    setWorkoutType('');
    setWorkoutNotes('');
    setExercises([]);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="workout-card p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Dumbbell className="mr-2 h-5 w-5 text-primary" />
          New Workout
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="workout-name">Workout Name</Label>
            <Input
              id="workout-name"
              placeholder="Morning Workout, Leg Day, etc."
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workout-type">Workout Type</Label>
            <Select value={workoutType} onValueChange={setWorkoutType}>
              <SelectTrigger>
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="workout-notes">Notes (Optional)</Label>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <Textarea
              id="workout-notes"
              placeholder="Add any notes about this workout"
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="workout-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Exercises</h2>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addExercise}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Exercise
          </Button>
        </div>
        
        {exercises.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-muted rounded-lg">
            <Dumbbell className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No exercises added yet</p>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={addExercise}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Your First Exercise
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                index={index}
                updateExercise={updateExercise}
                removeExercise={removeExercise}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="flex items-center gap-2">
          <Save className="h-4 w-4" /> Save Workout
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;

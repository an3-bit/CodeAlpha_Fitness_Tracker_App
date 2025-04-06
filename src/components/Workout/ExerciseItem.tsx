
import { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  duration?: number;
  type: 'strength' | 'cardio' | 'flexibility';
};

type ExerciseItemProps = {
  exercise: Exercise;
  index: number;
  updateExercise: (id: string, updatedExercise: Partial<Exercise>) => void;
  removeExercise: (id: string) => void;
};

const ExerciseItem = ({ exercise, index, updateExercise, removeExercise }: ExerciseItemProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleInputChange = (key: keyof Exercise, value: string | number) => {
    updateExercise(exercise.id, { [key]: value });
  };

  const handleTypeChange = (value: string) => {
    updateExercise(exercise.id, { 
      type: value as Exercise['type'],
      // Reset metrics based on type
      ...(value === 'cardio' ? { sets: 1, reps: 1 } : {}),
      ...(value === 'flexibility' ? { weight: 0 } : {})
    });
  };

  return (
    <div className={cn(
      "border rounded-xl transition-all overflow-hidden",
      exercise.type === 'strength' ? "border-primary/20" : 
      exercise.type === 'cardio' ? "border-secondary/20" : 
      "border-accent/20"
    )}>
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center font-medium text-white mr-3",
            exercise.type === 'strength' ? "bg-primary" : 
            exercise.type === 'cardio' ? "bg-secondary" : 
            "bg-accent"
          )}>
            {index + 1}
          </div>
          <div>
            <h3 className="font-medium">
              {exercise.name || `Exercise ${index + 1}`}
            </h3>
            <p className="text-xs text-muted-foreground capitalize">
              {exercise.type}
              {exercise.type === 'strength' && ` • ${exercise.sets} sets × ${exercise.reps} reps`}
              {exercise.type === 'cardio' && exercise.duration && ` • ${exercise.duration} min`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              removeExercise(exercise.id);
            }}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>

      {expanded && (
        <div className="p-4 pt-0 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor={`exercise-name-${exercise.id}`}>Exercise Name</Label>
              <Input
                id={`exercise-name-${exercise.id}`}
                placeholder="e.g. Bench Press, Squats"
                value={exercise.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`exercise-type-${exercise.id}`}>Type</Label>
              <Select 
                value={exercise.type} 
                onValueChange={handleTypeChange}
              >
                <SelectTrigger id={`exercise-type-${exercise.id}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {exercise.type === 'strength' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`exercise-sets-${exercise.id}`}>Sets</Label>
                <Input
                  id={`exercise-sets-${exercise.id}`}
                  type="number"
                  min="1"
                  value={exercise.sets}
                  onChange={(e) => handleInputChange('sets', parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exercise-reps-${exercise.id}`}>Reps</Label>
                <Input
                  id={`exercise-reps-${exercise.id}`}
                  type="number"
                  min="1"
                  value={exercise.reps}
                  onChange={(e) => handleInputChange('reps', parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exercise-weight-${exercise.id}`}>Weight (lbs)</Label>
                <Input
                  id={`exercise-weight-${exercise.id}`}
                  type="number"
                  min="0"
                  value={exercise.weight}
                  onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          )}

          {exercise.type === 'cardio' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`exercise-duration-${exercise.id}`}>Duration (min)</Label>
                <Input
                  id={`exercise-duration-${exercise.id}`}
                  type="number"
                  min="1"
                  value={exercise.duration || 30}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          )}

          {exercise.type === 'flexibility' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`exercise-sets-${exercise.id}`}>Sets</Label>
                <Input
                  id={`exercise-sets-${exercise.id}`}
                  type="number"
                  min="1"
                  value={exercise.sets}
                  onChange={(e) => handleInputChange('sets', parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exercise-duration-${exercise.id}`}>Hold Time (sec)</Label>
                <Input
                  id={`exercise-duration-${exercise.id}`}
                  type="number"
                  min="1"
                  value={exercise.duration || 30}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseItem;

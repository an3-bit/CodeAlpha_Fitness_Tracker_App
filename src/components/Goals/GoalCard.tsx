
import { Circle, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GoalCardProps = {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'weight' | 'consistency';
  onDelete: (id: number) => void;
};

const categoryIcons = {
  cardio: <Circle className="h-3 w-3 fill-primary text-primary" />,
  strength: <Circle className="h-3 w-3 fill-secondary text-secondary" />,
  flexibility: <Circle className="h-3 w-3 fill-accent text-accent" />,
  weight: <Circle className="h-3 w-3 fill-fitness-teal text-fitness-teal" />,
  consistency: <Circle className="h-3 w-3 fill-fitness-purple text-fitness-purple" />,
};

const categoryText = {
  cardio: 'text-primary',
  strength: 'text-secondary',
  flexibility: 'text-accent',
  weight: 'text-fitness-teal',
  consistency: 'text-fitness-purple',
};

const categoryBg = {
  cardio: 'bg-primary/10',
  strength: 'bg-secondary/10',
  flexibility: 'bg-accent/10',
  weight: 'bg-fitness-teal/10',
  consistency: 'bg-fitness-purple/10',
};

const categoryBorder = {
  cardio: 'border-primary/20',
  strength: 'border-secondary/20',
  flexibility: 'border-accent/20',
  weight: 'border-fitness-teal/20',
  consistency: 'border-fitness-purple/20',
};

const GoalCard = ({
  id,
  title,
  target,
  current,
  unit,
  deadline,
  category,
  onDelete,
}: GoalCardProps) => {
  const progress = Math.min(Math.round((current / target) * 100), 100);
  const daysLeft = Math.ceil(
    (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isCompleted = progress >= 100;

  return (
    <div 
      className={cn(
        "border rounded-xl p-5 relative transition-all duration-300 hover:shadow-md",
        categoryBorder[category],
        isCompleted && "border-green-300 bg-green-50/30"
      )}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive" 
        onClick={() => onDelete(id)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="mb-4 flex items-center">
        <div className={cn("px-2 py-1 rounded-full mr-2 text-xs font-medium flex items-center gap-1", categoryBg[category])}>
          {categoryIcons[category]}
          <span className={categoryText[category]}>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
        </div>
        {isCompleted && (
          <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Completed
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className={cn(
              "h-2",
              isCompleted ? "bg-green-100" : `bg-${category}-100`
            )}
            indicatorClassName={
              isCompleted ? "bg-green-500" : 
              category === 'cardio' ? "bg-primary" : 
              category === 'strength' ? "bg-secondary" : 
              category === 'flexibility' ? "bg-accent" : 
              category === 'weight' ? "bg-fitness-teal" : 
              "bg-fitness-purple"
            }
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Current</p>
            <p className="font-medium">
              {current} {unit}
            </p>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div>
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="font-medium">
              {target} {unit}
            </p>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div>
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="font-medium">
              {daysLeft <= 0 
                ? isCompleted ? "Completed" : "Overdue" 
                : `${daysLeft} days left`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;

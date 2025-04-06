
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Sun', cardio: 50, strength: 80, flexibility: 20 },
  { name: 'Mon', cardio: 80, strength: 40, flexibility: 30 },
  { name: 'Tue', cardio: 45, strength: 65, flexibility: 45 },
  { name: 'Wed', cardio: 0, strength: 0, flexibility: 0 },
  { name: 'Thu', cardio: 60, strength: 90, flexibility: 15 },
  { name: 'Fri', cardio: 75, strength: 55, flexibility: 25 },
  { name: 'Sat', cardio: 90, strength: 70, flexibility: 50 },
];

const timeRanges = ['Week', 'Month', 'Year'] as const;
type TimeRange = typeof timeRanges[number];

const ActivityChart = () => {
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>('Week');

  return (
    <div className="workout-card p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-lg font-bold">Workout Activity</h2>
        <div className="flex space-x-1 bg-muted p-1 rounded-md mt-2 md:mt-0">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveTimeRange(range)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                activeTimeRange === range
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={{ stroke: '#f0f0f0' }} />
            <YAxis fontSize={12} tickLine={false} axisLine={{ stroke: '#f0f0f0' }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
              }}
            />
            <Legend 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Bar 
              dataKey="cardio" 
              name="Cardio" 
              stackId="a" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="strength" 
              name="Strength" 
              stackId="a" 
              fill="hsl(var(--secondary))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="flexibility" 
              name="Flexibility" 
              stackId="a" 
              fill="hsl(var(--accent))" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;

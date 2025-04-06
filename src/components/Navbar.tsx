
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Dumbbell, BarChart, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: '/', name: 'Dashboard', icon: Home },
    { path: '/workout', name: 'Workout', icon: Dumbbell },
    { path: '/goals', name: 'Goals', icon: Activity },
    { path: '/history', name: 'History', icon: BarChart }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
        <div className="flex justify-around items-center h-16">
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            const Icon = route.icon;
            
            return (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={20} className={cn(isActive ? "animate-pulse-light" : "")} />
                <span className="text-xs mt-1">{route.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FitTrack</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {route.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <button
            className="rounded-full bg-primary/10 p-2 text-primary md:hidden"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

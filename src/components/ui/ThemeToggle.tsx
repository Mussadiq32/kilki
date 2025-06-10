
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  iconOnly?: boolean;
}

export function ThemeToggle({ className, iconOnly = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (iconOnly) {
    return (
      <button 
        onClick={toggleTheme}
        className={cn(
          "rounded-md p-2 transition-colors hover:bg-royal-100 dark:hover:bg-royal-800", 
          className
        )}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Moon className="h-5 w-5 text-royal-100" />
        ) : (
          <Sun className="h-5 w-5 text-gold-500" />
        )}
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Sun className="h-4 w-4 text-gold-500 dark:text-royal-300" />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-4 w-4 text-royal-600 dark:text-royal-100" />
    </div>
  );
}

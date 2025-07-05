import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Button
      variant="ghost"
      size={isMobile ? "default" : "sm"}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`${isMobile ? 'w-10 h-10' : 'w-9'} px-0 bg-background hover:bg-muted/50 dark:hover:bg-muted/50 border`}
    >
      <Sun className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} transition-all ${theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      <Moon className={`absolute ${isMobile ? 'h-5 w-5' : 'h-4 w-4'} transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/contexts/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function UserMenu() {
  const { setTheme, theme } = useTheme();
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth();

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAuthenticated && user ? (
          <Avatar>
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        ) : (
          <Button className="h-10 w-10 rounded-full bg-muted p-0 text-muted-foreground">?</Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated ? (
          <DropdownMenuItem onClick={handleLogout}>Cerrar Sesión</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleLogin}>Iniciar Sesión</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToggleTheme}>
          <Sun className="mr-2 inline-block h-4 w-4 dark:hidden" />
          <Moon className="mr-2 hidden h-4 w-4 dark:inline-block" />
          <span className="hidden dark:inline">Light</span>
          <span className="inline dark:hidden">Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

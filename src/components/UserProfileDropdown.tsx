
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfileDropdown = () => {
  const { user, signOut, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link to="/auth">
        <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-gold/50 text-gold hover:bg-gold/10 flex items-center gap-2"
        >
          <User size={16} />
          {user?.email?.split('@')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/95 border border-gold/20 text-white">
        <DropdownMenuLabel className="text-gold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
          <Link to="/my-bookings" className="flex items-center w-full">
            <Package className="mr-2 h-4 w-4" />
            <span>My Bookings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          className="hover:bg-white/10 cursor-pointer text-red-400"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;

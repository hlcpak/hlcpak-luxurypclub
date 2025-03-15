
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user?.user_metadata?.status === 'inactive') {
      toast({
        title: "Account Inactive",
        description: "Your account has been deactivated. Please contact support.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, user, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
        <span className="ml-2 text-white">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user is inactive
  if (user?.user_metadata?.status === 'inactive') {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

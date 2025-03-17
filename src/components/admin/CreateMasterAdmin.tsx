
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { createMasterAdmin, checkAdminExists } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const CreateMasterAdmin = () => {
  const [email, setEmail] = useState('shobyrao@gmail.com');
  const [password, setPassword] = useState('@Power2011!');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { toast } = useToast();

  const { data: adminExists, isLoading: checkingAdmin, refetch } = useQuery({
    queryKey: ['adminExists'],
    queryFn: checkAdminExists
  });

  useEffect(() => {
    // Create the master admin automatically when the component mounts
    // if there isn't already an admin account
    const autoCreateAdmin = async () => {
      if (adminExists === false && !created && !loading) {
        handleCreateAdmin();
      }
    };
    
    autoCreateAdmin();
  }, [adminExists, created]);

  const handleCreateAdmin = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both email and password.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await createMasterAdmin(email, password);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message
        });
        setCreated(true);
        // Refresh the admin check
        refetch();
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to create admin: ${error.message}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <Card className="w-full mb-8">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Checking admin status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (adminExists || created) {
    return null; // Don't show this component if admin already exists
  }

  return (
    <Card className="w-full mb-8 border-red-300 bg-red-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-red-700">Initial Setup Required</CardTitle>
        <CardDescription className="text-red-600">
          No admin user found. Creating a master admin account to manage the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Admin Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreateAdmin} 
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Admin...
            </>
          ) : (
            'Create Master Admin'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateMasterAdmin;

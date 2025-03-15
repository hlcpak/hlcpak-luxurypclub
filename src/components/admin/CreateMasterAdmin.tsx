
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CreateMasterAdmin = () => {
  const [email, setEmail] = useState('admin@luxuryprivilegeclub.com');
  const [password, setPassword] = useState('Admin@123');
  const [name, setName] = useState('Master Admin');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { toast } = useToast();

  const createMasterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if admin already exists
      const { data: existingUsers } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'admin');

      if (existingUsers && existingUsers.length > 0) {
        toast({
          title: "Admin Already Exists",
          description: "A master admin user already exists in the system.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Create the user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'admin'
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create user");
      }

      // Ensure the user exists in the users table with admin role
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: authData.user.id,
          email,
          name,
          role: 'admin',
          membership_tier: 'Platinum',
          points: 1000,
          status: 'active'
        });

      if (userError) {
        throw userError;
      }

      toast({
        title: "Master Admin Created",
        description: "The master admin user has been created successfully."
      });
      
      setCreated(true);
    } catch (error: any) {
      console.error('Error creating master admin:', error);
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create master admin user.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Master Admin</CardTitle>
        <CardDescription>
          Create a master administrator account that will have exclusive access to the admin panel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {created ? (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Master Admin Created</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Master admin account has been created successfully.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Login Credentials:</h4>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Password:</strong> {password}</p>
              <p className="text-sm text-gray-500 mt-2">
                Please save these credentials. You'll need them to access the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={createMasterAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Admin Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Admin...
                </>
              ) : (
                'Create Master Admin'
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateMasterAdmin;

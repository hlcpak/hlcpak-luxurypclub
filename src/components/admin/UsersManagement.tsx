
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { User, Pencil, UserX, UserCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUser, User as UserType } from '@/lib/supabase';
import UserForm from './UserForm';

const UsersManagement = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: true
  });

  // Log any errors for debugging
  if (error) {
    console.error('Error fetching users:', error);
  }

  const updateUserMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<UserType> }) => 
      updateUser(id, updates),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditDialogOpen(false);
      setIsStatusDialogOpen(false);
    },
    onError: (error: any) => {
      console.error('Update user error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user.',
        variant: 'destructive',
      });
    },
  });

  const handleOpenEditDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleOpenStatusDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsStatusDialogOpen(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedUser) return;
    
    const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active';
    updateUserMutation.mutate({ 
      id: selectedUser.id, 
      updates: { status: newStatus } 
    });
  };

  const getMembershipBadgeColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'silver':
        return 'bg-gray-200 text-gray-800';
      case 'gold':
        return 'bg-amber-200 text-amber-800';
      case 'platinum':
        return 'bg-sky-200 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-500' : 'text-red-500';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Users Management</CardTitle>
        <CardDescription>
          View and manage all registered users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getMembershipBadgeColor(user.membership_tier)}`}>
                      {user.membership_tier}
                    </span>
                  </TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(user.status || 'active')}>
                      {user.status || 'active'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEditDialog(user)}
                      title="Edit user"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenStatusDialog(user)}
                      title={user.status !== 'inactive' ? 'Deactivate user' : 'Activate user'}
                    >
                      {user.status === 'inactive' ? (
                        <UserCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <UserX className="h-4 w-4 text-red-500" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to user details here.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserForm 
              user={selectedUser} 
              onSuccess={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.status !== 'inactive' 
                ? 'Deactivate User' 
                : 'Activate User'}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status !== 'inactive'
                ? 'This will prevent the user from logging in.'
                : 'This will allow the user to log in again.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant={selectedUser?.status !== 'inactive' ? "destructive" : "default"}
              onClick={handleStatusUpdate}
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {selectedUser?.status !== 'inactive' ? 'Deactivating...' : 'Activating...'}
                </>
              ) : (
                selectedUser?.status !== 'inactive' ? 'Deactivate' : 'Activate'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UsersManagement;

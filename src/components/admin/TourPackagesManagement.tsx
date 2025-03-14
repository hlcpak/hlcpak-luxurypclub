
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Pencil, 
  Trash2, 
  Plus,
  Loader2
} from 'lucide-react';
import { deleteTourPackage, getTourPackages, TourPackage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TourPackageForm from './TourPackageForm';

const TourPackagesManagement = () => {
  const [editPackage, setEditPackage] = useState<TourPackage | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Use React Query for data fetching
  const { data: tourPackages = [], isLoading } = useQuery({
    queryKey: ['tourPackages'],
    queryFn: getTourPackages,
    onError: (error: any) => {
      console.error('Error fetching tour packages:', error);
      toast({
        title: "Error",
        description: "Failed to load tour packages",
        variant: "destructive"
      });
    }
  });

  const handleDeletePackage = async (id: number) => {
    try {
      setIsDeleting(id);
      const success = await deleteTourPackage(id);
      
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['tourPackages'] });
        toast({
          title: "Success",
          description: "Tour package deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete tour package",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error deleting tour package:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditClick = (pkg: TourPackage) => {
    setEditPackage(pkg);
    setIsEditDialogOpen(true);
  };

  const onDialogClose = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setEditPackage(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tour Packages</CardTitle>
          <CardDescription>Manage exclusive tour packages for members</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Tour Package</DialogTitle>
              <DialogDescription>
                Create a new exclusive tour package for members
              </DialogDescription>
            </DialogHeader>
            <TourPackageForm onSuccess={onDialogClose} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : tourPackages.length > 0 ? (
          <div className="space-y-4">
            {tourPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="border rounded-md p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-12 w-16 bg-cover bg-center rounded" 
                    style={{ backgroundImage: `url(${pkg.image})` }}
                  ></div>
                  <div>
                    <h3 className="font-medium">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">{pkg.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog open={isEditDialogOpen && editPackage?.id === pkg.id} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditClick(pkg)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Tour Package</DialogTitle>
                        <DialogDescription>
                          Make changes to the tour package
                        </DialogDescription>
                      </DialogHeader>
                      {editPackage && (
                        <TourPackageForm package={editPackage} onSuccess={onDialogClose} />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeletePackage(pkg.id)}
                    disabled={isDeleting === pkg.id}
                  >
                    {isDeleting === pkg.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No tour packages found</p>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Package
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Tour Package</DialogTitle>
                  <DialogDescription>
                    Create a new exclusive tour package for members
                  </DialogDescription>
                </DialogHeader>
                <TourPackageForm onSuccess={onDialogClose} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TourPackagesManagement;

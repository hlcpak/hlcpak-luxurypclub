
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
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTourPackages,
  deleteTourPackage,
  TourPackage,
} from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import TourPackageForm from '@/components/admin/TourPackageForm';

const TourPackagesManagement = () => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: tourPackages = [], isLoading } = useQuery({
    queryKey: ['tourPackages'],
    queryFn: getTourPackages
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTourPackage(id),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Tour package deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['tourPackages'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete tour package.',
        variant: 'destructive',
      });
    },
  });

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedPackage(null);
  };

  const handleOpenEditDialog = (tourPackage: TourPackage) => {
    setSelectedPackage(tourPackage);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (tourPackage: TourPackage) => {
    setSelectedPackage(tourPackage);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading tour packages...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tour Packages Management</CardTitle>
        <CardDescription>
          Create, edit, and manage tour packages on your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Tour Package
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tourPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No tour packages found. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              tourPackages.map((tourPackage) => (
                <TableRow key={tourPackage.id}>
                  <TableCell className="font-medium">{tourPackage.name}</TableCell>
                  <TableCell>{tourPackage.location}</TableCell>
                  <TableCell>{tourPackage.rating}</TableCell>
                  <TableCell>${tourPackage.regular_price}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEditDialog(tourPackage)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDeleteDialog(tourPackage)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>

      {/* Add Tour Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Add Tour Package</DialogTitle>
            <DialogDescription>
              Create a new tour package.
            </DialogDescription>
          </DialogHeader>
          <TourPackageForm onSuccess={handleCloseAddDialog} />
        </DialogContent>
      </Dialog>

      {/* Edit Tour Package Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Tour Package</DialogTitle>
            <DialogDescription>
              Make changes to your tour package here.
            </DialogDescription>
          </DialogHeader>
          {selectedPackage && <TourPackageForm package={selectedPackage} onSuccess={handleCloseEditDialog} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete
              this tour package from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedPackage) {
                  deleteMutation.mutate(selectedPackage.id);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TourPackagesManagement;

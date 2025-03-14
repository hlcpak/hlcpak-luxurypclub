
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
  const { toast } = useToast();
  
  const { data: tourPackages = [], isLoading } = useQuery({
    queryKey: ['tourPackages'],
    queryFn: getTourPackages
  });

  const queryClient = useQueryClient();

  // Fix mutation by specifying the correct generic types
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTourPackage(id),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Tour package deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['tourPackages'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete tour package.',
        variant: 'destructive',
      });
    },
  });

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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Tour Package
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add Tour Package</DialogTitle>
                <DialogDescription>
                  Create a new tour package.
                </DialogDescription>
              </DialogHeader>
              <TourPackageForm onSuccess={() => {}} />
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
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
            {tourPackages.map((tourPackage) => (
              <TableRow key={tourPackage.id}>
                <TableCell className="font-medium">{tourPackage.name}</TableCell>
                <TableCell>{tourPackage.location}</TableCell>
                <TableCell>{tourPackage.rating}</TableCell>
                <TableCell>${tourPackage.regular_price}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedPackage(tourPackage)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Edit Tour Package</DialogTitle>
                        <DialogDescription>
                          Make changes to your tour package here. Click save when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <TourPackageForm
                        package={selectedPackage}
                        onSuccess={() => {}}
                      />
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedPackage(tourPackage)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete
                          this tour package from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (selectedPackage) {
                              deleteMutation.mutate(selectedPackage.id);
                            }
                          }}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TourPackagesManagement;

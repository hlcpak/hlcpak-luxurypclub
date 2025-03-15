
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Trash2, Edit, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  getHotelDeals, 
  deleteHotelDeal, 
  HotelDeal 
} from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import HotelDealForm from './HotelDealForm';

const HotelDealsManagement = () => {
  const [selectedDeal, setSelectedDeal] = useState<HotelDeal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: hotelDeals = [], isLoading } = useQuery({
    queryKey: ['hotelDeals'],
    queryFn: getHotelDeals
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteHotelDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
      toast({
        title: "Success",
        description: "Hotel deal deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete hotel deal",
        variant: "destructive",
      });
    },
  });

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDeal(null);
  };

  const handleOpenEditDialog = (deal: HotelDeal) => {
    setSelectedDeal(deal);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (deal: HotelDeal) => {
    setSelectedDeal(deal);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hotel Deals Management</CardTitle>
        <CardDescription>Create, edit and manage hotel deals for your website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Hotel Deal
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Deal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                  Loading hotel deals...
                </TableCell>
              </TableRow>
            ) : hotelDeals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hotel deals found. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              hotelDeals.map(deal => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.name}</TableCell>
                  <TableCell>{deal.location}</TableCell>
                  <TableCell>{deal.rating}</TableCell>
                  <TableCell>${deal.regular_price}</TableCell>
                  <TableCell>{deal.deal}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleOpenEditDialog(deal)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleOpenDeleteDialog(deal)}
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

      {/* Add Hotel Deal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Add Hotel Deal</DialogTitle>
            <DialogDescription>
              Create a new hotel deal to promote on the website.
            </DialogDescription>
          </DialogHeader>
          <HotelDealForm onSuccess={handleCloseAddDialog} />
        </DialogContent>
      </Dialog>

      {/* Edit Hotel Deal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Hotel Deal</DialogTitle>
            <DialogDescription>
              Edit the details of the hotel deal.
            </DialogDescription>
          </DialogHeader>
          {selectedDeal && <HotelDealForm deal={selectedDeal} onSuccess={handleCloseEditDialog} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Hotel Deal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this hotel deal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedDeal) {
                  deleteMutation.mutate(selectedDeal.id);
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
          </CardFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default HotelDealsManagement;

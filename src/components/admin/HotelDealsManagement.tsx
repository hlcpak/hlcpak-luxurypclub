
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
  addHotelDeal, 
  updateHotelDeal, 
  deleteHotelDeal, 
  getHotelDeals, 
  HotelDeal 
} from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { format } from 'date-fns';
import HotelDealForm from './HotelDealForm';

// Define a type that matches the actual HotelDeal from Supabase
type HotelDealFormValues = {
  name: string;
  location: string;
  image: string;
  description?: string;
  rating: number;
  deal: string;
  regular_price: number;
  member_price: number;
  duration: string;
};

const HotelDealsManagement = () => {
  const [selectedDeal, setSelectedDeal] = useState<HotelDeal | null>(null);
  const { toast } = useToast();
  
  const { data: hotelDeals = [], isLoading } = useQuery({
    queryKey: ['hotelDeals'],
    queryFn: getHotelDeals
  });

  const queryClient = useQueryClient();

  // Fix mutation by specifying the correct generic types
  const addHotelDealMutation = useMutation({
    mutationFn: (deal: HotelDealFormValues) => addHotelDeal(deal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
      toast({
        title: "Success",
        description: "Hotel deal added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add hotel deal",
        variant: "destructive",
      });
    },
  });

  // Fix mutation by specifying the correct generic types
  const updateHotelDealMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<HotelDealFormValues> }) => 
      updateHotelDeal(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
      toast({
        title: "Success",
        description: "Hotel deal updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hotel deal",
        variant: "destructive",
      });
    },
  });

  // Fix mutation by specifying the correct generic types
  const deleteHotelDealMutation = useMutation({
    mutationFn: (id: number) => deleteHotelDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
      toast({
        title: "Success",
        description: "Hotel deal deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete hotel deal",
        variant: "destructive",
      });
    },
  });

  const handleOpenEditDialog = (deal: HotelDeal) => {
    setSelectedDeal(deal);
  };

  const handleOpenDeleteDialog = (deal: HotelDeal) => {
    setSelectedDeal(deal);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hotel Deals Management</CardTitle>
        <CardDescription>Create, edit and manage hotel deals for your website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Hotel Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add Hotel Deal</DialogTitle>
                <DialogDescription>
                  Create a new hotel deal to promote on the website.
                </DialogDescription>
              </DialogHeader>
              <HotelDealForm onSuccess={() => {}} />
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(deal)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Edit Hotel Deal</DialogTitle>
                          <DialogDescription>
                            Edit the details of the hotel deal.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedDeal && <HotelDealForm deal={selectedDeal} onSuccess={() => {}} />}
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDeleteDialog(deal)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Delete Hotel Deal</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this hotel deal? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <CardFooter className="flex justify-end space-x-2">
                          <DialogClose asChild>
                            <Button variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button 
                            variant="destructive" 
                            onClick={() => {
                              if (selectedDeal) {
                                deleteHotelDealMutation.mutate(selectedDeal.id);
                              }
                            }}
                          >
                            {deleteHotelDealMutation.isPending ? (
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default HotelDealsManagement;


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
import { deleteHotelDeal, getHotelDeals, HotelDeal } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import HotelDealForm from './HotelDealForm';

const HotelDealsManagement = () => {
  const [editDeal, setEditDeal] = useState<HotelDeal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Use React Query for data fetching
  const { data: hotelDeals = [], isLoading } = useQuery({
    queryKey: ['hotelDeals'],
    queryFn: getHotelDeals,
    onError: (error: any) => {
      console.error('Error fetching hotel deals:', error);
      toast({
        title: "Error",
        description: "Failed to load hotel deals",
        variant: "destructive"
      });
    }
  });

  const handleDeleteDeal = async (id: number) => {
    try {
      setIsDeleting(id);
      const success = await deleteHotelDeal(id);
      
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
        toast({
          title: "Success",
          description: "Hotel deal deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete hotel deal",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error deleting hotel deal:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditClick = (deal: HotelDeal) => {
    setEditDeal(deal);
    setIsEditDialogOpen(true);
  };

  const onDialogClose = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setEditDeal(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Hotel Deals</CardTitle>
          <CardDescription>Manage exclusive hotel deals for members</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Hotel Deal</DialogTitle>
              <DialogDescription>
                Create a new exclusive hotel deal for members
              </DialogDescription>
            </DialogHeader>
            <HotelDealForm onSuccess={onDialogClose} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : hotelDeals.length > 0 ? (
          <div className="space-y-4">
            {hotelDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="border rounded-md p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-12 w-16 bg-cover bg-center rounded" 
                    style={{ backgroundImage: `url(${deal.image})` }}
                  ></div>
                  <div>
                    <h3 className="font-medium">{deal.name}</h3>
                    <p className="text-sm text-muted-foreground">{deal.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog open={isEditDialogOpen && editDeal?.id === deal.id} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditClick(deal)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Hotel Deal</DialogTitle>
                        <DialogDescription>
                          Make changes to the hotel deal
                        </DialogDescription>
                      </DialogHeader>
                      {editDeal && (
                        <HotelDealForm deal={editDeal} onSuccess={onDialogClose} />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteDeal(deal.id)}
                    disabled={isDeleting === deal.id}
                  >
                    {isDeleting === deal.id ? (
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
            <p className="text-muted-foreground mb-4">No hotel deals found</p>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Deal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Hotel Deal</DialogTitle>
                  <DialogDescription>
                    Create a new exclusive hotel deal for members
                  </DialogDescription>
                </DialogHeader>
                <HotelDealForm onSuccess={onDialogClose} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelDealsManagement;

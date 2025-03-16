import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus, Order } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { format } from 'date-fns';

type OrderFilterState = {
  status: 'pending' | 'confirmed' | 'cancelled' | 'all';
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
};

interface OrdersManagementProps {
  filterState: OrderFilterState;
  setFilterState: Dispatch<SetStateAction<OrderFilterState>>;
}

const OrdersManagement: React.FC<OrdersManagementProps> = ({ filterState, setFilterState }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'pending' | 'confirmed' | 'cancelled' }) => 
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Status Updated",
        description: "The order status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update order status",
        variant: "destructive",
      });
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (id: number, status: 'pending' | 'confirmed' | 'cancelled') => {
    updateStatusMutation.mutate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
        <CardDescription>
          View and manage all bookings for hotel deals and tour packages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Booking</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer_name}</div>
                    <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                  </TableCell>
                  <TableCell>{order.item_name}</TableCell>
                  <TableCell>
                    {order.booking_type === 'hotel' ? 'Hotel' : 'Tour Package'}
                  </TableCell>
                  <TableCell>
                    {new Date(order.travel_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order.total_price}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
                  <p>#{selectedOrder.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Booking Date</h3>
                  <p>{new Date(selectedOrder.booking_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Travel Date</h3>
                  <p>{new Date(selectedOrder.travel_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Booking Type</h3>
                  <p>{selectedOrder.booking_type === 'hotel' ? 'Hotel Stay' : 'Tour Package'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Item Name</h3>
                  <p>{selectedOrder.item_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Guests</h3>
                  <p>{selectedOrder.guests}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
                  <p>${selectedOrder.total_price}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <h4 className="text-xs text-gray-500">Name</h4>
                    <p>{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Email</h4>
                    <p>{selectedOrder.customer_email}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Phone</h4>
                    <p>{selectedOrder.customer_phone}</p>
                  </div>
                </div>
              </div>
              
              {selectedOrder.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="text-sm mt-1">{selectedOrder.notes}</p>
                </div>
              )}
              
              {selectedOrder.status === 'pending' && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'cancelled');
                      setSelectedOrder(null);
                    }}
                    disabled={updateStatusMutation.isPending}
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    Cancel Booking
                  </Button>
                  <Button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'confirmed');
                      setSelectedOrder(null);
                    }}
                    disabled={updateStatusMutation.isPending}
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    Confirm Booking
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default OrdersManagement;

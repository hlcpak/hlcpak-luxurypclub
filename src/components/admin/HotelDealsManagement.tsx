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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns';

const hotelDealSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  image_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  start_date: z.date(),
  end_date: z.date(),
});

type HotelDealFormValues = z.infer<typeof hotelDealSchema>;

const HotelDealsManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<HotelDeal | null>(null);
  const { toast } = useToast();
  
  // Fixed React Query implementation - removed onError option
  const { data: hotelDeals = [], isLoading } = useQuery({
    queryKey: ['hotelDeals'],
    queryFn: getHotelDeals
  });

  const queryClient = useQueryClient();

  const addHotelDealMutation = useMutation(addHotelDeal, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
      toast({
        title: "Success",
        description: "Hotel deal added successfully",
      });
      setIsAddDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add hotel deal",
        variant: "destructive",
      });
    },
  });

  const updateHotelDealMutation = useMutation(updateHotelDeal, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
      toast({
        title: "Success",
        description: "Hotel deal updated successfully",
      });
      setIsEditDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hotel deal",
        variant: "destructive",
      });
    },
  });

  const deleteHotelDealMutation = useMutation(deleteHotelDeal, {
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

  const handleOpenEditDialog = (deal: HotelDeal) => {
    setSelectedDeal(deal);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (deal: HotelDeal) => {
    setSelectedDeal(deal);
    setIsDeleteDialogOpen(true);
  };

  const AddHotelDealForm = () => {
    const form = useForm<HotelDealFormValues>({
      resolver: zodResolver(hotelDealSchema),
      defaultValues: {
        title: "",
        location: "",
        image_url: "",
        price: 0,
        description: "",
        start_date: new Date(),
        end_date: new Date(),
      },
    });
  
    const onSubmit = (values: HotelDealFormValues) => {
      addHotelDealMutation.mutate(values);
    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} className="h-24" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={addHotelDealMutation.isLoading}>
            {addHotelDealMutation.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Hotel Deal"
            )}
          </Button>
        </form>
      </Form>
    );
  };

  const EditHotelDealForm = ({ deal }: { deal: HotelDeal }) => {
    const form = useForm<HotelDealFormValues>({
      resolver: zodResolver(hotelDealSchema),
      defaultValues: {
        title: deal.title,
        location: deal.location,
        image_url: deal.image_url,
        price: deal.price,
        description: deal.description,
        start_date: new Date(deal.start_date),
        end_date: new Date(deal.end_date),
      },
    });
  
    const onSubmit = (values: HotelDealFormValues) => {
      updateHotelDealMutation.mutate({ id: deal.id, hotelDeal: values });
    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} className="h-24" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                   <Input
                    type="date"
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                   <Input
                    type="date"
                    {...field}
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={updateHotelDealMutation.isLoading}>
            {updateHotelDealMutation.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Hotel Deal"
            )}
          </Button>
        </form>
      </Form>
    );
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
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Hotel Deal</DialogTitle>
                <DialogDescription>
                  Create a new hotel deal to promote on the website.
                </DialogDescription>
              </DialogHeader>
              <AddHotelDealForm />
            </DialogContent>
          </Dialog>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
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
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell>{deal.location}</TableCell>
                  <TableCell>${deal.price}</TableCell>
                  <TableCell>{new Date(deal.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(deal.end_date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(deal)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Hotel Deal</DialogTitle>
                          <DialogDescription>
                            Edit the details of the hotel deal.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedDeal && <EditHotelDealForm deal={selectedDeal} />}
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
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive" 
                            disabled={deleteHotelDealMutation.isLoading}
                            onClick={() => deleteHotelDealMutation.mutate(deal.id)}
                          >
                            {deleteHotelDealMutation.isLoading ? (
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

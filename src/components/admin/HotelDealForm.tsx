
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { addHotelDeal, updateHotelDeal, HotelDeal } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import AIContentGenerator from '@/components/shared/AIContentGenerator';

type FormValues = {
  name: string;
  location: string;
  image: string;
  rating: number;
  deal: string;
  regular_price: number;
  member_price: number;
  duration: string;
  description: string;
};

type HotelDealFormProps = {
  deal?: HotelDeal;
  onSuccess: () => void;
};

const HotelDealForm = ({ deal, onSuccess }: HotelDealFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    defaultValues: deal ? {
      name: deal.name,
      location: deal.location,
      image: deal.image,
      rating: deal.rating,
      deal: deal.deal,
      regular_price: deal.regular_price,
      member_price: deal.member_price,
      duration: deal.duration,
      description: deal.description || '',
    } : {
      name: '',
      location: '',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: '',
      regular_price: 0,
      member_price: 0,
      duration: '',
      description: '',
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      if (deal) {
        // Update existing deal
        const updated = await updateHotelDeal(deal.id, values);
        
        if (updated) {
          toast({
            title: "Success",
            description: "Hotel deal updated successfully",
          });
          
          queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
          onSuccess();
        } else {
          toast({
            title: "Error",
            description: "Failed to update hotel deal",
            variant: "destructive"
          });
        }
      } else {
        // Add new deal
        const newDeal = await addHotelDeal(values);
        
        if (newDeal) {
          toast({
            title: "Success",
            description: "Hotel deal added successfully",
          });
          
          queryClient.invalidateQueries({ queryKey: ['hotelDeals'] });
          onSuccess();
        } else {
          toast({
            title: "Error",
            description: "Failed to add hotel deal",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error saving hotel deal:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAIContentGenerated = (content: string) => {
    form.setValue('description', content);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Four Seasons Resort" {...field} />
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
                  <Input placeholder="Bora Bora, French Polynesia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    max="5" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Title</FormLabel>
                <FormControl>
                  <Input placeholder="Save 30% + Free Breakfast" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="3-night minimum stay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="regular_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regular Price (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="member_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member Price (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Description</FormLabel>
                <AIContentGenerator 
                  onGeneratedContent={handleAIContentGenerated}
                  generateFor="description"
                  contextData={form.getValues().location}
                  contextType="hotel"
                />
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Describe the hotel and the special deal..."
                  rows={6}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSuccess}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {deal ? 'Update Deal' : 'Add Deal'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HotelDealForm;

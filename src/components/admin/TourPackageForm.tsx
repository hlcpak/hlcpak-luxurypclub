
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { addTourPackage, updateTourPackage, TourPackage } from '@/lib/supabase';
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

type TourPackageFormProps = {
  package?: TourPackage;
  onSuccess: () => void;
};

const TourPackageForm = ({ package: tourPackage, onSuccess }: TourPackageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    defaultValues: tourPackage ? {
      name: tourPackage.name,
      location: tourPackage.location,
      image: tourPackage.image,
      rating: tourPackage.rating,
      deal: tourPackage.deal,
      regular_price: tourPackage.regular_price,
      member_price: tourPackage.member_price,
      duration: tourPackage.duration,
      description: tourPackage.description || '',
    } : {
      name: '',
      location: '',
      image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      
      if (tourPackage) {
        // Update existing package
        const updated = await updateTourPackage(tourPackage.id, values);
        
        if (updated) {
          toast({
            title: "Success",
            description: "Tour package updated successfully",
          });
          
          queryClient.invalidateQueries({ queryKey: ['tourPackages'] });
          onSuccess();
        } else {
          toast({
            title: "Error",
            description: "Failed to update tour package",
            variant: "destructive"
          });
        }
      } else {
        // Add new package
        const newPackage = await addTourPackage(values);
        
        if (newPackage) {
          toast({
            title: "Success",
            description: "Tour package added successfully",
          });
          
          queryClient.invalidateQueries({ queryKey: ['tourPackages'] });
          onSuccess();
        } else {
          toast({
            title: "Error",
            description: "Failed to add tour package",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error saving tour package:', error);
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
                <FormLabel>Tour Name</FormLabel>
                <FormControl>
                  <Input placeholder="European Elegance Tour" {...field} />
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
                  <Input placeholder="France, Italy, Switzerland" {...field} />
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
                  <Input placeholder="Early Bird Discount" {...field} />
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
                  <Input placeholder="14 days" {...field} />
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
                  contextType="tour"
                />
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Describe the tour package and what it includes..."
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
            {tourPackage ? 'Update Package' : 'Add Package'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TourPackageForm;

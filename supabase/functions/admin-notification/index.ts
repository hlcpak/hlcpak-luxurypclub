
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    const { orderDetails, notificationType } = body;

    if (notificationType === 'new_order') {
      // In a real implementation, you would send an email here
      // For now, we'll just log the notification
      console.log(`New order notification for order ID: ${orderDetails.id}`);
      console.log('Order details:', JSON.stringify(orderDetails, null, 2));

      // You could use a service like Resend, SendGrid, etc. to send an email
      // Example with email service:
      /*
      await emailService.send({
        to: 'admin@example.com',
        subject: `New Booking: ${orderDetails.item_name}`,
        html: `
          <h1>New Booking Received</h1>
          <p><strong>Customer:</strong> ${orderDetails.customer_name}</p>
          <p><strong>Email:</strong> ${orderDetails.customer_email}</p>
          <p><strong>Phone:</strong> ${orderDetails.customer_phone}</p>
          <p><strong>Booking:</strong> ${orderDetails.item_name}</p>
          <p><strong>Date:</strong> ${orderDetails.travel_date}</p>
          <p><strong>Guests:</strong> ${orderDetails.guests}</p>
          <p><strong>Total:</strong> $${orderDetails.total_price}</p>
          <p><strong>Notes:</strong> ${orderDetails.notes}</p>
        `,
      });
      */

      // Log to database for dashboard notifications
      await supabaseClient
        .from('admin_notifications')
        .insert({
          type: 'new_order',
          content: `New booking for ${orderDetails.item_name} by ${orderDetails.customer_name}`,
          read: false,
          order_id: orderDetails.id
        });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

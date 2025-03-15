
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
      // Log detailed information about the order
      console.log(`New order notification for order ID: ${orderDetails.id}`);
      console.log(`User ID: ${orderDetails.user_id}`);
      console.log(`Customer: ${orderDetails.customer_name} (${orderDetails.customer_email})`);
      console.log(`${orderDetails.booking_type === 'hotel' ? 'Hotel' : 'Tour'}: ${orderDetails.item_name}`);
      console.log(`Date: ${orderDetails.travel_date}`);
      console.log(`Guests: ${orderDetails.guests}`);
      console.log(`Total: $${orderDetails.total_price}`);
      console.log('Order details:', JSON.stringify(orderDetails, null, 2));

      // Format email content
      const emailSubject = `New ${orderDetails.booking_type === 'hotel' ? 'Hotel' : 'Tour'} Booking: ${orderDetails.item_name}`;
      const emailHtml = `
        <h1>New Booking Received</h1>
        <p><strong>Customer:</strong> ${orderDetails.customer_name}</p>
        <p><strong>Email:</strong> ${orderDetails.customer_email}</p>
        <p><strong>Phone:</strong> ${orderDetails.customer_phone || 'Not provided'}</p>
        <p><strong>Booking:</strong> ${orderDetails.item_name}</p>
        <p><strong>Type:</strong> ${orderDetails.booking_type === 'hotel' ? 'Hotel Stay' : 'Tour Package'}</p>
        <p><strong>Date:</strong> ${new Date(orderDetails.travel_date).toLocaleDateString()}</p>
        <p><strong>Guests:</strong> ${orderDetails.guests}</p>
        <p><strong>Total:</strong> $${orderDetails.total_price}</p>
        <p><strong>Notes:</strong> ${orderDetails.notes || 'None'}</p>
        <hr>
        <p>Please login to the admin dashboard to confirm or cancel this booking.</p>
      `;

      // In a real implementation, you would send an email here
      // Example with email service:
      /*
      await emailService.send({
        to: 'admin@example.com',
        subject: emailSubject,
        html: emailHtml,
      });
      */

      // Log to database for dashboard notifications
      await supabaseClient
        .from('admin_notifications')
        .insert({
          type: 'new_order',
          content: `New ${orderDetails.booking_type === 'hotel' ? 'hotel' : 'tour'} booking for ${orderDetails.item_name} by ${orderDetails.customer_name}`,
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

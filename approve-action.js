nano approveOrder.js
// Function to approve an order from your frontend app
async function approveOrder(orderId) {
  const { error } = await supabase
    .from('orders')
    .update({
      status: 'approved',
      approved_at: new Date().toISOString()
    })
    .eq('id', orderId);

  if (error) {
    console.error('Error approving order:', error);
  } else {
    console.log('Order successfully approved!');
  }
}
const { error } = await supabase
  .from('orders')
  .update({
    status: 'rejected',
    rejected_at: new Date().toISOString()
  })
  .eq('id', orderId);alter table orders
add column if not exists rejected_at timestamptz;const ticketCode =
  'TKT-' + crypto.randomUUID().slice(0,8).toUpperCase();await supabase
  .from('tickets')
  .insert({
    order_id: orderId,
    ticket_code: ticketCode,
    customer_name,
    email,
    ticket_type
  });

npm install qrcodeimport QRCode from 'qrcode';

const qrData = JSON.stringify({
  ticketCode,
  orderId
});

const qrImage = await QRCode.toDataURL(qrData);

nano generateTicketQR.js
import QRCode from 'qrcode';

// Function to generate a QR code and prepare it for storage
async function generateTicketQR(ticketCode, orderId) {
  try {
    const qrData = JSON.stringify({
      ticketCode,
      orderId
    });

    // Generates a base64 Data URL image string of the QR Code
    const qrImage = await QRCode.toDataURL(qrData);
    
    console.log('QR Code generated successfully!');
    return qrImage;
    
  } catch (error) {
    console.error('Error generating QR Code:', error);
  }
}

// Function triggered when the user clicks 'Make Payment'
async function handleCreateOrder(event) {
    if (event) event.preventDefault();

    // 1. Gather values from your HTML input form fields
    // Ensure these element IDs ('name', 'email', etc.) match your index.html exactly!
    const customerName = document.getElementById('name')?.value || 'Anonymous';
    const customerEmail = document.getElementById('email')?.value || '';
    const ticketType = document.getElementById('ticket-type')?.value || 'General Admission';
    const quantity = parseInt(document.getElementById('quantity')?.value || '1', 10);
    const totalAmount = parseFloat(document.getElementById('total-amount')?.innerText || '0');
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'GCash';

    try {
        // 2. Insert the row into your Supabase database table
        const { data, error } = await supabase
            .from('orders')
            .insert({
                order_id: crypto.randomUUID(), // Generates unique tracking ID string
                customer_name: customerName,
                email: customerEmail,
                ticket_type: ticketType,
                quantity: quantity,
                total_amount: totalAmount,
                payment_method: paymentMethod,
                status: 'pending_payment'
            })
            .select()
            .single();

        if (error) throw error;

        // 3. Success Workflow: Inform user and trigger Tawk live chat help window
        alert(`Order Created Successfully!\nYour Order ID is: ${data.order_id}`);
        
        if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
            window.Tawk_API.toggle(); // Opens up the interactive live chat window automatically
        } else {
            console.log("Tawk chat widget asset could not be found on global page scope.");
        }

    } catch (err) {
        console.error('Error creating checkout booking order registration:', err);
        alert('Failed to place booking order: ' + err.message);
    }
}
const SUPABASE_URL = "https://tuwitgjfdcgllxafnrpw.supabase.co";
const SUPABASE_KEY = "sb_publishable_RnHIZIH_tXIs4d5QA4QOvg_XS7ylcOH";


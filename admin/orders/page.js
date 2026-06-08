
nano admin/orders/page.js
'use client';
import { useState, useEffect } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Load orders from Supabase on mount
  useEffect(() => {
    async function fetchOrders() {
      // Temporary mock state matching your guide's screenshot layout
      // Replace this with your actual supabase.from('orders').select('*') call later!
      setOrders([
        { id: 'BTS-001', customer: 'Test User', status: 'proof_uploaded' }
      ]);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  // 2. Approve Order Handler
  async function handleApprove(orderId) {
    console.log(`Approving order: ${orderId}`);
    // Your approveOrder(orderId) logic will execute here
  }

  // 3. Reject Order Handler
  async function handleReject(orderId) {
    console.log(`Rejecting order: ${orderId}`);
    // Your rejectOrder(orderId) logic will execute here
  }

  if (loading) return <p style={{ padding: '20px', color: '#fff' }}>Loading orders...</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Admin Orders Dashboard</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: '10px' }}>Order ID</th>
            <th style={{ padding: '10px' }}>Customer</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '10px' }}>{order.id}</td>
              <td style={{ padding: '10px' }}>{order.customer}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ backgroundColor: '#333', padding: '4px 8px', borderRadius: '4px' }}>
                  {order.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => handleApprove(order.id)}
                  style={{ marginRight: '10px', backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleReject(order.id)}
                  style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


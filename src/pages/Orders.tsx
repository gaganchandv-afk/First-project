import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Phone, MapPin, Calendar, Clock, CheckCircle2, MessageSquare, PhoneCall, ExternalLink, Copy, Check, RefreshCw, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const STORE_OWNER_PHONE = '7019598992';

interface SavedOrder {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
  };
  paymentMethod: 'card' | 'cod';
  date: string;
  status?: 'Pending' | 'Dispatched' | 'Delivered';
}

export default function Orders() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('stepstyle_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const generateOrderMessage = (order: SavedOrder) => {
    const itemsList = order.items
      .map((item, index) => `${index + 1}. ${item.name} (${item.brand}) - Qty: ${item.quantity} x ₹${item.price.toLocaleString('en-IN')}`)
      .join('\n');

    return `🛍️ *STEPSTYLE ORDER NOTIFICATION #${order.orderId}*\n\n` +
      `👤 *Customer:* ${order.customer.name}\n` +
      `📞 *Phone:* ${order.customer.phone}\n` +
      `📧 *Email:* ${order.customer.email}\n` +
      `📍 *Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.zip}\n\n` +
      `💳 *Payment:* ${order.paymentMethod === 'cod' ? '💵 Cash on Delivery (COD)' : '💳 Paid Online / Card'}\n\n` +
      `👟 *Items:*\n${itemsList}\n\n` +
      `💰 *Subtotal:* ₹${order.subtotal.toLocaleString('en-IN')}\n` +
      `🚚 *Shipping:* ${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}\n` +
      `🏛️ *GST (5%):* ₹${order.tax.toLocaleString('en-IN')}\n` +
      `💵 *TOTAL AMOUNT:* ₹${order.total.toLocaleString('en-IN')}\n\n` +
      `📅 *Date:* ${order.date}\n` +
      `⚡ *Store Manager Number:* +91 ${STORE_OWNER_PHONE}`;
  };

  const handleCopy = (order: SavedOrder) => {
    const msg = generateOrderMessage(order);
    navigator.clipboard.writeText(msg);
    setCopiedId(order.orderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link to="/products" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Store <span className="text-orange-500">Orders Hub</span>
            </h1>
            <p className="text-gray-600 mt-2">
              All live orders are automatically logged and connected to store manager number <span className="font-bold text-black font-mono">+91 {STORE_OWNER_PHONE}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={loadOrders}
              className="gap-2 bg-white border-gray-300 font-bold"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Orders
            </Button>
            <a 
              href={`https://wa.me/91${STORE_OWNER_PHONE}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-md text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Manager WhatsApp (+91 {STORE_OWNER_PHONE})
            </a>
          </div>
        </div>

        {/* Store Manager Banner */}
        <div className="bg-orange-500 text-white p-6 rounded-3xl mb-10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase font-black tracking-widest text-orange-200">Official Store Notification Line</p>
              <p className="text-2xl font-black font-mono">+91 {STORE_OWNER_PHONE}</p>
              <p className="text-xs text-orange-100 mt-0.5">Automated dispatch ticket generation for every placed shoe order</p>
            </div>
          </div>
          <Badge className="bg-white text-orange-600 font-black px-3 py-1 text-xs">
            {orders.length} {orders.length === 1 ? 'ORDER LOGGED' : 'ORDERS LOGGED'}
          </Badge>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Orders Placed Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm">
              When a customer places an order on the checkout page, it will instantly appear here and send an automated alert to +91 {STORE_OWNER_PHONE}.
            </p>
            <Link to="/products">
              <Button className="bg-black hover:bg-orange-500 text-white font-bold px-8 py-6 rounded-none">
                BROWSE 52+ SHOES &amp; PLACE TEST ORDER
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => {
              const orderMsg = generateOrderMessage(order);
              const waUrl = `https://wa.me/91${STORE_OWNER_PHONE}?text=${encodeURIComponent(orderMsg)}`;
              const smsUrl = `sms:+91${STORE_OWNER_PHONE}?body=${encodeURIComponent(orderMsg)}`;

              return (
                <motion.div
                  key={order.orderId || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border shadow-sm p-6 md:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-xl text-black">#{order.orderId}</span>
                        <Badge className={`font-bold text-xs ${order.paymentMethod === 'cod' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                          {order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Paid Online'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {order.date}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Send WhatsApp to {STORE_OWNER_PHONE}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={smsUrl}
                        className="inline-flex items-center gap-1.5 bg-black hover:bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        SMS {STORE_OWNER_PHONE}
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(order)}
                        className="text-xs font-bold gap-1"
                      >
                        {copiedId === order.orderId ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === order.orderId ? 'Copied' : 'Copy'}
                      </Button>
                    </div>
                  </div>

                  {/* Customer Info & Destination */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-2xl text-sm">
                    <div>
                      <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">Customer Details</p>
                      <p className="font-bold text-black text-base">{order.customer.name}</p>
                      <p className="text-gray-600 flex items-center gap-1 mt-1">
                        <Phone className="w-3.5 h-3.5 text-orange-500" />
                        <a href={`tel:${order.customer.phone}`} className="hover:underline font-mono">
                          {order.customer.phone}
                        </a>
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{order.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">Shipping Destination</p>
                      <p className="font-medium text-gray-800 flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{order.customer.address}, {order.customer.city} - {order.customer.zip}</span>
                      </p>
                    </div>
                  </div>

                  {/* Ordered Shoes */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Ordered Shoes ({order.items.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-white" referrerPolicy="no-referrer" />
                          <div className="flex-grow min-w-0">
                            <p className="font-bold text-xs truncate text-black">{item.name}</p>
                            <p className="text-[11px] text-gray-500">{item.brand} • Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-xs text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total Bar */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Total Collectible
                    </span>
                    <span className="text-2xl font-black text-orange-500">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

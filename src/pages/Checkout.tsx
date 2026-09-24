import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, CreditCard, Truck, ShieldCheck, MessageSquare, PhoneCall, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart, CartItem } from '@/src/lib/cart-store';

const STORE_OWNER_PHONE = '7019598992';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [orderSummary, setOrderSummary] = useState<{
    orderId: string;
    items: CartItem[];
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
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const shipping = totalPrice >= 1999 ? 0 : 149;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + shipping + tax;

  const generateOrderMessage = (order: NonNullable<typeof orderSummary>) => {
    const itemsList = order.items
      .map((item, index) => `${index + 1}. ${item.name} (${item.brand}) - Qty: ${item.quantity} x ₹${item.price.toLocaleString('en-IN')}`)
      .join('\n');

    return `🛍️ *NEW STEPSTYLE SHOE ORDER #${order.orderId}*\n\n` +
      `👤 *Customer Name:* ${order.customer.name}\n` +
      `📞 *Customer Phone:* ${order.customer.phone}\n` +
      `📧 *Email:* ${order.customer.email}\n` +
      `📍 *Delivery Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.zip}\n\n` +
      `💳 *Payment Method:* ${order.paymentMethod === 'cod' ? '💵 Cash on Delivery (COD)' : '💳 Paid Online / Card'}\n\n` +
      `👟 *Ordered Items:*\n${itemsList}\n\n` +
      `💰 *Subtotal:* ₹${order.subtotal.toLocaleString('en-IN')}\n` +
      `🚚 *Shipping:* ${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}\n` +
      `🏛️ *GST (5%):* ₹${order.tax.toLocaleString('en-IN')}\n` +
      `💵 *TOTAL AMOUNT:* ₹${order.total.toLocaleString('en-IN')}\n\n` +
      `📅 *Date:* ${order.date}\n` +
      `⚡ *Store Notification:* Sent to +91 ${STORE_OWNER_PHONE}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId: generatedId,
      items: [...cart],
      subtotal: totalPrice,
      shipping,
      tax,
      total: finalTotal,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      paymentMethod,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save order in localStorage for store record keeping
    try {
      const stored = localStorage.getItem('stepstyle_orders');
      const existing = stored ? JSON.parse(stored) : [];
      existing.unshift(newOrder);
      localStorage.setItem('stepstyle_orders', JSON.stringify(existing));
    } catch {
      // Ignore storage quota errors
    }

    setTimeout(() => {
      setOrderSummary(newOrder);
      setIsOrdered(true);
      setIsSubmitting(false);
      clearCart();
    }, 1200);
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isOrdered && orderSummary) {
    const orderMessage = generateOrderMessage(orderSummary);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=91${STORE_OWNER_PHONE}&text=${encodeURIComponent(orderMessage)}`;
    const smsUrl = `sms:+91${STORE_OWNER_PHONE}?body=${encodeURIComponent(orderMessage)}`;
    const mailtoUrl = `mailto:gaganchand.v@gmail.com?subject=${encodeURIComponent(`[StepStyle] New Order #${orderSummary.orderId} - ₹${orderSummary.total}`)}&body=${encodeURIComponent(orderMessage)}`;

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `StepStyle Order #${orderSummary.orderId}`,
            text: orderMessage,
          });
        } catch {
          // cancelled
        }
      } else {
        handleCopyMessage(orderMessage);
      }
    };

    return (
      <div className="pt-36 pb-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header Success Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-bold mb-3 uppercase tracking-widest text-xs">
                Order Placed Successfully
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Your Order is <span className="text-green-600">Confirmed!</span>
              </h1>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Thank you, <span className="font-bold text-black">{orderSummary.customer.name}</span>. Your order <span className="font-bold text-black">#{orderSummary.orderId}</span> has been confirmed and is being prepared for delivery.
              </p>

              {/* Verified Owner Notification Box (7019598992) */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-3xl p-6 md:p-8 text-left mb-8 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-black uppercase tracking-tight text-base text-orange-950">
                        Dispatch Alert: Store Owner ({STORE_OWNER_PHONE})
                      </span>
                      <span className="bg-green-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Active Channel
                      </span>
                    </div>
                    <p className="text-xs text-orange-900 leading-relaxed">
                      This order is logged for store manager at <span className="font-bold font-mono text-black">+91 {STORE_OWNER_PHONE}</span>. Tap below to send the pre-filled dispatch ticket via WhatsApp or SMS messenger.
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-black py-3.5 px-4 rounded-2xl transition-all shadow-sm group"
                  >
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Send via WhatsApp (+91 {STORE_OWNER_PHONE})</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <a
                    href={smsUrl}
                    className="flex items-center justify-center gap-2.5 bg-black hover:bg-orange-600 text-white text-sm font-black py-3.5 px-4 rounded-2xl transition-all shadow-sm group"
                  >
                    <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Send Direct SMS ({STORE_OWNER_PHONE})</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-orange-200/60 text-xs">
                  <a
                    href={`tel:+91${STORE_OWNER_PHONE}`}
                    className="font-bold text-orange-900 hover:text-black flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
                    Call Manager: +91 {STORE_OWNER_PHONE}
                  </a>

                  <a
                    href={mailtoUrl}
                    className="font-bold text-orange-900 hover:text-black flex items-center gap-1.5"
                  >
                    <span>✉️ Email Alert: gaganchand.v@gmail.com</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="font-bold text-orange-900 hover:text-black flex items-center gap-1.5"
                  >
                    <span>📱 Share via Mobile Sheet</span>
                  </button>
                </div>
              </div>

              {/* Order Summary Details */}
              <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3 mb-6 text-sm border">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Order Number</span>
                  <span className="font-mono font-bold text-black text-base">#{orderSummary.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-bold uppercase text-xs px-2.5 py-1 rounded bg-orange-100 text-orange-800">
                    {orderSummary.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit / Debit Card'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Customer Phone</span>
                  <span className="font-bold text-black">{orderSummary.customer.phone}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Delivery Address</span>
                  <span className="font-medium text-black text-right max-w-[260px]">
                    {orderSummary.customer.address}, {orderSummary.customer.city} - {orderSummary.customer.zip}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Total Amount</span>
                  <span className="font-black text-2xl text-orange-500">₹{orderSummary.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Ordered Items Preview */}
              <div className="text-left mb-6">
                <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-3">Items in This Order</h4>
                <div className="space-y-3">
                  {orderSummary.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-white" referrerPolicy="no-referrer" />
                      <div className="flex-grow">
                        <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.brand} • Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Payload Preview & Copy Button */}
              <div className="bg-gray-100 rounded-xl p-4 text-left mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">SMS / WhatsApp Message Text</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs font-bold gap-1 text-gray-600 hover:text-black"
                    onClick={() => handleCopyMessage(orderMessage)}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? 'Copied' : 'Copy Message'}
                  </Button>
                </div>
                <pre className="text-[11px] font-mono text-gray-700 bg-white p-3 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed border">
                  {orderMessage}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/orders" className="w-full">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-black py-7 w-full rounded-none">
                    VIEW IN STORE ORDERS HUB
                  </Button>
                </Link>
                <Link to="/products" className="w-full">
                  <Button size="lg" variant="outline" className="border-gray-300 font-bold py-7 w-full rounded-none">
                    CONTINUE SHOPPING
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Nothing to <span className="text-orange-500">Checkout</span></h1>
          <p className="text-gray-500 mb-8">Your cart is empty. Please add some items before checking out.</p>
          <Link to="/products">
            <Button className="bg-black hover:bg-orange-500 text-white font-bold px-8 py-6 rounded-none">GO TO SHOP</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link to="/cart" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Secure <span className="text-orange-500">Checkout</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">All prices are in Indian Rupees (₹). Orders trigger immediate dispatch alert to store manager.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <Input name="name" required value={formData.name} onChange={handleInputChange} className="bg-gray-50 border-none focus-visible:ring-orange-500 py-6" placeholder="Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-gray-50 border-none focus-visible:ring-orange-500 py-6" placeholder="rahul@example.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Street Address / Locality</label>
                  <Input name="address" required value={formData.address} onChange={handleInputChange} className="bg-gray-50 border-none focus-visible:ring-orange-500 py-6" placeholder="Flat 402, Green Avenue, MG Road" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">City / Town</label>
                  <Input name="city" required value={formData.city} onChange={handleInputChange} className="bg-gray-50 border-none focus-visible:ring-orange-500 py-6" placeholder="Bengaluru" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">PIN Code</label>
                  <Input name="zip" required value={formData.zip} onChange={handleInputChange} className="bg-gray-50 border-none focus-visible:ring-orange-500 py-6" placeholder="560001" maxLength={6} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number (For Delivery & SMS Updates)</label>
                  <Input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className="bg-gray-50 border-none focus-visible:ring-orange-500 py-6" placeholder="+91 98765 43210" />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">2</div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Payment Method</h2>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'cod' ? 'bg-white border-orange-500 shadow-sm' : 'bg-gray-100 border-transparent hover:border-gray-300'}`}
                  >
                    <Truck className={paymentMethod === 'cod' ? 'text-orange-500' : 'text-gray-400'} />
                    <div className="text-left">
                      <span className={`block font-bold uppercase tracking-widest text-xs ${paymentMethod === 'cod' ? 'text-black' : 'text-gray-500'}`}>Cash on Delivery</span>
                      <span className="text-[11px] text-gray-400">Pay cash upon package arrival</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'bg-white border-orange-500 shadow-sm' : 'bg-gray-100 border-transparent hover:border-gray-300'}`}
                  >
                    <CreditCard className={paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'} />
                    <div className="text-left">
                      <span className={`block font-bold uppercase tracking-widest text-xs ${paymentMethod === 'card' ? 'text-black' : 'text-gray-500'}`}>Credit / Debit Card</span>
                      <span className="text-[11px] text-gray-400">Visa, Mastercard, RuPay</span>
                    </div>
                  </button>
                </div>
                
                {paymentMethod === 'cod' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-orange-50 rounded-2xl border border-orange-200"
                  >
                    <div className="flex items-center gap-2 font-bold text-orange-950 text-sm mb-1">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Cash on Delivery Selected
                    </div>
                    <p className="text-sm text-orange-900 leading-relaxed">
                      You will pay <span className="font-bold text-black">₹{finalTotal.toLocaleString('en-IN')}</span> in cash to our delivery agent when your shoes arrive at your doorstep. No advance payment required.
                    </p>
                  </motion.div>
                )}

                {paymentMethod === 'card' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
                  >
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                      <Input name="cardNumber" required={paymentMethod === 'card'} value={formData.cardNumber} onChange={handleInputChange} className="bg-white border-none focus-visible:ring-orange-500 py-6" placeholder="4111 2222 3333 4444" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                      <Input name="expiry" required={paymentMethod === 'card'} value={formData.expiry} onChange={handleInputChange} className="bg-white border-none focus-visible:ring-orange-500 py-6" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">CVV</label>
                      <Input name="cvv" type="password" maxLength={4} required={paymentMethod === 'card'} value={formData.cvv} onChange={handleInputChange} className="bg-white border-none focus-visible:ring-orange-500 py-6" placeholder="123" />
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Notification notice */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border">
              <PhoneCall className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600 leading-relaxed">
                <span className="font-bold text-black">Automatic Store Notification: </span>
                When you click Place Order, the full order summary, delivery address, and contact information will be dispatched to store manager phone <span className="font-mono font-bold text-orange-600">+91 {STORE_OWNER_PHONE}</span> for instant processing.
              </div>
            </div>
          </div>

          {/* Order Summary Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-10 rounded-[2.5rem] sticky top-32 border">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Your <span className="text-orange-500">Order</span></h2>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-sm line-clamp-1 uppercase tracking-tighter">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span className="uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                  <span className="font-bold text-black">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span className="uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                  <span className="font-bold text-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span className="uppercase tracking-widest text-[10px] font-bold">GST (5%)</span>
                  <span className="font-bold text-black">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black uppercase tracking-tighter">Total</span>
                  <span className="text-3xl font-black text-orange-500">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-orange-500 text-white py-8 text-lg font-black uppercase tracking-tighter rounded-none group transition-all"
              >
                {isSubmitting ? 'PROCESSING ORDER...' : 'PLACE ORDER (₹' + finalTotal.toLocaleString('en-IN') + ')'}
              </Button>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>256-bit encrypted checkout</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <Truck className="w-4 h-4 text-orange-500" />
                  <span>{shipping === 0 ? 'Free delivery across India' : 'Standard express delivery'}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

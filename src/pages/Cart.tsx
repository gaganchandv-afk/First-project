import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useCart } from '@/src/lib/cart-store';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-gray-200" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Cart is <span className="text-orange-500">Empty</span></h1>
            <p className="text-gray-500 mb-10 text-lg">Looks like you haven't added any shoes to your collection yet.</p>
            <Link to="/products">
              <Button size="lg" className="bg-black hover:bg-orange-500 text-white px-12 py-8 text-lg font-bold rounded-none w-full">
                START SHOPPING
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link to="/products" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Shopping <span className="text-orange-500">Cart</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-xs">
            You have {totalItems} items in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500"
                >
                  <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-white flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.brand}</p>
                        <Link to={`/product/${item.id}`} className="text-2xl font-black uppercase tracking-tighter hover:text-orange-500 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Category: {item.category}</p>
                      </div>
                      <p className="text-2xl font-black text-orange-500">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8 rounded-lg hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8 rounded-lg hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white p-10 rounded-[2.5rem] sticky top-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Order <span className="text-orange-500">Summary</span></h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span className="font-medium uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="font-bold text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="font-medium uppercase tracking-widest text-xs">Shipping</span>
                  <span className="font-bold text-white">{totalPrice >= 1999 ? 'FREE' : '₹149'}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="font-medium uppercase tracking-widest text-xs">GST (5%)</span>
                  <span className="font-bold text-white">₹{Math.round(totalPrice * 0.05).toLocaleString('en-IN')}</span>
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black uppercase tracking-tighter">Total</span>
                  <span className="text-4xl font-black text-orange-500">
                    ₹{(totalPrice + (totalPrice >= 1999 ? 0 : 149) + Math.round(totalPrice * 0.05)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input 
                    placeholder="Promo Code" 
                    className="bg-gray-900 border-none text-white focus-visible:ring-orange-500 py-6 pr-20"
                  />
                  <Button className="absolute right-1 top-1 bottom-1 bg-orange-500 hover:bg-orange-600 font-bold text-xs uppercase tracking-widest px-4">Apply</Button>
                </div>
                
                <Link to="/checkout" className="block">
                  <Button className="w-full bg-white text-black hover:bg-orange-500 hover:text-white py-8 text-lg font-black uppercase tracking-tighter rounded-none group">
                    CHECKOUT NOW
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-center gap-6 opacity-40 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

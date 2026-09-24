import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Instagram, Twitter, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/src/lib/cart-store';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function Navbar() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="bg-orange-500 text-white px-2 py-0.5 rounded italic">STEP</span>
          <span className={isScrolled ? 'text-black' : 'text-black md:text-white'}>STYLE</span>
        </Link>

        <div className={`hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest ${isScrolled ? 'text-black' : 'text-white'}`}>
          <Link to="/" className={`hover:text-orange-500 transition-colors ${location.pathname === '/' ? 'text-orange-500' : ''}`}>Home</Link>
          <Link to="/products" className={`hover:text-orange-500 transition-colors ${location.pathname === '/products' ? 'text-orange-500' : ''}`}>Shop All</Link>
          <Link to="/products?category=Sports" className="hover:text-orange-500 transition-colors">Sports (18)</Link>
          <Link to="/products?tier=Budget" className="hover:text-orange-500 transition-colors">Budget</Link>
          <Link to="/products?tier=Costly" className="hover:text-orange-500 transition-colors">Costly/Premium</Link>
          <Link to="/orders" className={`hover:text-orange-500 transition-colors flex items-center gap-1.5 ${location.pathname === '/orders' ? 'text-orange-500' : ''}`}>
            <span>Orders</span>
            <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">7019598992</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/orders" className="hidden lg:flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all">
            <span>Store Phone: 7019598992</span>
          </Link>
          
          <Link to="/cart" className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-orange-500 text-white min-w-[20px] h-5 flex items-center justify-center px-1 border-none">
                {totalItems}
              </Badge>
            )}
          </Link>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`}>
                  <Menu className="w-6 h-6" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-12 text-lg font-medium">
                <Link to="/" className="hover:text-orange-500">Home</Link>
                <Link to="/products" className="hover:text-orange-500">Shop All (52 Shoes)</Link>
                <Link to="/products?category=Sports" className="hover:text-orange-500">🏃 Sports Shoes</Link>
                <Link to="/products?tier=Budget" className="hover:text-orange-500">🏷️ Budget Shoes (&lt;₹2,500)</Link>
                <Link to="/products?tier=Mid-Range" className="hover:text-orange-500">⚡ Mid-Range Shoes</Link>
                <Link to="/products?tier=Costly" className="hover:text-orange-500">👑 Costly / Luxury Shoes</Link>
                <Separator />
                <Link to="/orders" className="flex items-center justify-between text-orange-600 font-bold">
                  <span>Store Orders Hub</span>
                  <span className="text-xs bg-orange-100 px-2 py-1 rounded">7019598992</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded italic">STEP</span>
              <span>STYLE</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Premium footwear for the modern explorer. We combine style, comfort, and performance in every step you take.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-orange-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-orange-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-orange-500 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Sneakers" className="hover:text-white transition-colors">Sneakers</Link></li>
              <li><Link to="/products?category=Sports" className="hover:text-white transition-colors">Sports</Link></li>
              <li><Link to="/products?category=Casual" className="hover:text-white transition-colors">Casual</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and first look at new arrivals.</p>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="bg-gray-900 border-none text-white focus-visible:ring-orange-500" />
              <Button className="bg-orange-500 hover:bg-orange-600">Join</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 StepStyle. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

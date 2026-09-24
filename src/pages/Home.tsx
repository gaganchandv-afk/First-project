import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/src/data/products';
import ProductCard from '@/src/components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className="bg-orange-500 text-white mb-6 px-4 py-1 text-sm font-bold tracking-widest uppercase">New Collection 2026</Badge>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8 uppercase">
              Step Into <br />
              <span className="text-orange-500">The Future</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Discover the ultimate fusion of performance and style. Our new collection pushes the boundaries of footwear technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-8 text-lg font-bold rounded-none group">
                  SHOP COLLECTION
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black px-8 py-8 text-lg font-bold rounded-none">
                <Play className="mr-2 w-5 h-5 fill-current" />
                WATCH FILM
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md p-6 border border-white/20 rounded-2xl max-w-xs"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">4.9</div>
              <div>
                <p className="text-white font-bold uppercase text-xs tracking-widest">Customer Rating</p>
                <div className="flex text-orange-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm italic">"The most comfortable sneakers I've ever owned. The style is just unmatched!"</p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Browse by <span className="text-orange-500">Category</span></h2>
              <p className="text-gray-500 max-w-md">Find the perfect pair for every occasion, from high-performance sports to elegant formal wear.</p>
            </div>
            <Link to="/products">
              <Button variant="link" className="text-black font-bold text-lg group">
                VIEW ALL CATEGORIES
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sneakers', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', span: 'lg:col-span-2' },
              { name: 'Sports', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80', span: '' },
              { name: 'Casual', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', span: '' },
              { name: 'Formal', img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80', span: 'lg:col-span-2' },
            ].map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group overflow-hidden rounded-3xl h-[400px] ${cat.span}`}
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">{cat.name}</h3>
                  <Link to={`/products?category=${cat.name}`}>
                    <Button className="bg-white text-black hover:bg-orange-500 hover:text-white font-bold rounded-full">
                      EXPLORE
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-600 mb-4 px-4 py-1 text-xs font-bold tracking-widest uppercase">Hot Picks</Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Featured <span className="text-orange-500">Arrivals</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Our most popular and highly-rated products, handpicked just for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/products">
              <Button size="lg" className="bg-black hover:bg-orange-500 text-white px-12 py-8 text-lg font-bold rounded-none transition-all duration-300">
                BROWSE ALL PRODUCTS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter">Fast Delivery</h3>
              <p className="text-gray-500">Free shipping on all orders over ₹1,999. Delivered within 2-3 business days across India.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter">Secure Payment</h3>
              <p className="text-gray-500">Your payment information is processed securely with 256-bit encryption.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <RotateCcw className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter">Easy Returns</h3>
              <p className="text-gray-500">Not satisfied? Return your items within 30 days for a full refund or exchange.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-orange-500">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-3xl"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
                Ready to <span className="text-orange-500">Level Up</span> Your Style?
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Join our community of 50,000+ shoe enthusiasts and get exclusive access to limited drops and special discounts.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/products">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-8 text-xl font-bold rounded-none">
                    SHOP NOW
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black px-12 py-8 text-xl font-bold rounded-none">
                  LEARN MORE
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

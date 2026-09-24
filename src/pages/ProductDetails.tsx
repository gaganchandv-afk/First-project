import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, Product } from '@/src/data/products';
import { useCart } from '@/src/lib/cart-store';
import ProductCard from '@/src/components/ProductCard';

const sizes = ['7', '8', '9', '10', '11', '12'];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('9');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-orange-500">Shop</Link>
          <span>/</span>
          <span className="text-black font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-100 relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer border-2 border-transparent hover:border-orange-500 transition-all">
                  <img 
                    src={product.image} 
                    alt={`${product.name} view ${i}`} 
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-orange-100 text-orange-600 border-none font-bold uppercase tracking-widest px-4 py-1">
                  {product.category}
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold text-black">{product.rating}</span>
                  <span className="ml-1 text-gray-400 font-medium">({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
                {product.name}
              </h1>
              <p className="text-3xl font-black text-orange-500 mb-6">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="text-gray-500 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator className="mb-8" />

            <div className="space-y-8 mb-10">
              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold uppercase text-xs tracking-widest">Select Size (US)</h4>
                  <button className="text-xs font-bold text-orange-500 underline uppercase tracking-widest">Size Guide</button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`py-3 rounded-xl font-bold transition-all border-2 ${
                        selectedSize === size 
                          ? 'border-orange-500 bg-orange-50 text-orange-500' 
                          : 'border-gray-100 hover:border-gray-300 text-gray-500'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-lg hover:bg-white"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-lg hover:bg-white"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  size="lg" 
                  className={`flex-grow py-8 text-lg font-bold rounded-xl transition-all duration-300 ${
                    isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-black hover:bg-orange-500'
                  }`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <><Check className="mr-2 w-6 h-6" /> ADDED TO CART</>
                  ) : (
                    <><ShoppingCart className="mr-2 w-6 h-6" /> ADD TO CART</>
                  )}
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-tighter">Free Shipping</p>
                  <p className="text-gray-400">On orders over ₹1,999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-tighter">30 Day Returns</p>
                  <p className="text-gray-400">Easy exchanges</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-tighter">2 Year Warranty</p>
                  <p className="text-gray-400">Quality guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-24">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-8">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-active:border-orange-500 data-active:bg-transparent px-8 py-4 font-bold uppercase tracking-widest text-xs"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-active:border-orange-500 data-active:bg-transparent px-8 py-4 font-bold uppercase tracking-widest text-xs"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-active:border-orange-500 data-active:bg-transparent px-8 py-4 font-bold uppercase tracking-widest text-xs"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-gray-500 leading-relaxed max-w-4xl">
              <p className="mb-4">
                The {product.name} is a testament to StepStyle's commitment to excellence. Designed for those who demand both style and substance, this shoe features our latest comfort technology combined with a timeless aesthetic.
              </p>
              <p>
                Whether you're navigating city streets or hitting the gym, the {product.name} provides the support and durability you need. The premium materials used in its construction ensure that it not only looks great but also stands the test of time.
              </p>
            </TabsContent>
            <TabsContent value="details" className="text-gray-500">
              <ul className="list-disc pl-5 space-y-2">
                <li>Premium leather and mesh upper for breathability</li>
                <li>Responsive foam midsole for all-day comfort</li>
                <li>Durable rubber outsole with multi-surface traction</li>
                <li>Padded collar and tongue for a secure fit</li>
                <li>Reflective details for visibility in low light</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-8">
                {[1, 2].map(i => (
                  <div key={i} className="border-b pb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-orange-500">JD</div>
                      <div>
                        <p className="font-bold">John Doe</p>
                        <div className="flex text-yellow-500">
                          {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}
                        </div>
                      </div>
                      <span className="ml-auto text-xs text-gray-400 uppercase font-bold tracking-widest">2 weeks ago</span>
                    </div>
                    <p className="text-gray-500">"Absolutely love these shoes! They fit perfectly and are incredibly comfortable for long walks. The style is even better in person."</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-black font-bold py-6">LOAD MORE REVIEWS</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-black uppercase tracking-tighter">You May Also <span className="text-orange-500">Like</span></h2>
              <Link to="/products">
                <Button variant="link" className="text-black font-bold uppercase tracking-widest text-xs">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

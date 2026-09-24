import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/src/data/products';
import { useCart } from '@/src/lib/cart-store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group overflow-hidden border-none bg-gray-50 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
        <CardContent className="p-0 relative aspect-square overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </Link>
          
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
            <Badge className="bg-white/95 text-black hover:bg-white border-none font-bold text-[11px] shadow-sm">
              {product.category}
            </Badge>
            {product.tier === 'Budget' && (
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 border-none font-bold text-[10px] tracking-wide shadow-sm">
                BUDGET PICK
              </Badge>
            )}
            {product.tier === 'Mid-Range' && (
              <Badge className="bg-blue-600 text-white hover:bg-blue-600 border-none font-bold text-[10px] tracking-wide shadow-sm">
                MID-RANGE
              </Badge>
            )}
            {product.tier === 'Costly' && (
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:opacity-90 border-none font-black text-[10px] tracking-wide shadow-sm">
                LUXURY / COSTLY
              </Badge>
            )}
          </div>

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white text-black hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full bg-white text-black hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-6 gap-2">
          <div className="flex justify-between w-full items-start">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{product.brand}</p>
              <Link to={`/product/${product.id}`} className="text-lg font-bold hover:text-orange-500 transition-colors line-clamp-1">
                {product.name}
              </Link>
            </div>
            <p className="text-lg font-black text-orange-500">₹{product.price.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 font-bold text-black">{product.rating}</span>
            </div>
            <span>({product.reviews} reviews)</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;

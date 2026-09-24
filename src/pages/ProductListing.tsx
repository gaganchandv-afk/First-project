import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { products, Product } from '@/src/data/products';
import ProductCard from '@/src/components/ProductCard';

const categories = ['All', 'Sports', 'Casual', 'Formal', 'Sneakers', 'Boots'];
const tiers = ['All', 'Budget', 'Mid-Range', 'Costly'];
const brands = ['All', 'Nike', 'Adidas', 'Puma', 'Reebok', 'Asics', 'Skechers', 'Campus', 'Sparx', 'Woodland', 'Timberland', 'On', 'StepStyle'];

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedTier, setSelectedTier] = useState(searchParams.get('tier') || 'All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const tier = searchParams.get('tier');
    if (tier) setSelectedTier(tier);
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesTier = selectedTier === 'All' || product.tier === selectedTier;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesTier && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // newest/default
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            The <span className="text-orange-500">Collection</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-gray-500 max-w-xl">
              Showing {filteredProducts.length} results for {selectedCategory === 'All' ? 'all categories' : selectedCategory}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-full md:w-64 bg-gray-50 border-none focus-visible:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="outline" className="md:hidden border-black font-bold">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-black uppercase tracking-tighter">Filters</SheetTitle>
                    <SheetDescription>Refine your search results</SheetDescription>
                  </SheetHeader>
                  <div className="py-8 space-y-8">
                    <div>
                      <h4 className="font-bold uppercase text-xs tracking-widest mb-4">Price Tier</h4>
                      <div className="flex flex-wrap gap-2">
                        {tiers.map(t => (
                          <Badge 
                            key={t}
                            variant={selectedTier === t ? 'default' : 'outline'}
                            className={`cursor-pointer px-4 py-1 rounded-full ${selectedTier === t ? 'bg-orange-500 text-white border-none' : 'border-gray-200'}`}
                            onClick={() => setSelectedTier(t)}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold uppercase text-xs tracking-widest mb-4">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <Badge 
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            className={`cursor-pointer px-4 py-1 rounded-full ${selectedCategory === cat ? 'bg-orange-500 text-white border-none' : 'border-gray-200'}`}
                            onClick={() => setSelectedCategory(cat)}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold uppercase text-xs tracking-widest mb-4">Brand</h4>
                      <div className="flex flex-wrap gap-2">
                        {brands.map(brand => (
                          <Badge 
                            key={brand}
                            variant={selectedBrand === brand ? 'default' : 'outline'}
                            className={`cursor-pointer px-4 py-1 rounded-full ${selectedBrand === brand ? 'bg-orange-500 text-white border-none' : 'border-gray-200'}`}
                            onClick={() => setSelectedBrand(brand)}
                          >
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold uppercase text-xs tracking-widest mb-4">Sort By</h4>
                      <select 
                        className="w-full p-2 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-orange-500 outline-none"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0 space-y-10">
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-6 border-b pb-2">Price Tier</h4>
              <ul className="space-y-3">
                {tiers.map(t => (
                  <li key={t}>
                    <button 
                      className={`text-sm font-medium transition-colors hover:text-orange-500 flex items-center justify-between w-full ${selectedTier === t ? 'text-orange-500 font-bold' : 'text-gray-500'}`}
                      onClick={() => setSelectedTier(t)}
                    >
                      <span>{t === 'Budget' ? '🏷️ Budget (<₹2,500)' : t === 'Mid-Range' ? '⚡ Mid-Range' : t === 'Costly' ? '👑 Costly / Luxury' : 'All Tiers'}</span>
                      {selectedTier === t && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-6 border-b pb-2">Category</h4>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      className={`text-sm font-medium transition-colors hover:text-orange-500 flex items-center justify-between w-full ${selectedCategory === cat ? 'text-orange-500 font-bold' : 'text-gray-500'}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-6 border-b pb-2">Brand</h4>
              <ul className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                {brands.map(brand => (
                  <li key={brand}>
                    <button 
                      className={`text-sm font-medium transition-colors hover:text-orange-500 flex items-center justify-between w-full ${selectedBrand === brand ? 'text-orange-500 font-bold' : 'text-gray-500'}`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      <span>{brand}</span>
                      {selectedBrand === brand && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-6 border-b pb-2">Price Range</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span>₹0</span>
                  <span>₹25,000</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="25000" 
                  step="500"
                  value={priceRange[1]}
                  className="w-full accent-orange-500"
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <p className="text-sm text-gray-500">Up to <span className="font-bold text-black">₹{priceRange[1].toLocaleString('en-IN')}</span></p>
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                <h5 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none">Get 20% <br />Off</h5>
                <p className="text-xs text-gray-400 mb-6">On your first order with code: <span className="text-orange-500 font-bold">STEP20</span></p>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 w-full font-bold">COPY CODE</Button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 overflow-x-auto">
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedTier('All'); }}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${selectedCategory === 'All' && selectedTier === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Shoes ({products.length})
              </button>
              <button
                onClick={() => { setSelectedCategory('Sports'); setSelectedTier('All'); }}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${selectedCategory === 'Sports' && selectedTier === 'All' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}
              >
                🏃 Sports Shoes ({products.filter(p => p.category === 'Sports').length})
              </button>
              <button
                onClick={() => setSelectedTier('Budget')}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${selectedTier === 'Budget' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                🏷️ Budget Shoes (&lt;₹2,500)
              </button>
              <button
                onClick={() => setSelectedTier('Mid-Range')}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${selectedTier === 'Mid-Range' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}`}
              >
                ⚡ Mid-Range (₹2,500 - ₹7,999)
              </button>
              <button
                onClick={() => setSelectedTier('Costly')}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${selectedTier === 'Costly' ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'}`}
              >
                👑 Costly / Luxury (₹8,000+)
              </button>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-orange-500 bg-orange-50">
                  <LayoutGrid className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <List className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Sort By</span>
                <select 
                  className="p-2 bg-transparent font-bold outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low-High</option>
                  <option value="price-high">Price: High-Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500 mb-8">Try adjusting your filters or search query.</p>
                <Button 
                  className="bg-black text-white font-bold px-8"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setPriceRange([0, 20000]);
                  }}
                >
                  CLEAR ALL FILTERS
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

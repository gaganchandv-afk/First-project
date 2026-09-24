export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Sports' | 'Casual' | 'Formal' | 'Sneakers' | 'Boots';
  tier: 'Budget' | 'Mid-Range' | 'Costly';
  brand: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // ==================== SPORTS SHOES ====================
  // Budget Sports (< ₹2,500)
  {
    id: 'sp-1',
    name: 'Power Pace Pro Runner',
    price: 1499,
    category: 'Sports',
    tier: 'Budget',
    brand: 'Campus',
    description: 'Ultra-lightweight mesh running shoe designed for daily morning jogs, track practice, and gym workouts. Breathable and shock-absorbing.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.4,
    reviews: 215
  },
  {
    id: 'sp-2',
    name: 'Aero Flex Gym Trainer',
    price: 1199,
    category: 'Sports',
    tier: 'Budget',
    brand: 'Sparx',
    description: 'High-traction cross-trainer with flex-groove sole for agile lateral movements, weight training, and intense cardio sessions.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    rating: 4.3,
    reviews: 180
  },
  {
    id: 'sp-3',
    name: 'Turbo Sprint Marathon',
    price: 1899,
    category: 'Sports',
    tier: 'Budget',
    brand: 'StepStyle',
    description: 'Engineered for endurance running with responsive bounce foam midsole and anti-abrasion rubber grip pads.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    rating: 4.5,
    reviews: 142
  },
  {
    id: 'sp-4',
    name: 'Velocity Court Badminton',
    price: 1699,
    category: 'Sports',
    tier: 'Budget',
    brand: 'Nivia',
    description: 'Non-marking gum rubber sole court shoe with reinforced ankle support for explosive badminton and squash rallies.',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
    rating: 4.6,
    reviews: 98
  },
  {
    id: 'sp-5',
    name: 'Hyper Strike Football Turf',
    price: 1999,
    category: 'Sports',
    tier: 'Budget',
    brand: 'Vector X',
    description: 'Molded stud configuration engineered for artificial turf and hard ground soccer fields. Precision ball control upper.',
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=80',
    rating: 4.5,
    reviews: 110
  },

  // Mid-Range Sports (₹2,500 - ₹7,999)
  {
    id: 'sp-6',
    name: 'Revolution 7 Road Runner',
    price: 3695,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Nike',
    description: 'Soft foam cushioning cushions your stride mile after mile. Minimalist lightweight knit upper wraps your foot in breathable comfort.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
    rating: 4.7,
    reviews: 320
  },
  {
    id: 'sp-7',
    name: 'Duramo Speed Light',
    price: 4499,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Adidas',
    description: 'Lightstrike midsole cushioning provides responsive speed while the engineered mesh upper ensures cool ventilation.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    rating: 4.6,
    reviews: 245
  },
  {
    id: 'sp-8',
    name: 'Carson 2 Knit Runner',
    price: 3299,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Puma',
    description: 'Modernized core runner featuring iconic Carson Runner aesthetics with a lightweight knit upper and SoftFoam sockliner.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    rating: 4.5,
    reviews: 165
  },
  {
    id: 'sp-9',
    name: 'Floatride Energy 5',
    price: 5999,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Reebok',
    description: 'Equipped with Floatride Energy Foam for snappy responsiveness and smooth transitions on road and treadmill runs.',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
    rating: 4.7,
    reviews: 198
  },
  {
    id: 'sp-10',
    name: 'Gel-Contend 8 Athletic',
    price: 4299,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Asics',
    description: 'Rearfoot GEL technology absorbs shock upon landing, combined with an AMPLIFOAM midsole and OrthoLite sockliner.',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
    rating: 4.8,
    reviews: 280
  },
  {
    id: 'sp-11',
    name: 'Max Cushioning Elite',
    price: 6499,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Skechers',
    description: 'Maximum impact protection with ULTRA GO cushioned platform and Air-Cooled Goga Mat insole for effortless high-mileage runs.',
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80',
    rating: 4.6,
    reviews: 174
  },
  {
    id: 'sp-12',
    name: 'Trail Blazer X Off-Road',
    price: 6499,
    category: 'Sports',
    tier: 'Mid-Range',
    brand: 'Adidas',
    description: 'Rugged all-weather trail shoe with Continental lugged rubber outsole and protective toe bumper for rocky terrain.',
    image: 'https://images.unsplash.com/photo-1551107696-a4b085a6d96a?w=800&q=80',
    rating: 4.8,
    reviews: 210
  },

  // Costly / Premium Sports (₹8,000+)
  {
    id: 'sp-13',
    name: 'ZoomX Vaporfly Next% 3',
    price: 20999,
    category: 'Sports',
    tier: 'Costly',
    brand: 'Nike',
    description: 'The world-record-breaking marathon racing super-shoe featuring full-length carbon fiber Flyplate and ultra-springy ZoomX foam.',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&q=80',
    rating: 4.9,
    reviews: 430
  },
  {
    id: 'sp-14',
    name: 'Air Zoom Alphafly 3',
    price: 22999,
    category: 'Sports',
    tier: 'Costly',
    brand: 'Nike',
    description: 'Dual Air Zoom pods, continuous carbon plate, and atomknit 3.0 upper make this the ultimate long-distance racing weapon.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.9,
    reviews: 512
  },
  {
    id: 'sp-15',
    name: 'Cloudmonster Hyper Elite',
    price: 18999,
    category: 'Sports',
    tier: 'Costly',
    brand: 'On',
    description: 'Swiss precision-engineered mega CloudTec pods with Helion HF hyper-foam for unmatched energetic rebound and zero impact fatigue.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    rating: 4.9,
    reviews: 380
  },
  {
    id: 'sp-16',
    name: 'Gel-Kayano 31 Platinum',
    price: 15999,
    category: 'Sports',
    tier: 'Costly',
    brand: 'Asics',
    description: 'Premium stability runner with 4D GUIDANCE SYSTEM and PureGEL technology for plush, biomechanically supported marathon strides.',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
    rating: 4.8,
    reviews: 295
  },
  {
    id: 'sp-17',
    name: 'Adizero Adios Pro 3',
    price: 19999,
    category: 'Sports',
    tier: 'Costly',
    brand: 'Adidas',
    description: 'Championship-proven carbon ENERGYRODS 2.0 system and dual-layer Lightstrike Pro foam for explosive speed on race day.',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
    rating: 4.9,
    reviews: 340
  },
  {
    id: 'sp-18',
    name: 'Deviate Nitro Elite 2',
    price: 16499,
    category: 'Sports',
    tier: 'Costly',
    brand: 'Puma',
    description: 'Featherlight carbon-plated road racer with supercritical NITRO Elite foam providing unmatched propulsion and efficiency.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    rating: 4.8,
    reviews: 210
  },

  // ==================== SNEAKERS ====================
  // Budget Sneakers (< ₹2,500)
  {
    id: 'sn-1',
    name: 'Street Glide Canvas Sneaker',
    price: 1299,
    category: 'Sneakers',
    tier: 'Budget',
    brand: 'StepStyle',
    description: 'Everyday vulcanized canvas low-top sneaker with reinforced eyelets and rubber toe bumper for casual streetwear vibe.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    rating: 4.3,
    reviews: 130
  },
  {
    id: 'sn-2',
    name: 'Urban Classic Low Sneaker',
    price: 1499,
    category: 'Sneakers',
    tier: 'Budget',
    brand: 'Sparx',
    description: 'Clean silhouette in faux leather with padded ankle collar and contrast stitching. Perfect for college and weekend wear.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    rating: 4.4,
    reviews: 175
  },

  // Mid-Range Sneakers (₹2,500 - ₹7,999)
  {
    id: 'sn-3',
    name: 'Urban Street Retro',
    price: 4499,
    category: 'Sneakers',
    tier: 'Mid-Range',
    brand: 'Puma',
    description: 'Heritage court sneaker with smooth suede overlays, padded tongue, and iconic Formstrip branding.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    rating: 4.6,
    reviews: 190
  },
  {
    id: 'sn-4',
    name: 'Club C 85 Vintage',
    price: 5499,
    category: 'Sneakers',
    tier: 'Mid-Range',
    brand: 'Reebok',
    description: 'Iconic tennis shoe born in 1985 with soft garment leather upper and vintage off-white EVA midsole.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    rating: 4.7,
    reviews: 215
  },
  {
    id: 'sn-5',
    name: 'Superstar Core 3-Stripe',
    price: 7999,
    category: 'Sneakers',
    tier: 'Mid-Range',
    brand: 'Adidas',
    description: 'The legendary shell-toe shoe with classic serrated 3-Stripes and premium leather construction for an unmistakable look.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
    rating: 4.8,
    reviews: 380
  },
  {
    id: 'sn-6',
    name: 'Court Vision Low Next Nature',
    price: 5695,
    category: 'Sneakers',
    tier: 'Mid-Range',
    brand: 'Nike',
    description: '80s basketball-inspired low-top made with at least 20% recycled materials by weight for eco-conscious streetwear style.',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
    rating: 4.6,
    reviews: 240
  },

  // Costly / Premium Sneakers (₹8,000+)
  {
    id: 'sn-7',
    name: 'Air Max Pulse Metallic',
    price: 11999,
    category: 'Sneakers',
    tier: 'Costly',
    brand: 'Nike',
    description: 'Point-loaded Air cushioning system delivers incredible responsiveness with edgy streetwear metallic detailing.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.8,
    reviews: 310
  },
  {
    id: 'sn-8',
    name: 'Air Force 1 \'07 LV8',
    price: 10795,
    category: 'Sneakers',
    tier: 'Costly',
    brand: 'Nike',
    description: 'Premium tumbled leather, embroidered swoosh, and encapsulated Air-sole cushioning make this the gold standard sneaker.',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
    rating: 4.9,
    reviews: 490
  },
  {
    id: 'sn-9',
    name: 'Forum 84 High Vintage',
    price: 9999,
    category: 'Sneakers',
    tier: 'Costly',
    brand: 'Adidas',
    description: 'High-top hardwood classic featuring premium distressed leather, removable ankle strap, and X-ankle design.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
    rating: 4.8,
    reviews: 185
  },
  {
    id: 'sn-10',
    name: 'Dunk Low Retro Panda',
    price: 8999,
    category: 'Sneakers',
    tier: 'Costly',
    brand: 'Nike',
    description: 'Timeless two-tone monochrome color blocking with foam midsole and padded low-cut collar for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    rating: 4.9,
    reviews: 620
  },

  // ==================== CASUAL SHOES ====================
  // Budget Casual (< ₹2,500)
  {
    id: 'cs-1',
    name: 'Breathe Easy Canvas Slip-on',
    price: 1199,
    category: 'Casual',
    tier: 'Budget',
    brand: 'StepStyle',
    description: 'Lightweight slip-on with stretch elastic side inserts and memory foam insole for effortless daily errands.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    rating: 4.4,
    reviews: 155
  },
  {
    id: 'cs-2',
    name: 'Relax Comfort Knit Loafer',
    price: 1399,
    category: 'Casual',
    tier: 'Budget',
    brand: 'Sparx',
    description: 'Engineered knit slip-on with flexible honeycomb outsole and anti-odor sockliner for day-long barefoot feel.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    rating: 4.3,
    reviews: 120
  },
  {
    id: 'cs-3',
    name: 'Coastal Deck Boat Shoe',
    price: 1999,
    category: 'Casual',
    tier: 'Budget',
    brand: 'StepStyle',
    description: '360-degree lacing system with siped rubber outsoles for wet-and-dry grip on city streets or coastal weekends.',
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80',
    rating: 4.5,
    reviews: 95
  },

  // Mid-Range Casual (₹2,500 - ₹7,999)
  {
    id: 'cs-4',
    name: 'Classic Leather Heritage',
    price: 4999,
    category: 'Casual',
    tier: 'Mid-Range',
    brand: 'Reebok',
    description: 'Plush garment leather upper with die-cut EVA midsole and high-abrasion rubber outsole for iconic everyday elegance.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    rating: 4.7,
    reviews: 210
  },
  {
    id: 'cs-5',
    name: 'Stan Smith Vegan Clean',
    price: 6299,
    category: 'Casual',
    tier: 'Mid-Range',
    brand: 'Adidas',
    description: 'Crisp minimalist white silhouette with green heel tab and perforated 3-Stripes crafted from Primegreen recycled materials.',
    image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&q=80',
    rating: 4.8,
    reviews: 310
  },
  {
    id: 'cs-6',
    name: 'Suede Classic XXI',
    price: 4799,
    category: 'Casual',
    tier: 'Mid-Range',
    brand: 'Puma',
    description: 'Full suede upper with tonal laces, gold foil branding, and comfortable sockliner that cushions every step.',
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80',
    rating: 4.6,
    reviews: 180
  },
  {
    id: 'cs-7',
    name: 'Go Walk Arch Fit 2.0',
    price: 4999,
    category: 'Casual',
    tier: 'Mid-Range',
    brand: 'Skechers',
    description: 'Podiatrist-certified arch support walking shoe with high-rebound Comfort Pillar Technology for all-day ease.',
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80',
    rating: 4.7,
    reviews: 230
  },

  // Costly / Premium Casual (₹8,000+)
  {
    id: 'cs-8',
    name: 'GrandPro Tennis Sneaker',
    price: 11999,
    category: 'Casual',
    tier: 'Costly',
    brand: 'Cole Haan',
    description: 'Featherlight court shoe weighing only 8.8 ounces, crafted with hand-burnished leather and Grand.OS responsive cushioning.',
    image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&q=80',
    rating: 4.9,
    reviews: 145
  },
  {
    id: 'cs-9',
    name: 'Frenz Luxury Leather Slip-On',
    price: 18499,
    category: 'Casual',
    tier: 'Costly',
    brand: 'StepStyle Luxury',
    description: 'Artisanal Italian deer-skin leather slip-on with hand-stitched welt, leather lining, and ultra-flexible rubber crepe sole.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    rating: 4.9,
    reviews: 88
  },

  // ==================== FORMAL SHOES ====================
  // Budget Formal (< ₹2,500)
  {
    id: 'fm-1',
    name: 'Classic Formal Derby',
    price: 1899,
    category: 'Formal',
    tier: 'Budget',
    brand: 'Red Tape',
    description: 'Clean open-laced derby in polished synthetic leather with padded collar and cushioned insole for corporate wear.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    rating: 4.3,
    reviews: 140
  },
  {
    id: 'fm-2',
    name: 'Office Smart Formal Slip-On',
    price: 2199,
    category: 'Formal',
    tier: 'Budget',
    brand: 'StepStyle',
    description: 'Sleek slip-on dress shoe with hidden elastic gussets and anti-slip TPR sole for long work days.',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    rating: 4.4,
    reviews: 110
  },

  // Mid-Range Formal (₹2,500 - ₹7,999)
  {
    id: 'fm-3',
    name: 'Oxford Elite Handcrafted',
    price: 6999,
    category: 'Formal',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Handcrafted full-grain Italian calfskin oxfords with closed lacing and Goodyear welted sole for boardroom elegance.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    rating: 4.9,
    reviews: 180
  },
  {
    id: 'fm-4',
    name: 'Derby Royal Brogue',
    price: 5999,
    category: 'Formal',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Intricate wingtip brogue detailing crafted from polished calfskin leather with memory-cushioned insole.',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    rating: 4.8,
    reviews: 135
  },
  {
    id: 'fm-5',
    name: 'Monk Strap Maestro Burnished',
    price: 7499,
    category: 'Formal',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Distinguished double buckle monk strap shoes in burnished tan leather with brass hardware and anti-slip sole.',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
    rating: 4.9,
    reviews: 120
  },
  {
    id: 'fm-6',
    name: 'Penny Loafer Prestige Calfskin',
    price: 5299,
    category: 'Formal',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Effortless slip-on dress loafer in smooth black calfskin. Perfect for both business suits and semi-formal trousers.',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
    rating: 4.7,
    reviews: 95
  },

  // Costly / Premium Formal (₹8,000+)
  {
    id: 'fm-7',
    name: 'Cap-Toe Executive Oxford',
    price: 12999,
    category: 'Formal',
    tier: 'Costly',
    brand: 'StepStyle Imperial',
    description: 'The pinnacle of black-tie sophistication. Mirror-shine cap-toe design with genuine Argentine leather outsole and hand-waxed finish.',
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80',
    rating: 4.9,
    reviews: 165
  },
  {
    id: 'fm-8',
    name: 'Wholecut Hand-Burnished Oxford',
    price: 16999,
    category: 'Formal',
    tier: 'Costly',
    brand: 'StepStyle Bespoke',
    description: 'Crafted from a single flawless piece of premium French calfskin. No seams, supreme contour, and hand-patinated cognac color.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    rating: 5.0,
    reviews: 92
  },

  // ==================== BOOTS ====================
  // Budget Boots (< ₹2,500)
  {
    id: 'bt-1',
    name: 'Urban Desert Suede Boot',
    price: 2299,
    category: 'Boots',
    tier: 'Budget',
    brand: 'StepStyle',
    description: 'Ankle-high desert chukka boot with textured faux suede upper and flexible thermoplastic rubber outsole.',
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80',
    rating: 4.4,
    reviews: 85
  },

  // Mid-Range Boots (₹2,500 - ₹7,999)
  {
    id: 'bt-2',
    name: 'Woodland Khaki High-Ankle',
    price: 5995,
    category: 'Boots',
    tier: 'Mid-Range',
    brand: 'Woodland',
    description: 'Heavy-duty trekking and outdoor high-ankle nubuck boots with deep lug rubber outsoles for superior terrain grip.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.7,
    reviews: 310
  },
  {
    id: 'bt-3',
    name: 'Chelsea Classic Suede',
    price: 6799,
    category: 'Boots',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Timeless Chelsea silhouette with elastic side gussets and rich oil-waxed suede upper that patinas gracefully over time.',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
    rating: 4.8,
    reviews: 195
  },
  {
    id: 'bt-4',
    name: 'Desert Chukkas Vintage Crepe',
    price: 4999,
    category: 'Boots',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Iconic two-eyelet desert chukka boots with soft crepe soles and natural sand suede finish for laid-back weekend style.',
    image: 'https://images.unsplash.com/photo-1520639889313-7272a74b1c73?w=800&q=80',
    rating: 4.6,
    reviews: 110
  },
  {
    id: 'bt-5',
    name: 'Combat Urban Tactical Zip',
    price: 7999,
    category: 'Boots',
    tier: 'Mid-Range',
    brand: 'StepStyle',
    description: 'Military-grade zip-and-lace combat boots built with reinforced toe caps and water-resistant ballistic nylon side panels.',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
    rating: 4.7,
    reviews: 140
  },

  // Costly / Premium Boots (₹8,000+)
  {
    id: 'bt-6',
    name: 'Rugged Explorer 6-Inch Waterproof',
    price: 13999,
    category: 'Boots',
    tier: 'Costly',
    brand: 'Timberland',
    description: 'Original waterproof yellow boot built from premium Nubuck leather with seam-sealed construction and PrimaLoft insulation.',
    image: 'https://images.unsplash.com/photo-1520639889313-7272a74b1c73?w=800&q=80',
    rating: 4.9,
    reviews: 410
  },
  {
    id: 'bt-7',
    name: 'Heritage Goodyear Welted Chelsea',
    price: 17499,
    category: 'Boots',
    tier: 'Costly',
    brand: 'Timberland',
    description: 'Re-craftable Goodyear welt construction with Horween Chromexcel leather and studded Vibram rubber outsole.',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
    rating: 4.9,
    reviews: 160
  }
];

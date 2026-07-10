import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id')) {
  console.error("Error: Please set valid PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or PUBLIC_SUPABASE_ANON_KEY) environment variables in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categoriesData = [
  {
    name: 'Modern Menswear',
    slug: 'menswear',
    description: 'Stylish apparel for the modern man.',
    image_url: '/shop/assets/img/product/product-m-8.webp'
  },
  {
    name: 'Everyday Essentials',
    slug: 'essentials',
    description: 'Your everyday home and lifestyle essentials.',
    image_url: '/shop/assets/img/product/product-f-12.webp'
  },
  {
    name: 'Beauty Rituals',
    slug: 'beauty',
    description: 'Skincare, cosmetics, and self-care products.',
    image_url: '/shop/assets/img/product/product-f-3.webp'
  },
  {
    name: 'Travel Gear',
    slug: 'travel',
    description: 'Bags, accessories, and luggage for your journeys.',
    image_url: '/shop/assets/img/product/product-m-11.webp'
  }
];

const productsData = [
  {
    name: 'Ergonomic Desk Lamp',
    slug: 'ergonomic-desk-lamp',
    description: 'Adjustable LED desk lamp with 5 color modes and 10 brightness levels. Ideal for studying, reading, and working.',
    price: 64.00,
    sale_price: null,
    images: ['/shop/assets/img/product/product-5.webp'],
    category_slug: 'essentials',
    stock: 12,
    sku: 'LAMP-ERG-01',
    is_featured: true,
    specs: { Color: 'Matte Black', Material: 'Aluminum', Power: '10W' }
  },
  {
    name: 'Ceramic Aroma Diffuser',
    slug: 'ceramic-aroma-diffuser',
    description: 'Handcrafted ceramic ultrasonic diffuser. Disperses essential oils to elevate your space with aromatherapy.',
    price: 165.00,
    sale_price: 220.00,
    images: ['/shop/assets/img/product/product-8.webp'],
    category_slug: 'essentials',
    stock: 5,
    sku: 'DIFF-CER-02',
    is_featured: true,
    specs: { Material: 'Ceramic', Capacity: '100ml', LED: '7 Colors' }
  },
  {
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    description: 'High-fidelity audio wireless earbuds with active noise cancellation and IPX7 sweatproof rating.',
    price: 89.00,
    sale_price: null,
    images: ['/shop/assets/img/product/product-11.webp'],
    category_slug: 'travel',
    stock: 24,
    sku: 'EAR-WRL-03',
    is_featured: true,
    specs: { Bluetooth: '5.3', Battery: 'Up to 30h', ANC: 'Yes' }
  },
  {
    name: 'Minimalist Wall Clock',
    slug: 'minimalist-wall-clock',
    description: 'Silent, non-ticking wooden wall clock. Minimalist Scandinavian style that matches any home decor.',
    price: 199.00,
    sale_price: null,
    images: ['/shop/assets/img/product/product-2.webp'],
    category_slug: 'essentials',
    stock: 3,
    sku: 'CLK-MIN-04',
    is_featured: true,
    specs: { Diameter: '30cm', Material: 'Oak Wood', Movement: 'Silent Quartz' }
  },
  {
    name: 'Urban Tech Backpack',
    slug: 'urban-tech-backpack',
    description: 'Water-resistant laptop backpack with built-in USB charging port. Spacious compartments for tech gear.',
    price: 89.00,
    sale_price: 120.00,
    images: ['/shop/assets/img/product/product-1.webp'],
    category_slug: 'travel',
    stock: 18,
    sku: 'BP-URB-05',
    is_featured: true,
    specs: { Capacity: '25L', Fit: '15.6" Laptop', Waterproof: 'Yes' }
  },
  {
    name: 'Precision Audio Hub',
    slug: 'precision-audio-hub',
    description: 'Multi-functional desktop DAC and headphone amplifier. Delivers crisp, studio-grade sound quality.',
    price: 219.00,
    sale_price: 299.00,
    images: ['/shop/assets/img/product/product-6.webp'],
    category_slug: 'travel',
    stock: 4,
    sku: 'DAC-HUB-06',
    is_featured: true,
    specs: { Input: 'USB/Coaxial/Opt', Output: '6.35mm/RCA', Res: '32-bit/384kHz' }
  },
  {
    name: 'Woven Tote Handbag',
    slug: 'woven-tote-handbag',
    description: 'A beautifully crafted woven tote handbag, perfect for everyday use.',
    price: 89.00,
    sale_price: null,
    images: ['/shop/assets/img/product/product-5.webp'],
    category_slug: 'essentials',
    stock: 18,
    sku: 'BAG-WOV-07',
    is_featured: true,
    specs: { Color: 'Beige', Material: 'Woven Straw' }
  },
  {
    name: 'Slim Fit Denim Jacket',
    slug: 'slim-fit-denim-jacket',
    description: 'A stylish and comfortable slim fit denim jacket.',
    price: 145.00,
    sale_price: null,
    images: ['/shop/assets/img/product/product-8.webp'],
    category_slug: 'menswear',
    stock: 42,
    sku: 'JKT-DNM-08',
    is_featured: true,
    specs: { Color: 'Indigo', Material: 'Denim', Fit: 'Slim Fit' }
  }
];

async function seed() {
  console.log("Seeding categories...");
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .upsert(categoriesData, { onConflict: 'slug' })
    .select();

  if (catError) {
    console.error("Failed to seed categories:", catError);
    return;
  }
  console.log(`Successfully seeded ${categories.length} categories.`);

  // Create a map from slug to id
  const categoryMap = {};
  categories.forEach(c => {
    categoryMap[c.slug] = c.id;
  });

  console.log("Seeding products...");
  const finalProductsData = productsData.map(p => {
    const { category_slug, ...rest } = p;
    return {
      ...rest,
      category_id: categoryMap[category_slug]
    };
  });

  const { data: products, error: prodError } = await supabase
    .from('products')
    .upsert(finalProductsData, { onConflict: 'slug' })
    .select();

  if (prodError) {
    console.error("Failed to seed products:", prodError);
    return;
  }
  console.log(`Successfully seeded ${products.length} products.`);
  console.log("Database seed complete!");
}

seed();

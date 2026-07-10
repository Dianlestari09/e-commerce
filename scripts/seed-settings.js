import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id')) {
  console.error("Error: Please set valid PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const homepageData = {
  hero: {
    badge_label: "Curated Selection",
    headline: "Discover What Defines Modern Living",
    subtext: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel.",
    btn_primary_text: "Browse Items",
    btn_primary_link: "/category",
    btn_ghost_text: "See All Categories",
    btn_ghost_link: "/category",
    tile1: {
      badge: "Best Seller",
      name: "Precision Audio Hub",
      price: 219,
      original_price: 299,
      image: "/shop/assets/img/product/product-6.webp"
    },
    tile2: {
      badge: "Trending Now",
      name: "Smart Wearable Pro",
      price: 159,
      original_price: 229,
      image: "/shop/assets/img/product/product-3.webp"
    },
    tile3: {
      badge: "Just Launched",
      name: "Essential Daily Companion",
      desc: "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus curabitur.",
      price: 99,
      original_price: 149,
      image: "/shop/assets/img/product/product-10.webp"
    }
  },
  promo: {
    image: "/shop/assets/img/product/product-showcase-2.webp",
    tag: "New Season",
    title: "Winter Lookbook",
    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae ultricies eget.",
    bullets: [
      "Curated seasonal selections",
      "Exclusive online availability",
      "Complimentary shipping included"
    ],
    btn_text: "Explore Collection",
    btn_link: "/category"
  },
  best_sellers: {
    title: "Best Sellers",
    subtitle: "Featured items hand-picked for their premium quality and popularity."
  },
  trust_indicators: {
    item1: { icon: "bi-truck", text: "Free Shipping" },
    item2: { icon: "bi-shield-check", text: "Verified Quality" },
    item3: { icon: "bi-arrow-return-left", text: "Easy Returns" },
    item4: { icon: "bi-chat-dots", text: "24/7 Support" }
  }
};

const layoutData = {
  utility_promo_text: "Free delivery on orders over $75",
  footer_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh vehicula, facilisis magna ut, consectetur lorem.",
  contact_address: "123 Fashion Street, New York, NY 10001",
  contact_phone: "+1 (555) 123-4567",
  contact_email: "hello@example.com",
  newsletter_title: "Join Our Newsletter",
  newsletter_desc: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals."
};

async function seedSettings() {
  console.log("Creating/seeding default site settings in Supabase...");

  const settingsToUpsert = [
    { key: 'homepage', value: homepageData },
    { key: 'layout', value: layoutData }
  ];

  const { data, error } = await supabase
    .from('site_settings')
    .upsert(settingsToUpsert, { onConflict: 'key' })
    .select();

  if (error) {
    console.error("Failed to seed site settings. Make sure you have run the database migration (created site_settings table) in Supabase.");
    console.error("Details:", error);
    return;
  }

  console.log("Successfully seeded site settings!");
  console.log("Data seeded:", data);
}

seedSettings();

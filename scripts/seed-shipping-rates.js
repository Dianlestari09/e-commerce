import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function seedShippingRates() {
  console.log("Seeding default shipping rates to Supabase...");
  
  const defaultRates = [
    { province: 'Jawa Timur', rate: 10.00 },
    { province: 'Jawa Barat', rate: 12.00 },
    { province: 'DKI Jakarta', rate: 15.00 },
    { province: 'Jawa Tengah', rate: 11.00 },
    { province: 'Banten', rate: 13.00 },
    { province: 'Bali', rate: 20.00 }
  ];

  for (const item of defaultRates) {
    const { data, error } = await supabaseAdmin
      .from('shipping_rates')
      .upsert(item, { onConflict: 'province' })
      .select();

    if (error) {
      console.error(`Failed to seed rate for ${item.province}:`, error.message);
    } else {
      console.log(`Seeded: ${item.province} -> $${item.rate.toFixed(2)}`);
    }
  }

  console.log("Shipping rates seeding completed!");
}

seedShippingRates();

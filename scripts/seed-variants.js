import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function seedVariants() {
  console.log("Fetching all products...");
  const { data: products, error: fetchError } = await supabaseAdmin
    .from('products')
    .select('id, name');

  if (fetchError || !products) {
    console.error("Failed to fetch products:", fetchError?.message);
    return;
  }

  const defaultColors = ['Biru', 'Hijau', 'Hitam', 'Merah', 'Putih'];
  const defaultSizes = ['L', 'M', 'S', 'XL'];

  console.log(`Seeding variants for ${products.length} products...`);

  for (const product of products) {
    console.log(`Processing product: ${product.name}`);

    // Update product colors and sizes list
    const { error: updateProdError } = await supabaseAdmin
      .from('products')
      .update({
        colors: defaultColors,
        sizes: defaultSizes
      })
      .eq('id', product.id);

    if (updateProdError) {
      console.error(`Failed to update colors/sizes list for ${product.name}:`, updateProdError.message);
      continue;
    }

    // Delete existing variants for safety
    await supabaseAdmin
      .from('product_variants')
      .delete()
      .eq('product_id', product.id);

    // Generate Cartesian product combinations
    const variantRows = [];
    defaultColors.forEach(color => {
      defaultSizes.forEach(size => {
        variantRows.push({
          product_id: product.id,
          color,
          size,
          stock: 15 // Seed 15 items for each color-size variant
        });
      });
    });

    // Insert new variants
    const { error: insertVarError } = await supabaseAdmin
      .from('product_variants')
      .insert(variantRows);

    if (insertVarError) {
      console.error(`Failed to insert variants for ${product.name}:`, insertVarError.message);
      continue;
    }

    // Sum up variant stock and update products table
    const totalStock = variantRows.reduce((sum, v) => sum + v.stock, 0);
    const { error: finalStockError } = await supabaseAdmin
      .from('products')
      .update({ stock: totalStock })
      .eq('id', product.id);

    if (finalStockError) {
      console.error(`Failed to update sum stock for ${product.name}:`, finalStockError.message);
    } else {
      console.log(`Seeded: ${product.name} -> ${variantRows.length} variants (Total Stock: ${totalStock})`);
    }
  }

  console.log("Variants seeding completed!");
}

seedVariants();

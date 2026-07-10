import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('your-project-id')) {
  console.error("Error: Please set valid PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const email = 'admin@shopwise.com';
  const password = 'adminpassword123';
  
  console.log(`Creating default admin user (${email})...`);
  
  // Use admin api to create the user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: 'Super Admin',
      phone: '08123456789',
      role: 'super_admin',
      shipping_address: 'EasyAdmin Headquarters'
    }
  });

  if (error) {
    console.error("Failed to create admin:", error.message);
    return;
  }

  console.log(`\n======================================`);
  console.log(`SUCCESS: Admin account created!`);
  console.log(`Email   : ${email}`);
  console.log(`Password: ${password}`);
  console.log(`======================================\n`);
}

createAdmin();

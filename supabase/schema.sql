-- Skema Database E-Commerce (ShopWise + EasyAdmin)

-- 1. Tabel Profil Pengguna (Koneksi ke auth.users Supabase)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  shipping_address text,
  billing_address text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Helper function untuk mengecek apakah user saat ini adalah admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Mengaktifkan Row Level Security (RLS) pada tabel profiles
alter table public.profiles enable row level security;

create policy "Profil dapat dibaca oleh pemilik atau admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Profil dapat diperbarui oleh pemilik atau admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- Trigger otomatis saat user baru daftar
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, shipping_address, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'shipping_address', ''),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Buat trigger jika belum ada
do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  end if;
end;
$$;


-- 2. Tabel Kategori Produk
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Kategori dapat dibaca publik"
  on public.categories for select
  using (true);

create policy "Kategori hanya dapat dimodifikasi oleh admin"
  on public.categories for all
  using (public.is_admin());


-- 3. Tabel Produk
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null,
  sale_price numeric(10,2),
  sku text unique,
  stock integer default 0,
  images text[],
  is_featured boolean default false,
  specs jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

create policy "Produk dapat dibaca publik"
  on public.products for select
  using (true);

create policy "Produk hanya dapat dimodifikasi oleh admin"
  on public.products for all
  using (public.is_admin());


-- 4. Tabel Pesanan (Orders)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'completed', 'cancelled')),
  total_amount numeric(10,2) not null,
  shipping_address text not null,
  billing_address text,
  payment_method text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

create policy "Customer dapat melihat pesanan mereka sendiri"
  on public.orders for select
  using (auth.uid() = customer_id or public.is_admin());

create policy "Customer dapat membuat pesanan baru"
  on public.orders for insert
  with check (auth.uid() = customer_id or customer_id is null);

create policy "Hanya admin yang dapat memodifikasi pesanan"
  on public.orders for all
  using (public.is_admin());


-- 5. Tabel Item Pesanan (Order Items)
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null
);

alter table public.order_items enable row level security;

create policy "Customer dapat melihat rincian item pesanan mereka"
  on public.order_items for select
  using (exists (
    select 1 from public.orders o
    where o.id = order_id and (o.customer_id = auth.uid() or public.is_admin())
  ));

create policy "Customer dapat menambahkan item ke pesanan"
  on public.order_items for insert
  with check (true);

create policy "Hanya admin yang dapat memodifikasi detail item pesanan"
  on public.order_items for all
  using (public.is_admin());

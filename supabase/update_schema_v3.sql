-- SQL Migration to update schema for:
-- 1. Customer Addresses Book
-- 2. Product Variants Stock Inventory

-- 1. Customer Addresses Book Table
create table if not exists public.customer_addresses (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid not null references auth.users(id) on delete cascade,
  label text not null, -- e.g. 'Rumah', 'Kantor', 'Apartemen'
  recipient_name text not null,
  phone text not null,
  street text not null,
  province text not null,
  city text not null,
  zip text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on customer_addresses
alter table public.customer_addresses enable row level security;

-- RLS policies for customer_addresses
drop policy if exists "Users can manage their own addresses" on public.customer_addresses;
create policy "Users can manage their own addresses"
  on public.customer_addresses for all
  using (auth.uid() = customer_id);

-- 2. Product Variants Stock Inventory Table
create table if not exists public.product_variants (
  id uuid default gen_random_uuid() primary key,
  product_id uuid not null references public.products(id) on delete cascade,
  color text,
  size text,
  stock integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Unique index constraints to avoid duplicate variant combinations per product
create unique index if not exists product_variants_unique_idx on public.product_variants (product_id, coalesce(color, ''), coalesce(size, ''));

-- Enable RLS on product_variants
alter table public.product_variants enable row level security;

-- RLS policies for product_variants
drop policy if exists "Product variants dapat dibaca publik" on public.product_variants;
create policy "Product variants dapat dibaca publik"
  on public.product_variants for select
  using (true);

drop policy if exists "Product variants hanya dapat dimodifikasi oleh admin" on public.product_variants;
create policy "Product variants hanya dapat dimodifikasi oleh admin"
  on public.product_variants for all
  using (public.is_admin());

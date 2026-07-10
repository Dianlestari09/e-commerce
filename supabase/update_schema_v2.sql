-- SQL Migration to update schema for:
-- 1. Product color and size options
-- 2. Shipping fee by province
-- 3. Payment proof screenshot confirmation
-- 4. Fix is_admin() to include 'super_admin'

-- Update public.is_admin() function to support both 'admin' and 'super_admin' roles
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles 
    where id = auth.uid() and role in ('admin', 'super_admin')
  );
end;
$$ language plpgsql security definer;

-- 1. Product color and size array options
alter table public.products add column if not exists colors text[];
alter table public.products add column if not exists sizes text[];

-- 2. Order shipping fee & province columns, plus payment proof url
alter table public.orders add column if not exists province text;
alter table public.orders add column if not exists shipping_fee numeric(10,2) default 0.00;
alter table public.orders add column if not exists payment_proof_url text;

-- 3. Order items variation selections
alter table public.order_items add column if not exists selected_color text;
alter table public.order_items add column if not exists selected_size text;

-- 4. Create shipping_rates table
create table if not exists public.shipping_rates (
  id uuid default gen_random_uuid() primary key,
  province text not null unique,
  rate numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on shipping_rates
alter table public.shipping_rates enable row level security;

-- Create policies for shipping_rates
drop policy if exists "Shipping rates dapat dibaca publik" on public.shipping_rates;
create policy "Shipping rates dapat dibaca publik"
  on public.shipping_rates for select
  using (true);

drop policy if exists "Shipping rates hanya dapat dimodifikasi oleh admin" on public.shipping_rates;
create policy "Shipping rates hanya dapat dimodifikasi oleh admin"
  on public.shipping_rates for all
  using (public.is_admin());

-- 5. Setup Storage Bucket for payment-proofs
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', true)
on conflict (id) do nothing;

-- Add RLS policies for storage bucket
drop policy if exists "Public Access to Payment Proofs" on storage.objects;
create policy "Public Access to Payment Proofs"
  on storage.objects for select
  using (bucket_id = 'payment-proofs');

drop policy if exists "Allow Upload of Payment Proofs" on storage.objects;
create policy "Allow Upload of Payment Proofs"
  on storage.objects for insert
  with check (bucket_id = 'payment-proofs');

-- Also allow update/delete in storage for admin
drop policy if exists "Admin Modify Payment Proofs" on storage.objects;
create policy "Admin Modify Payment Proofs"
  on storage.objects for all
  using (bucket_id = 'payment-proofs' and public.is_admin());

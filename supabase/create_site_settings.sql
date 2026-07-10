-- SQL Script to create site_settings table for dynamic homepage & layout management

-- 1. Create table site_settings
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.site_settings enable row level security;

-- 3. Create public read access policy
drop policy if exists "Site settings dapat dibaca publik" on public.site_settings;
create policy "Site settings dapat dibaca publik"
  on public.site_settings for select
  using (true);

-- 4. Create super admin modify access policy
drop policy if exists "Site settings hanya dapat dimodifikasi oleh super admin" on public.site_settings;
create policy "Site settings hanya dapat dimodifikasi oleh super admin"
  on public.site_settings for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

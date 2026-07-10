-- SQL script untuk mengizinkan role 'super_admin' dan memperbarui user admin default

-- 1. Hapus constraint lama jika ada (biasanya bernama profiles_role_check)
alter table public.profiles drop constraint if exists profiles_role_check;

-- 2. Tambahkan constraint baru yang mengizinkan 'customer', 'admin', dan 'super_admin'
alter table public.profiles add constraint profiles_role_check check (role in ('customer', 'admin', 'super_admin'));

-- 3. Perbarui role akun admin default saat ini menjadi 'super_admin'
update public.profiles 
set role = 'super_admin' 
where full_name = 'Super Admin';

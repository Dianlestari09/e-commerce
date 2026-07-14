-- ============================================================
-- MIGRATION: Update author_name to Dian Lestari Kurniawati
-- ============================================================

-- 1. Ubah nilai default kolom author_name untuk data baru di masa depan
ALTER TABLE public.articles 
ALTER COLUMN author_name SET DEFAULT 'Dian Lestari Kurniawati';

-- 2. Update nama penulis untuk artikel yang sudah ada di database
UPDATE public.articles 
SET author_name = 'Dian Lestari Kurniawati';

-- 3. Update nama penulis di dalam kode JSON-LD schema (bila ada)
UPDATE public.articles 
SET schema_code = replace(schema_code, 'ShopWise Team', 'Dian Lestari Kurniawati')
WHERE schema_code IS NOT NULL;

-- ============================================================
-- MIGRATION: Create articles table for blog/content feature
-- ============================================================

-- 1. Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title         text NOT NULL,
  slug          text NOT NULL UNIQUE,
  excerpt       text,
  content       text,
  cover_image   text,
  author_name   text DEFAULT 'Dian Lestari Kurniawati',
  category      text DEFAULT 'tips',
  tags          text[],
  status        text NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  -- SEO fields
  meta_title       text,
  meta_description text,
  -- Custom JSON-LD schema code (admin can paste full schema here)
  schema_code   text,
  published_at  timestamp with time zone,
  created_at    timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at    timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Public can read published articles
DROP POLICY IF EXISTS "Articles published dapat dibaca publik" ON public.articles;
CREATE POLICY "Articles published dapat dibaca publik"
  ON public.articles FOR SELECT
  USING (status = 'published');

-- Admin can do everything
DROP POLICY IF EXISTS "Admin dapat mengelola semua artikel" ON public.articles;
CREATE POLICY "Admin dapat mengelola semua artikel"
  ON public.articles FOR ALL
  USING (public.is_admin());

-- 4. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON public.articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_articles_updated_at();

-- ============================================================
-- 5. Insert 6 sample articles
-- ============================================================

INSERT INTO public.articles (
  title, slug, excerpt, content, cover_image, author_name, category, tags,
  status, meta_title, meta_description, schema_code, published_at
) VALUES

-- Article 1
(
  '10 Tips Memilih Produk Rumah Tangga Berkualitas',
  '10-tips-memilih-produk-rumah-tangga-berkualitas',
  'Panduan lengkap memilih produk rumah tangga yang tahan lama, efisien, dan sesuai kebutuhan keluarga Anda tanpa harus menguras kantong.',
  '<h2>Mengapa Pilihan Produk Rumah Tangga Itu Penting?</h2>
<p>Produk rumah tangga adalah investasi jangka panjang. Memilih produk yang tepat bisa menghemat waktu, energi, dan tentu saja uang Anda dalam jangka panjang.</p>
<h2>1. Perhatikan Material dan Durabilitas</h2>
<p>Material produk sangat menentukan seberapa lama produk tersebut bisa bertahan. Untuk peralatan dapur, pilih stainless steel food-grade. Untuk perabot, pilih bahan yang tahan lembab dan mudah dibersihkan.</p>
<h2>2. Cek Sertifikasi dan Standar Keamanan</h2>
<p>Pastikan produk yang Anda beli telah mendapatkan sertifikasi dari lembaga yang terpercaya. Di Indonesia, perhatikan label SNI (Standar Nasional Indonesia) dan sertifikasi BPOM untuk produk yang bersentuhan langsung dengan makanan.</p>
<h2>3. Baca Ulasan dari Pembeli Lain</h2>
<p>Ulasan pembeli adalah sumber informasi yang sangat berharga. Perhatikan ulasan yang detail mengenai penggunaan jangka panjang, bukan hanya kesan pertama saat unboxing.</p>
<h2>4. Bandingkan Harga dari Beberapa Toko</h2>
<p>Jangan langsung terburu-buru membeli di tempat pertama yang Anda temukan. Bandingkan harga dari beberapa marketplace dan toko online untuk mendapatkan deal terbaik.</p>
<h2>5. Perhatikan Garansi Produk</h2>
<p>Produk berkualitas biasanya dilengkapi dengan garansi yang jelas. Garansi minimal 1 tahun adalah standar yang wajar untuk produk elektronik rumah tangga.</p>
<h2>6. Sesuaikan dengan Kebutuhan Aktual</h2>
<p>Jangan tergiur fitur yang terdengar canggih namun tidak benar-benar Anda butuhkan. Fokus pada fungsi utama yang akan sering Anda gunakan sehari-hari.</p>
<h2>7. Pertimbangkan Konsumsi Energi</h2>
<p>Untuk produk elektronik, perhatikan rating konsumsi energi (watt). Produk hemat energi mungkin lebih mahal di awal, namun akan menghemat tagihan listrik bulanan Anda.</p>
<h2>8. Pilih Brand dengan After-Sales Service Baik</h2>
<p>Kemudahan mendapatkan servis dan suku cadang adalah hal yang sering diabaikan. Pastikan brand yang Anda pilih memiliki service center yang mudah diakses.</p>
<h2>9. Pertimbangkan Estetika dan Desain</h2>
<p>Produk yang indah secara estetika akan membuat rumah Anda terasa lebih menyenangkan. Pilih desain yang selaras dengan tema interior rumah Anda.</p>
<h2>10. Jangan Lupakan Kemudahan Perawatan</h2>
<p>Produk yang sulit dibersihkan atau dirawat akan menjadi beban tersendiri. Pilih produk dengan desain yang memudahkan proses pembersihan dan perawatan rutin.</p>
<h2>Kesimpulan</h2>
<p>Memilih produk rumah tangga yang tepat memerlukan pertimbangan yang matang. Dengan mengikuti 10 tips di atas, Anda bisa mendapatkan produk yang tidak hanya sesuai budget namun juga memberikan value terbaik untuk keluarga Anda.</p>',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
  'ShopWise Team',
  'tips',
  ARRAY['rumah tangga', 'tips belanja', 'kualitas produk', 'panduan'],
  'published',
  '10 Tips Memilih Produk Rumah Tangga Berkualitas | ShopWise Blog',
  'Panduan lengkap memilih produk rumah tangga yang tahan lama, efisien, dan sesuai kebutuhan keluarga tanpa menguras kantong. Tips dari para ahli ShopWise.',
  '{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Tips Memilih Produk Rumah Tangga Berkualitas",
  "description": "Panduan lengkap memilih produk rumah tangga yang tahan lama, efisien, dan sesuai kebutuhan keluarga.",
  "author": {"@type": "Organization", "name": "ShopWise Team"},
  "publisher": {"@type": "Organization", "name": "ShopWise", "logo": {"@type": "ImageObject", "url": "/shop/assets/img/favicon.png"}},
  "datePublished": "2026-07-01",
  "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
}',
  NOW() - INTERVAL '13 days'
),

-- Article 2
(
  'Tren Produk Teknologi Terpopuler 2026 yang Wajib Kamu Punya',
  'tren-produk-teknologi-terpopuler-2026',
  'Dari smartwatch generasi terbaru hingga speaker pintar, inilah daftar gadget dan produk teknologi 2026 yang sedang ramai diperbincangkan.',
  '<h2>Teknologi yang Mengubah Cara Kita Hidup di 2026</h2>
<p>Tahun 2026 menjadi tahun yang penuh inovasi di dunia teknologi konsumen. Para produsen berlomba-lomba menghadirkan produk yang semakin pintar, lebih efisien, dan lebih terintegrasi dengan kehidupan sehari-hari.</p>
<h2>1. Smartwatch dengan Fitur Kesehatan Advanced</h2>
<p>Smartwatch generasi terbaru kini tidak hanya bisa memantau detak jantung, namun juga mampu mendeteksi kadar gula darah, tekanan darah, dan bahkan melakukan analisis stres secara real-time. Teknologi sensor non-invasif semakin canggih dan akurat.</p>
<h2>2. True Wireless Earbuds dengan AI Noise Cancellation</h2>
<p>Earbuds TWS (True Wireless Stereo) kini dilengkapi dengan chip AI yang mampu secara cerdas membedakan suara lingkungan yang perlu diblokir dan yang perlu dibiarkan masuk, seperti suara kendaraan untuk keamanan saat berkendara.</p>
<h2>3. Smart Home Hub yang Semakin Terintegrasi</h2>
<p>Ekosistem smart home semakin matang di 2026. Satu hub kini mampu mengontrol ratusan perangkat dari berbagai merek berbeda berkat standar Matter yang semakin diadopsi secara luas.</p>
<h2>4. Laptop Tipis dengan Chip AI Bawaan</h2>
<p>Era NPU (Neural Processing Unit) bawaan telah tiba. Laptop-laptop terbaru hadir dengan chip yang dioptimasi untuk menjalankan model AI secara lokal tanpa perlu koneksi internet, memberikan privasi dan performa yang lebih baik.</p>
<h2>5. Kamera Mirrorless Compact untuk Kreator Konten</h2>
<p>Kamera mirrorless berukuran kecil namun bertenaga penuh semakin digemari oleh kreator konten dan vlogger. Fitur autofokus berbasis AI dan stabilisasi gambar yang canggih membuatnya ideal untuk penggunaan mobile.</p>
<h2>Kesimpulan</h2>
<p>Dunia teknologi 2026 menawarkan banyak pilihan menarik. Sesuaikan pilihan dengan kebutuhan dan budget Anda. ShopWise hadir untuk membantu Anda menemukan produk teknologi terbaik dengan harga yang kompetitif.</p>',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
  'Tim Teknologi ShopWise',
  'review',
  ARRAY['teknologi', 'gadget', 'smartwatch', 'tren 2026', 'laptop'],
  'published',
  'Tren Produk Teknologi Terpopuler 2026 | ShopWise Blog',
  'Daftar gadget dan produk teknologi 2026 yang wajib dimiliki, dari smartwatch canggih hingga laptop AI. Review lengkap dari ShopWise.',
  '{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tren Produk Teknologi Terpopuler 2026 yang Wajib Kamu Punya",
  "description": "Daftar gadget dan produk teknologi 2026 yang sedang ramai diperbincangkan.",
  "author": {"@type": "Organization", "name": "Tim Teknologi ShopWise"},
  "publisher": {"@type": "Organization", "name": "ShopWise"},
  "datePublished": "2026-07-03"
}',
  NOW() - INTERVAL '11 days'
),

-- Article 3
(
  'Panduan Lengkap Merawat Peralatan Dapur agar Tahan Lama',
  'panduan-merawat-peralatan-dapur',
  'Peralatan dapur yang dirawat dengan benar bisa bertahan puluhan tahun. Pelajari cara membersihkan dan menyimpan peralatan dapur Anda dengan tepat.',
  '<h2>Investasi Peralatan Dapur yang Cerdas</h2>
<p>Peralatan dapur berkualitas adalah investasi yang worth it jika Anda tahu cara merawatnya dengan benar. Dengan perawatan yang tepat, wajan cast iron bisa diwariskan ke generasi berikutnya!</p>
<h2>Merawat Pisau Dapur</h2>
<p>Pisau adalah salah satu peralatan dapur terpenting. Selalu cuci pisau dengan tangan, jangan masukkan ke mesin cuci piring karena dapat merusak bilah. Simpan di magnetic strip atau block kayu, bukan di laci yang campur aduk dengan peralatan lain.</p>
<p>Asah pisau secara rutin menggunakan whetstone. Pisau yang tajam justru lebih aman karena membutuhkan tenaga yang lebih sedikit saat memotong.</p>
<h2>Merawat Wajan Anti Lengket</h2>
<p>Wajan anti lengket (teflon) memerlukan perawatan ekstra. Hindari menggunakan spatula atau alat masak berbahan logam yang bisa menggores lapisan. Gunakan api kecil hingga sedang, dan biarkan wajan dingin sebelum dicuci.</p>
<h2>Merawat Peralatan Stainless Steel</h2>
<p>Stainless steel relatif mudah dirawat, namun hindari merendam terlalu lama karena bisa meninggalkan water spots. Gunakan pembersih khusus stainless steel untuk menghilangkan noda membandel dan menjaga kilap permukaannya.</p>
<h2>Merawat Cutting Board</h2>
<p>Cutting board kayu perlu dirawat dengan mineral oil secara berkala agar tidak retak dan menghindari pertumbuhan bakteri. Cutting board plastik bisa dicuci di mesin cuci piring dengan air panas untuk sterilisasi.</p>
<h2>Tips Penyimpanan yang Benar</h2>
<ul>
<li>Tumpuk panci dengan lapisan pelindung di antara keduanya</li>
<li>Gantung wajan daripada menumpuknya</li>
<li>Simpan pisau terpisah dari peralatan lain</li>
<li>Pastikan semua peralatan benar-benar kering sebelum disimpan</li>
</ul>',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
  'ShopWise Kitchen Expert',
  'tips',
  ARRAY['dapur', 'perawatan', 'peralatan masak', 'tips'],
  'published',
  'Panduan Lengkap Merawat Peralatan Dapur agar Tahan Lama | ShopWise',
  'Cara merawat pisau, wajan, dan peralatan dapur lainnya agar awet bertahun-tahun. Panduan lengkap dari ShopWise Kitchen Expert.',
  NULL,
  NOW() - INTERVAL '9 days'
),

-- Article 4
(
  'Review: 5 Smart Speaker Terbaik untuk Rumah Anda di 2026',
  'review-5-smart-speaker-terbaik-2026',
  'Kami telah menguji 5 smart speaker populer selama 30 hari. Berikut hasil review jujur kami tentang kualitas suara, fitur, dan nilai uangnya.',
  '<h2>Metodologi Review</h2>
<p>Kami menguji kelima smart speaker ini selama 30 hari penuh dalam kondisi penggunaan nyata di rumah. Penilaian mencakup kualitas suara, akurasi voice assistant, konektivitas, dan kemudahan setup.</p>
<h2>1. Echo Studio (Gen 3) — ⭐⭐⭐⭐⭐</h2>
<p><strong>Harga:</strong> ~Rp 2.500.000</p>
<p>Echo Studio generasi ketiga hadir dengan pembaruan signifikan pada sistem audio. Spatial audio yang dimuat kini terasa jauh lebih imersif. Kualitas bass dan treble seimbang sempurna, cocok untuk ruangan berukuran sedang hingga besar.</p>
<p><strong>Kelebihan:</strong> Kualitas suara terbaik di kelasnya, integrasi ekosistem yang luas<br>
<strong>Kekurangan:</strong> Memerlukan ekosistem Amazon untuk fitur penuh</p>
<h2>2. Google Nest Audio Pro — ⭐⭐⭐⭐½</h2>
<p><strong>Harga:</strong> ~Rp 2.100.000</p>
<p>Google Nest Audio Pro unggul dalam voice recognition, terutama di lingkungan yang berisik. Assistant Google yang terintegrasi memberikan jawaban yang lebih natural dan akurat dibanding kompetitor.</p>
<h2>3. Apple HomePod (Gen 3) — ⭐⭐⭐⭐½</h2>
<p><strong>Harga:</strong> ~Rp 4.200.000</p>
<p>Untuk pengguna ekosistem Apple, HomePod generasi tiga adalah pilihan terbaik. Kualitas suara premium dan integrasi seamless dengan iPhone, iPad, dan Apple TV menjadi nilai jual utamanya.</p>
<h2>4. Sonos Era 300 — ⭐⭐⭐⭐</h2>
<p><strong>Harga:</strong> ~Rp 5.800.000</p>
<p>Sonos Era 300 adalah pilihan audiophile yang ingin pengalaman surround sound terbaik. Dukungan Dolby Atmos Music memberikan pengalaman mendengarkan yang benar-benar imersif.</p>
<h2>5. Xiaomi Sound Pro — ⭐⭐⭐½</h2>
<p><strong>Harga:</strong> ~Rp 850.000</p>
<p>Untuk segmen budget, Xiaomi Sound Pro menawarkan value yang sangat baik. Kualitas suara memuaskan untuk ukurannya, dan kompatibel dengan asisten Google dan Amazon Alexa.</p>
<h2>Verdict</h2>
<p>Pilihan terbaik tergantung ekosistem yang Anda gunakan. Jika Anda pengguna Android, Echo Studio atau Google Nest Audio Pro adalah pilihan utama. Pengguna Apple wajib mempertimbangkan HomePod. Untuk budget terbatas, Xiaomi Sound Pro adalah jawabannya.</p>',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  'Tim Review ShopWise',
  'review',
  ARRAY['smart speaker', 'review', 'audio', 'teknologi rumah', 'amazon echo', 'google nest'],
  'published',
  'Review 5 Smart Speaker Terbaik 2026 | ShopWise Blog',
  'Review jujur 5 smart speaker terpopuler 2026: Echo Studio, Google Nest Audio, Apple HomePod, Sonos Era 300, dan Xiaomi Sound Pro. Mana yang terbaik?',
  '{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Review: 5 Smart Speaker Terbaik untuk Rumah Anda di 2026",
  "reviewBody": "Kami telah menguji 5 smart speaker populer selama 30 hari.",
  "author": {"@type": "Organization", "name": "Tim Review ShopWise"},
  "publisher": {"@type": "Organization", "name": "ShopWise"}
}',
  NOW() - INTERVAL '7 days'
),

-- Article 5
(
  'Cara Cerdas Berbelanja Online: Hindari Penipuan dan Dapatkan Harga Terbaik',
  'cara-cerdas-belanja-online-hindari-penipuan',
  'Belanja online semakin populer, namun risiko penipuan juga meningkat. Pelajari strategi jitu berbelanja online dengan aman dan mendapatkan harga terbaik.',
  '<h2>Era Belanja Online yang Semakin Dinamis</h2>
<p>Belanja online kini telah menjadi gaya hidup bagi jutaan orang Indonesia. Kemudahan dan variasi produk yang tersedia membuatnya sangat menggiurkan, namun tantangannya adalah memastikan keamanan dan mendapatkan value terbaik dari setiap transaksi.</p>
<h2>Tanda-Tanda Toko Online yang Tidak Terpercaya</h2>
<ul>
<li>Harga terlalu jauh di bawah harga pasar</li>
<li>Tidak ada ulasan pembeli atau ulasan yang terlihat palsu</li>
<li>Foto produk yang jelas diambil dari internet tanpa foto asli</li>
<li>Tidak mau mengirim produk terlebih dahulu (minta DP/lunas dulu tanpa platform escrow)</li>
<li>Kontak yang tidak jelas atau hanya via WhatsApp</li>
</ul>
<h2>Tips Mendapatkan Harga Terbaik</h2>
<h3>1. Manfaatkan Hari Belanja Online Nasional</h3>
<p>Harbolnas (Hari Belanja Online Nasional), 11.11, 12.12, dan event flash sale adalah waktu terbaik untuk mendapatkan diskon besar. Siapkan wishlist Anda jauh-jauh hari!</p>
<h3>2. Gunakan Fitur Perbandingan Harga</h3>
<p>Banyak browser extension yang membantu membandingkan harga produk yang sama dari berbagai marketplace secara otomatis. Manfaatkan tools ini sebelum memutuskan beli.</p>
<h3>3. Kumpulkan Voucher dan Cashback</h3>
<p>Hampir semua marketplace kini menawarkan voucher dan program cashback. Kumpulkan dan gunakan secara strategis untuk memaksimalkan penghematan.</p>
<h2>Cara Memastikan Keamanan Transaksi</h2>
<p>Selalu transaksi melalui platform marketplace yang memiliki sistem escrow, di mana pembayaran ditahan terlebih dahulu hingga pembeli mengkonfirmasi penerimaan barang. Hindari transfer langsung ke rekening penjual di luar platform.</p>
<h2>Apa yang Harus Dilakukan Jika Tertipu?</h2>
<p>Jika Anda merasa ditipu, segera hubungi customer service marketplace, laporkan ke Kominfo melalui aduankonten.id, dan jika nominal cukup besar, lapor ke kepolisian dengan membawa bukti transaksi lengkap.</p>',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
  'ShopWise Security Team',
  'tips',
  ARRAY['belanja online', 'keamanan', 'tips', 'penipuan online', 'smart shopping'],
  'published',
  'Cara Cerdas Belanja Online: Hindari Penipuan & Dapat Harga Terbaik | ShopWise',
  'Strategi jitu berbelanja online dengan aman, mengenali tanda-tanda penipuan, dan cara mendapatkan harga terbaik dari setiap transaksi.',
  NULL,
  NOW() - INTERVAL '5 days'
),

-- Article 6
(
  'Dekorasi Rumah Minimalis Modern: Inspirasi Desain Interior 2026',
  'dekorasi-rumah-minimalis-modern-2026',
  'Tren desain interior 2026 berfokus pada kesederhanaan yang elegan. Temukan inspirasi dekorasi rumah minimalis modern yang bisa langsung Anda terapkan.',
  '<h2>Filosofi Desain Minimalis Modern</h2>
<p>"Less is more" — prinsip ini tetap relevan dan bahkan semakin kuat di 2026. Desain minimalis modern bukan berarti ruangan yang kosong dan dingin, melainkan ruangan yang dirancang dengan penuh kesengajaan: setiap elemen memiliki fungsi dan makna.</p>
<h2>Palet Warna Tren 2026</h2>
<p>Tahun ini, tren warna bergerak menuju nuansa earth tone yang hangat. Kombinasi terracotta, sage green, cream, dan charcoal menjadi pilihan favorit para desainer interior. Warna-warna ini menciptakan suasana yang hangat namun tetap sophisticated.</p>
<h2>Material yang Dominan</h2>
<h3>Batu Alam dan Beton</h3>
<p>Batu alam dan beton ekspos memberikan karakter yang kuat pada ruangan. Countertop marmer, dinding beton, dan lantai batu memberikan kesan mewah yang timeless.</p>
<h3>Kayu Natural</h3>
<p>Kayu dengan finishing natural (bukan yang terlalu glossy) semakin digemari karena memberikan kehangatan dan tekstur organik pada ruangan modern yang dominan hard surface.</p>
<h3>Rattan dan Rotan</h3>
<p>Material anyaman alami seperti rattan dan rotan mengalami kebangkitan popularitas. Furnitur rattan modern dengan desain yang clean memberikan sentuhan bohemian yang elegan.</p>
<h2>Tips Menerapkan Desain Minimalis</h2>
<ol>
<li><strong>Declutter terlebih dahulu</strong> — Minimalisme dimulai dari mengurangi barang yang tidak diperlukan</li>
<li><strong>Pilih furnitur multifungsi</strong> — Sofa bed, meja lipat, atau ottoman dengan storage tersembunyi</li>
<li><strong>Manfaatkan cahaya alami</strong> — Maksimalkan jendela dan gunakan tirai tipis yang membiarkan cahaya masuk</li>
<li><strong>Tambahkan satu focal point</strong> — Artwork, tanaman besar, atau lampu statement sebagai pusat perhatian ruangan</li>
<li><strong>Konsisten dalam palet warna</strong> — Batasi diri pada 3-4 warna utama untuk seluruh ruangan</li>
</ol>
<h2>Produk Dekorasi Rekomendasi ShopWise</h2>
<p>ShopWise menghadirkan koleksi dekorasi rumah pilihan yang selaras dengan tren minimalis modern 2026. Dari pot tanaman geometris, lampu meja industrial, hingga wall art minimalis — semua tersedia dengan harga yang terjangkau.</p>',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
  'ShopWise Interior Team',
  'inspirasi',
  ARRAY['dekorasi rumah', 'minimalis', 'interior', 'desain', 'tren 2026'],
  'published',
  'Dekorasi Rumah Minimalis Modern: Inspirasi Desain Interior 2026 | ShopWise',
  'Inspirasi dekorasi rumah minimalis modern untuk 2026. Tren warna, material, dan tips praktis menerapkan desain interior yang elegan dan fungsional.',
  '{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Dekorasi Rumah Minimalis Modern: Inspirasi Desain Interior 2026",
  "description": "Tren desain interior 2026 berfokus pada kesederhanaan yang elegan.",
  "author": {"@type": "Organization", "name": "ShopWise Interior Team"},
  "publisher": {"@type": "Organization", "name": "ShopWise"},
  "datePublished": "2026-07-10",
  "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
}',
  NOW() - INTERVAL '3 days'
);

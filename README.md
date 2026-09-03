# Kişisel Portfolyo Şablonu

Tek sayfa üzerinde çalışan, çok dilli ve koyu/açık mod destekli bir portfolyo sitesi. Kendi bilgilerinizi ekleyip Vercel veya benzeri bir serviste yayınlayabilirsiniz.

---

## Proje Hakkında

Bu proje, kendinizi ve projelerinizi tanıtmak için kullanabileceğiniz bir portfolyo şablonudur. Teknik altyapı:

- **React Router 7** – Sayfa yapısı ve routing
- **TypeScript** – Tip güvenliği
- **Tailwind CSS** – Stil ve responsive tasarım
- **Vite** – Derleme ve geliştirme sunucusu

Site tamamen istemci tarafında çalışır (SPA); Vercel gibi statik hostinglerde sorunsuz çalışır.

---

## Özellikler

| Özellik | Açıklama |
|--------|----------|
| Çok dil | Türkçe ve İngilizce; bayrak ile dil değiştirme, tercih adres çubuğunda ve tarayıcıda saklanır |
| Koyu / açık mod | Tema seçimi; tercih kaydedilir |
| Responsive | Mobil ve masaüstü uyumlu |
| Bölümler | Hero, Hakkımda, Eğitim, Deneyim, Beceriler, Projeler, İletişim |
| Proje linkleri | Proje kartlarına tıklanınca GitHub (veya belirlediğiniz) adresine gider |

---

## Proje Yapısı (Kısa Özet)

- **`app/routes/home.tsx`** – Ana sayfa bileşeni (hero, bölümler, dil/tema mantığı)
- **`app/i18n/translations.ts`** – Tüm metinler (TR/EN); içeriği buradan düzenlersiniz
- **`app/root.tsx`** – HTML şablonu, fontlar, tema script’i
- **`app/app.css`** – Genel stiller ve Tailwind tema ayarları
- **`vercel.json`** – Vercel build çıktısı ve SPA yönlendirmeleri

İçerik değiştirmek için önce **`app/i18n/translations.ts`** dosyasına bakmanız yeterli.

---

## Adım Adım Kullanım

### 1. Projeyi bilgisayarınıza alın

Repoyu klonlayın veya indirip açın:

```bash
git clone https://github.com/KULLANICI_ADI/REPO_ADI.git
cd REPO_ADI
```

(URL’deki `KULLANICI_ADI` ve `REPO_ADI` kendi GitHub kullanıcı adınız ve repo adınız olacak.)

---

### 2. Bağımlılıkları yükleyin

Proje klasöründe:

```bash
npm install
```

Bu komut `package.json` içindeki tüm paketleri yükler.

---

### 3. Geliştirme sunucusunu çalıştırın

Yerelde denemek için:

```bash
npm run dev
```

Tarayıcıda **http://localhost:5173** adresini açın. Dosyalarda yaptığınız değişiklikler otomatik yansır.

---

### 4. İçeriği kendinize göre düzenleyin

Tüm metinler ve linkler **`app/i18n/translations.ts`** dosyasında toplanmıştır. Hem Türkçe (`tr`) hem İngilizce (`en`) için aynı anahtarlar kullanılır; her iki dildeki metinleri buradan güncelleyin.

Örnek olarak:

- **Hero**: İsim, kısa tanıtım metni
- **Hakkımda**: Uzun “hakkımda” paragrafı
- **Eğitim**: Okul adları, yıllar, bölüm, GPA, sertifika metinleri
- **Deneyim**: İş/deneyim başlıkları, kurum, açıklama, proje linki (varsa)
- **Beceriler**: Liste maddeleri
- **Projeler**: Proje adı, açıklama, teknoloji etiketleri, **GitHub (veya canlı) linki**
- **İletişim**: E-posta, GitHub, LinkedIn, konum metni

Proje kartlarının tıklanınca gideceği adres, her proje nesnesindeki **`github`** alanıdır; isterseniz canlı site linki de ekleyebilirsiniz (gerekirse `home.tsx` içinde kullanımı genişletmeniz gerekir).

---

### 5. Siteyi derleyin (build)

Yayınlamadan önce derlemenin hatasız olduğundan emin olun:

```bash
npm run build
```

Başarılı olursa çıktı **`build/client/`** klasöründe oluşur. Bu klasörün tamamı statik hostinge atılacak içeriktir.

---

### 6. Vercel’e yayınlayın

Site **Vercel** üzerinde yayınlanır. `main` branch’e her push’ta Vercel otomatik build alır.

**Yapmanız gerekenler:**

1. [vercel.com](https://vercel.com) hesabıyla GitHub reposunu import edin.
2. Framework Preset: **Other** (veya otomatik algılanır). Build Command: `npm run build`, Output Directory: `build/client`.
3. Domain ekleyin: **Project → Settings → Domains** → `suleymangulter.com` ve `www.suleymangulter.com`.
4. GoDaddy DNS’te Vercel’in verdiği kayıtları ayarlayın (aşağıya bakın).

#### GoDaddy DNS (önerilen)

GoDaddy → **My Products** → domain → **DNS** / **Manage DNS**:

| Tip | Ad / Host | Değer | Not |
|-----|-----------|-------|-----|
| **A** | `@` | `216.198.79.1` (Vercel’in gösterdiği IP) | Apex (`suleymangulter.com`) |
| **CNAME** | `www` | `cname.vercel-dns.com` (veya Vercel’in verdiği) | `www` alt alanı |

- GoDaddy’deki **Domain Forwarding / Parked** yönlendirmesini kapatın; Vercel ile çakışır.
- Eski GitHub Pages `A` / `CNAME` kayıtlarını silin.
- DNS yayılımı 5 dk – 48 saat sürebilir; genelde 15–30 dk yeter.

SSL sertifikası Vercel’de domain doğrulanınca otomatik gelir. Çalışan adres: **https://www.suleymangulter.com** (apex genelde `www`’ye yönlendirilir).

---

## Özet Komutlar

| Amaç | Komut |
|------|--------|
| Bağımlılık yükleme | `npm install` |
| Yerelde çalıştırma | `npm run dev` |
| Derleme (build) | `npm run build` |
| Tip kontrolü | `npm run typecheck` |

---

## Lisans ve Katkı

Bu projeyi kendi portfolyonuz için serbestçe kullanabilir, içeriği ve stilleri ihtiyacınıza göre değiştirebilirsiniz. Paylaşırken orijinal repoya atıf vermeniz her zaman takdir edilir.

Sorular veya öneriler için issue açabilir veya pull request gönderebilirsiniz.

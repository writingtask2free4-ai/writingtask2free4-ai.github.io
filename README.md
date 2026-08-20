# Shaxsiy sayt — qo'llanma

Bu sayt statik (HTML/CSS/JS) va GitHub Pages'da butunlay bepul ishlaydi.
Server, baza yoki dasturlash bilimi deyarli kerak emas.

## 1. Fayllar tuzilishi

```
├── index.html              → Bosh sahifa
├── about.html               → "Men haqimda"
├── contact.html              → "Aloqa"
├── articles/
│   ├── index.html            → Barcha maqolalar ro'yxati
│   ├── post.html              → Bitta maqolani ko'rsatuvchi sahifa (avtomatik)
│   ├── articles.json          → Maqolalar RO'YXATI (sarlavha, sana, tavsif)
│   └── posts/
│       ├── shaxsiy-veb-sayt-yaratish.md   → Maqola matni (Markdown)
│       └── markdown-bilan-yozish.md
├── projects/
│   ├── index.html             → Loyihalar ro'yxati
│   └── projects.json          → Loyihalar ma'lumotlari
└── assets/
    ├── css/style.css          → Dizayn (ranglar, shriftlar shu yerda)
    ├── js/                    → Sayt logikasi (tegmasangiz ham bo'ladi)
    └── images/                → Loyiha rasmlari shu yerga qo'yiladi
```

## 2. Yangi MAQOLA qo'shish (2 qadam)

**1-qadam:** `articles/posts/` papkasida yangi `.md` fayl yarating, masalan
`birinchi-tajribam.md` va ichiga oddiy matn yozing (Markdown formatida):

```markdown
Bu yerga maqola matnini yozasiz.

## Kichik sarlavha

**Qalin matn**, *qiya matn*, va oddiy ro'yxat:

- birinchi band
- ikkinchi band
```

**2-qadam:** `articles/articles.json` faylini oching va ro'yxat boshiga
yangi blok qo'shing (boshqa maqolalarni o'chirmang, faqat qo'shing):

```json
{
  "slug": "birinchi-tajribam",
  "title": "Birinchi tajribam haqida",
  "date": "2026-08-25",
  "description": "Qisqacha tavsif, 1-2 gap.",
  "tags": ["Tajriba"],
  "file": "birinchi-tajribam.md"
}
```

> **Diqqat:** `"slug"` va `"file"` nomlari mos kelishi shart emas, lekin
> `"file"` maydoni aynan `posts/` papkasidagi fayl nomi bilan bir xil
> bo'lishi kerak. Har bir blokdan keyin (oxirgisidan tashqari) vergul
> `,` qo'yishni unutmang — JSON formatida bu muhim.

Shu bilan tamom — sayt yangi maqolani avtomatik ro'yxatga qo'shadi va
bosh sahifada ham ko'rsatadi.

## 3. Yangi LOYIHA qo'shish (1 qadam)

`projects/projects.json` faylini oching va ro'yxatga yangi blok qo'shing:

```json
{
  "title": "Loyiha nomi",
  "description": "Loyiha nima qilishini qisqacha tushuntiring.",
  "tech": ["HTML", "CSS", "JavaScript"],
  "image": "assets/images/loyiha1.png",
  "github": "https://github.com/username/loyiha-nomi",
  "demo": "https://username.github.io/loyiha-nomi"
}
```

Agar rasm bo'lmasa, `"image": ""` qoldiring. Agar demo havola bo'lmasa,
`"demo": ""` qoldiring — rasm yoki havola bo'lmasa, sayt uni avtomatik
yashiradi. Rasm faylini `assets/images/` papkasiga qo'ying.

## 4. Ranglar / shriftlarni o'zgartirish

Hammasi bitta faylda: `assets/css/style.css`, eng tepasidagi `:root { }`
va `[data-theme="dark"] { }` bloklarida. Masalan, asosiy rang (`--accent`)
qiymatini boshqa HEX kodga almashtiring — butun sayt bo'ylab avtomatik
yangilanadi.

## 5. "Men haqimda" va "Aloqa" ma'lumotlarini to'ldirish

`about.html` va `contact.html` fayllarini istalgan matn muharririda
oching (Notepad, VS Code va h.k.) va quyidagilarni o'zingiznikiga
almashtiring:

- `Ism Familiya` — ismingiz
- `email@example.com` — emailingiz
- `github.com/username`, `t.me/username`, `linkedin.com/in/username` — havolalaringiz

`Ctrl+H` (Find & Replace) orqali barcha fayllarda bir vaqtda almashtirish
tezroq bo'ladi.

---

# GitHub Pages'da bepul joylashtirish — qadam-baqadam

## 1-qadam: GitHub akkaunt oching

Agar hali yo'q bo'lsa, [github.com](https://github.com) saytida ro'yxatdan
o'ting.

## 2-qadam: Yangi repository (ombor) yarating

1. GitHub'da yuqori o'ng burchakdagi **"+"** tugmasini bosing → **New repository**
2. Repository nomini aynan shunday kiriting: `username.github.io`
   (o'zingizning GitHub foydalanuvchi nomingiz o'rniga, masalan
   agar login `javohir123` bo'lsa, nom `javohir123.github.io` bo'ladi)
3. **Public** tanlangan bo'lsin
4. **Create repository** tugmasini bosing

> Aynan shu nom formati (`username.github.io`) tanlansa, sayt manzili
> keyinchalik shunchaki `https://username.github.io` bo'ladi — qo'shimcha
> sozlash kerak emas.

## 3-qadam: Fayllarni yuklash

Eng oson yo'l — brauzer orqali:

1. Yangi repository sahifasida **"uploading an existing file"** havolasini bosing
2. Kompyuteringizdagi saytning barcha fayl va papkalarini (`index.html`,
   `about.html`, `assets/` va h.k.) shu yerga sudrab tashlang (drag & drop)
3. Pastda **Commit changes** tugmasini bosing

(Agar Git bilan ishlashni bilsangiz, buni terminal orqali ham qilish
mumkin, lekin brauzer usuli boshlang'ichlar uchun eng qulayi.)

## 4-qadam: GitHub Pages'ni yoqish

1. Repository ichida yuqoridagi **Settings** bo'limiga o'ting
2. Chap menyudan **Pages** ni tanlang
3. **"Build and deployment"** bo'limida **Source** sifatida
   **"Deploy from a branch"** tanlangan bo'lsin
4. **Branch** ostida `main` (yoki `master`) va papka sifatida `/ (root)`
   ni tanlang, so'ng **Save** bosing

## 5-qadam: Saytni ochish

1–2 daqiqadan so'ng sahifani yangilang — yashil belgi bilan
**"Your site is live at https://username.github.io"** degan xabar chiqadi.
Shu havolani bosib, saytingizni ko'rishingiz mumkin.

> Agar repository nomini `username.github.io` qilib olmagan bo'lsangiz
> (masalan, `mening-saytim` deb nomlagan bo'lsangiz), sayt manzili
> `https://username.github.io/mening-saytim` shaklida bo'ladi — bu ham
> to'g'ri ishlaydi, faqat manzil biroz uzunroq bo'ladi.

## Keyinchalik yangilash

Har safar yangi maqola yoki loyiha qo'shmoqchi bo'lsangiz:

1. GitHub'da tegishli faylni oching (masalan `articles/articles.json`)
2. Qalam belgisini (**Edit**) bosing
3. Kerakli o'zgarishni kiriting
4. Pastda **Commit changes** tugmasini bosing

Sayt 1 daqiqa ichida avtomatik yangilanadi — qo'shimcha hech narsa
qilish shart emas.

# Editha - Dashboard redaktorů

Minimalistický a čistý dashboard pro redaktory postavený na Next.js a shadcn/ui komponentách. Dashboard automaticky načítá a zobrazuje klasifikované články z n8n workflow.

## 🚀 Funkce

- 📊 **Přehled článků** - Zobrazení všech klasifikovaných článků z RSS zdrojů
- 🔍 **Inteligentní filtrování** - Filtry podle regionu, tématu a důležitosti
- ⚡ **Rotující ticker** - Automatické střídání zpráv s důležitostí 5 s fade efektem
- 📱 **Responzivní design** - Optimalizováno pro desktop i mobilní zařízení
- 📤 **Export funkcionalita** - Možnost exportu filtrovaných dat do CSV
- 🔄 **Automatická aktualizace** - Data se načítají z Google Sheets s 5min cache
- 🎯 **Řazení podle důležitosti** - Články se řadí primárně podle důležitosti (5-1)
- 🚫 **Filtrování duplicit** - Automatické skrývání duplicitních zpráv

## Technologie

- **Next.js 15** - React framework s App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Moderní UI komponenty
- **Papa Parse** - CSV parsing
- **date-fns** - Datum a čas utility
- **Lucide React** - Ikony

## Instalace a spuštění

1. **Instalace závislostí:**
   ```bash
   npm install
   ```

2. **Spuštění vývojového serveru:**
   ```bash
   npm run dev
   ```

3. **Otevření v prohlížeči:**
   ```
   http://localhost:3000
   ```

## Struktura dat

Dashboard načítá data z Google Sheets CSV s následující strukturou:

- `id_hash` - Unikátní identifikátor článku
- `timestamp` - Čas publikace
- `region` - Region (CZ, SK, EU, US, World, Other)
- `dulezitost` - Důležitost 1-5
- `tema` - Téma článku
- `shrnuti` - Shrnutí obsahu
- `doporuceny_nadpis` - Doporučený nadpis
- `tagy` - Tagy oddělené čárkami
- `score` - Skóre 0-100
- `jazyk` - Jazyk článku
- `url` - URL původního článku
- `source_name` - Název zdroje

## 🧩 Komponenty

### ArticleCard
Elegantní karta pro zobrazení článku s:
- Doporučeným nadpisem s externím odkazem
- Shrnutím obsahu (max 3 řádky)
- Barevnými badges pro důležitost, region a téma
- Tagy (max 3, lowercase bez diakritiky)
- Zdroj extrahovaný z URL
- Relativním časem publikace

### Filters
Čistý filtrační panel s:
- Filtry podle regionu, tématu a důležitosti
- Dropdown selecty s "Všechny" možnostmi
- Možností vymazat všechny filtry najednou
- Real-time filtrování bez reload stránky

### HighPriorityTicker
Rotující modul pro zprávy s důležitostí 5:
- Automatické střídání každých 5 sekund
- Plynulý fade-in-out efekt (600ms)
- Vizuální indikátory aktuální pozice
- Červené barevné schéma pro zvýraznění
- Pevná výška pro eliminaci "skákání"
- Automatické skrytí pokud nejsou zprávy s důležitostí 5

## ⚙️ Konfigurace

### Data Source
Data se načítají z Google Sheets CSV URL definované v `src/lib/data.ts`:
- **CSV URL**: Automaticky načítá z n8n workflow
- **Cache**: 5 minut pro optimalizaci výkonu
- **Filtrování**: Automatické skrývání duplicitních zpráv

### Řazení
Články se řadí podle:
1. **Důležitost** (5-1, sestupně)
2. **Čas publikace** (nejnovější první)

### Filtrování
Automaticky se skrývají:
- Články s tématem "Duplicitni"
- Články s nadpisem "Duplicitní zpráva"

## 🚀 Deploy na Vercel

### Rychlý Deploy
1. **Připojení k Vercel:**
   - Jdi na [vercel.com](https://vercel.com)
   - Přihlaš se a klikni "New Project"
   - Importuj repozitář z GitHub: `davidrynes/Editha`

2. **Automatická konfigurace:**
   - Framework: Next.js (detekuje automaticky)
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

3. **Deploy:**
   - Klikni "Deploy"
   - Vercel automaticky buildne a deployne aplikaci
   - Získáš URL typu `https://editha-xxx.vercel.app`

### Environment Variables (volitelné)
Pokud budeš chtít změnit CSV URL, přidej:
- `NEXT_PUBLIC_CSV_URL` - URL k Google Sheets CSV

### Vercel Konfigurace
Projekt obsahuje `vercel.json` s optimalizacemi:
- Security headers
- Next.js specifické nastavení
- Optimalizace pro produkční prostředí

## Build pro produkci

```bash
npm run build
npm start
```

## 📊 Live Demo

Dashboard je dostupný na: [GitHub Repository](https://github.com/davidrynes/Editha)

Po deploy na Vercel bude dostupný na: `https://editha-xxx.vercel.app`

## 🔧 Vývoj

### Lokální spuštění
```bash
npm install
npm run dev
```

### Build pro produkci
```bash
npm run build
npm start
```

## 📝 Changelog

### v1.0.0
- ✅ Základní dashboard s načítáním z Google Sheets
- ✅ Filtrování podle regionu, tématu a důležitosti
- ✅ Rotující ticker pro zprávy s důležitostí 5
- ✅ Fade-in-out efekt pro plynulé střídání
- ✅ Export do CSV funkcionalita
- ✅ Automatické skrývání duplicitních zpráv
- ✅ Responzivní design s shadcn/ui komponenty

## 📄 Licence

MIT
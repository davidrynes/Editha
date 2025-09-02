# Dashboard redaktorů

Minimalistický a čistý dashboard pro redaktory postavený na Next.js a shadcn/ui komponentách.

## Funkce

- 📊 **Přehled článků** - Zobrazení všech klasifikovaných článků z RSS zdrojů
- 🔍 **Filtrování** - Filtry podle regionu, tématu, důležitosti a fulltextové vyhledávání
- 📈 **Statistiky** - Přehledné statistiky o článcích a jejich distribuci
- 📱 **Responzivní design** - Optimalizováno pro desktop i mobilní zařízení
- 📤 **Export** - Možnost exportu filtrovaných dat do CSV
- 🔄 **Automatická aktualizace** - Data se načítají z Google Sheets s cache

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

## Komponenty

### ArticleCard
Zobrazuje jednotlivý článek s:
- Doporučeným nadpisem
- Shrnutím obsahu
- Badges pro důležitost, region a téma
- Tagy
- Odkazem na původní článek
- Časem publikace

### Filters
Filtrovací panel s:
- Fulltextovým vyhledáváním
- Filtry podle regionu, tématu a důležitosti
- Možností vymazat všechny filtry

### StatsCards
Statistické karty zobrazující:
- Celkový počet článků
- Počet článků s vysokou důležitostí
- Počet článků z posledních 24 hodin
- Top 3 regiony podle počtu článků

## Konfigurace

Data se načítají z Google Sheets CSV URL definované v `src/lib/data.ts`. Cache je nastavena na 5 minut pro optimalizaci výkonu.

## Deploy na Vercel

1. **Připojení k Vercel:**
   - Jdi na [vercel.com](https://vercel.com)
   - Přihlaš se a klikni "New Project"
   - Importuj repozitář z GitHub: `davidrynes/Editha`

2. **Konfigurace:**
   - Framework: Next.js (detekuje automaticky)
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

3. **Environment Variables (volitelné):**
   - Pokud budeš chtít změnit CSV URL, přidej:
     - `NEXT_PUBLIC_CSV_URL` - URL k Google Sheets CSV

4. **Deploy:**
   - Klikni "Deploy"
   - Vercel automaticky buildne a deployne aplikaci
   - Získáš URL typu `https://editha-xxx.vercel.app`

## Build pro produkci

```bash
npm run build
npm start
```

## Live Demo

Dashboard je dostupný na: [GitHub Repository](https://github.com/davidrynes/Editha)

## Licence

MIT
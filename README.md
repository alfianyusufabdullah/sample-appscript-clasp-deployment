# Google Apps Script — Clasp Project

## Prasyarat

- [Node.js](https://nodejs.org/) v18+
- [Google Account](https://cloud.google.com/) dengan akses ke Apps Script
- [Google Apps Script API](https://script.google.com/home/usersettings) diaktifkan

## Setup Lokal

```bash
# 1. Clone repo
git clone <repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Login ke Google
npm run login

# 4. Buat Script baru atau gunakan yang sudah ada
#    Dapatkan Script ID dari menu File > Project settings > Script ID
#    atau buat baru via: clasp create --title "My Project" --type sheets

# 5. Isi Script ID di .clasp.json
#    "scriptId": "your-script-id"

# 6. Set Spreadsheet ID via env
cp .env.example .env.local
# Isi SPREADSHEET_ID di .env.local

# 7. Build & Deploy
SPREADSHEET_ID=$(grep SPREADSHEET_ID .env.local | cut -d= -f2) npm run deploy
```

## Struktur Project

```
├── src/server/           # Kode server GAS
│   ├── main.js           # Entry point (onOpen, doGet, triggers)
│   ├── config.js         # Konstanta global
│   ├── repositories/     # Akses Google API (Sheet, Drive, dll)
│   ├── services/         # Business logic
│   └── utils/            # Helper functions
├── dist/                 # Output build (auto-generated)
├── appsscript.json       # Manifes Apps Script
├── .clasp.json           # Konfigurasi clasp
└── .github/workflows/    # CI/CD
```

## Deployment via GitHub Actions

### Setup Secrets

Repository → Settings → Secrets and variables → Actions → New repository secret:

| Secret | Isi | Cara Generate |
|--------|-----|---------------|
| `CLASP_JSON` | Isi file `.clasp.json` (raw JSON) | `cat .clasp.json` lalu copy |
| `CLASPRC_JSON` | Isi file `~/.clasprc.json` (raw JSON) | `cat ~/.clasprc.json` lalu copy |
| `SPREADSHEET_ID` | ID Google Spreadsheet | dari URL spreadsheet |

### Mendapatkan CLASPRC_JSON

```bash
npm run login                           # Login clasp
cat .clasp.json                         # copy → CLASP_JSON
cat ~/.clasprc.json                     # copy → CLASPRC_JSON
```

### Trigger Deploy

- Push ke branch `main` → auto deploy
- Manual via Actions tab → "Run workflow"

## Local Development

```bash
SPREADSHEET_ID=xxx npm run build  # Bundle dengan env tertentu
npm run deploy   # Build + push ke GAS
npm run watch    # Auto build saat ada perubahan
npm run open     # Buka Script Editor di browser
```

## Alur Data

```
Request/Trigger → main.js → Service → Repository → Google API
```

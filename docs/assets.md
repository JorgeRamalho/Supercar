# Inventário de assets

Registro dos arquivos de mídia versionados e onde são referenciados.

## `assets/images/hero/`

| Arquivo | Uso | Referência |
|---------|-----|------------|
| `lamborghini-huracan.png` | Reserva de campanha / hero alternativo | pasta `hero/` (não usado no hero atual) |

## `assets/images/catalog/`

| Arquivo | Veículo | Referência |
|---------|---------|------------|
| `audi-tts-2023.png` | Audi TTS 2023 (+ hero atual) | `js/data.js`, `index.html` |
| `audi-q5-2021.png` | Audi Q5 2.0 TFSI | `js/data.js` |
| `bmw-320i-m-sport.png` | BMW 320i M Sport | `js/data.js` |
| `ford-ranger-limited.png` | Ford Ranger Limited | `js/data.js` |
| `honda-civic-touring.png` | Honda Civic Touring | `js/data.js` |
| `hyundai-creta-ultimate.png` | Hyundai Creta Ultimate | `js/data.js` |
| `jeep-compass-limited.png` | Jeep Compass Limited | `js/data.js` |
| `lexus-es-300h-luxury.png` | Lexus ES 300h Luxury | `js/data.js` |
| `mercedes-c180.png` | Mercedes-Benz C180 | `js/data.js` |
| `nissan-kicks-advance.png` | Nissan Kicks Advance | `js/data.js` |
| `porsche-macan-s.png` | Porsche Macan S | `js/data.js` |
| `toyota-hilux-srx.png` | Toyota Hilux SRX | `js/data.js` |

Fallback de imagem quebrada: `audi-tts-2023.png` (`CAR_IMAGE_FALLBACK` em `js/data.js`).

## `assets/logos/`

| Arquivo | Uso | Referência |
|---------|-----|------------|
| `favicon.svg` | Favicon do site | `index.html` |
| `lexus.svg` | Logo no marquee | `js/app.js` → `MARQUEE_BRANDS` |

## Regras de inclusão

1. Foto de hero → `assets/images/hero/`
2. Foto de veículo do estoque → `assets/images/catalog/`
3. Logo / ícone de marca local → `assets/logos/`
4. Nome em `kebab-case`, descritivo: `marca-modelo[-variante].ext`
5. Não versionar dumps de editor, capturas de teste ou nomes com path de SO (`c__Users_...`)

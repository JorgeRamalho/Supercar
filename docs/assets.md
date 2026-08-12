# Inventário de assets

## `assets/images/hero/`

| Arquivo | Uso |
|---------|-----|
| `lamborghini-huracan.png` | Reserva de campanha |

## `assets/images/catalog/`

Cada veículo tem **PNG** (fallback) + **WebP** (preferencial em `js/data.js`).

| Base | Veículo |
|------|---------|
| `audi-tts-2023` | Audi TTS (+ hero) |
| `audi-q5-2021` | Audi Q5 |
| `bmw-320i-m-sport` | BMW 320i |
| `ford-ranger-limited` | Ford Ranger |
| `honda-civic-touring` | Honda Civic |
| `hyundai-creta-ultimate` | Hyundai Creta |
| `jeep-compass-limited` | Jeep Compass |
| `lexus-es-300h-luxury` | Lexus ES 300h |
| `mercedes-c180` | Mercedes C180 |
| `nissan-kicks-advance` | Nissan Kicks |
| `porsche-macan-s` | Porsche Macan |
| `toyota-hilux-srx` | Toyota Hilux |

Fallback: `audi-tts-2023.webp` → `.png` se necessário.

## `assets/logos/`

| Arquivo | Uso |
|---------|-----|
| `favicon.svg` | Favicon |
| `lexus.svg` | Marquee |

## Regras

1. Hero → `assets/images/hero/`
2. Estoque → `assets/images/catalog/` (gerar WebP ao adicionar PNG)
3. Logos → `assets/logos/`
4. Nomes `kebab-case`

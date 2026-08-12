# Fases do projeto Super Car

Roteiro de continuidade. Cada fase tem objetivo, entregáveis e critério de pronto.

## Fase 0 — Fundação (concluída)

- Site estático HTML/CSS/JS
- Catálogo dinâmico, filtros, modal, marquee
- Design tokens e tipografia própria

## Fase 1 — Organização e auditoria (concluída)

- Raiz enxuta + `docs/`
- Assets em `hero/` e `catalog/`
- Auditoria Playwright + checklist `acoes-imediatas.md`

## Fase 2 — Conversão e clareza (concluída)

- SEO head (favicon, OG, canonical)
- Hero alinhado ao estoque
- Lead via WhatsApp
- Privacidade mínima + skip link

## Fase 3 — SEO técnico e mídia local (concluída)

- Catálogo 100% local, robots, sitemap, JSON-LD, docs SEO/conteúdo, a11y modal

## Fase 4 — Conteúdo e prova social (concluída no código)

| Entrega | Status |
|---------|--------|
| FAQ na página (`#faq`) | Feito |
| Disclaimer nos depoimentos | Feito |
| NAP centralizado em `js/site.js` + hidratação | Feito |
| Banner de demonstração enquanto `demoNotice: true` | Feito |
| Trocar NAP/depoimentos por dados reais | Operacional (editar `js/site.js`) |

## Fase 5 — Performance e polish (concluída)

| Entrega | Status |
|---------|--------|
| Subset de fontes Google (pesos usados) | Feito |
| Marquee só com marcas do estoque | Feito |
| WebP do catálogo + fallback PNG | Feito |
| `fetchpriority` no hero, `sizes` nos cards | Feito |
| `prefers-reduced-motion` no marquee | Feito |

## Fase 6 — Operação e crescimento (base concluída)

| Entrega | Status |
|---------|--------|
| CI GitHub Actions (smoke) | Feito |
| Hook `formEndpoint` (Formspree/Getform) | Feito (opt-in em `SITE`) |
| Eventos CTA/lead em `dataLayer` | Feito |
| Domínio custom | Operacional (GitHub Pages / DNS) |
| Analytics com ID real | Operacional (`SITE.analyticsId`) |
| CMS / planilha → JSON | Futuro opcional |

## Como colocar em produção real

1. Editar `js/site.js` (telefone, WhatsApp, endereço, e-mail)
2. Definir `demoNotice: false`
3. Opcional: `formEndpoint` e `analyticsId`
4. Push em `main` → Pages + CI

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

## Fase 2 — Conversão e clareza (concluída no código)

- SEO head (favicon, OG, canonical)
- Hero alinhado ao estoque
- Lead via WhatsApp
- Privacidade mínima + skip link

**Deploy:** commit/push da Auditoria Operacional fecha A1 e atualiza o GitHub Pages.

## Fase 3 — SEO técnico e mídia local (concluída)

| Entrega | Status |
|---------|--------|
| Catálogo 100% com imagens locais | Feito |
| `robots.txt` + `sitemap.xml` | Feito |
| JSON-LD `LocalBusiness` / `AutoDealer` | Feito |
| Docs `conteudo.md` + `seo.md` | Feito |
| A11y do modal (foco) | Feito |

## Fase 4 — Conteúdo e prova social (próxima)

1. Substituir depoimentos genéricos por casos reais (ou disclaimer claro)
2. FAQ curto (financiamento, laudo, garantia, troca)
3. Endereço/telefone/WhatsApp reais de produção
4. E-mail LGPD real em `#privacidade`

## Fase 5 — Performance e polish

1. Self-host ou subset das fontes Google
2. Reduzir marquee (menos marcas / less DOM)
3. WebP + `srcset` nas fotos do catálogo
4. `prefers-reduced-motion` já existe — auditar animações restantes

## Fase 6 — Operação e crescimento

1. Domínio custom + HTTPS
2. Analytics (privacy-friendly) e eventos de CTA/WhatsApp
3. Formulário com backend (Formspree/Netlify) além do WhatsApp
4. CMS leve ou planilha → JSON para estoque (opcional)
5. CI: lint HTML + smoke Playwright no Pages

## Ordem sugerida daqui pra frente

```
A1 commit/push → validar Pages
→ Fase 4 conteúdo real
→ Fase 5 performance
→ Fase 6 operação
```

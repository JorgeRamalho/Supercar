# Ações imediatas — desenvolvimento

Checklist operacional derivado da [auditoria](./auditoria.md).  
Roteiro de fases: [fases.md](./fases.md).

Ordem: **P0** → **P1** → **P2** → **Fase 4+**.

## Status

| ID | Prioridade | Ação | Status |
|----|------------|------|--------|
| A1 | P0 | Versionar assets + docs + melhorias + push Pages | Feito |
| A2 | P0 | SEO head: favicon, Open Graph, Twitter, canonical, theme-color | Feito |
| A3 | P0 | Alinhar hero ao estoque real | Feito |
| A4 | P1 | Formulário abre WhatsApp com mensagem pré-preenchida | Feito |
| A5 | P1 | Hero limpo: sem badge; stats abaixo da dobra | Feito |
| A6 | P1 | Seção mínima de política de privacidade | Feito |
| A7 | P2 | Skip link + a11y do modal (foco / trap Tab) | Feito |
| A8 | P2 | Catálogo 100% com fotos locais | Feito |
| A9 | P2 | `robots.txt` + `sitemap.xml` + JSON-LD | Feito |
| A10 | P2 | Docs `conteudo.md`, `seo.md`, `fases.md` | Feito |

## Próximo bloco (Fase 4)

| ID | Ação | Status |
|----|------|--------|
| B1 | Dados reais NAP (telefone, WhatsApp, endereço, e-mail LGPD) | Pendente |
| B2 | FAQ na página (financiamento, laudo, troca) | Pendente |
| B3 | Depoimentos reais ou disclaimer | Pendente |
| B4 | Validar schema no Rich Results Test após deploy | Pendente |

## Critérios de aceite — Fase 3

### A8
- Nenhum `images.unsplash.com` em `js/data.js`
- 12/12 veículos com path em `assets/images/catalog/`

### A9
- `robots.txt` e `sitemap.xml` na raiz
- JSON-LD `AutoDealer` / `LocalBusiness` no `<head>`

### A1 (ainda aberto)
- `git push` + hero/catálogo sem 404 em https://jorgeramalho.github.io/Supercar/

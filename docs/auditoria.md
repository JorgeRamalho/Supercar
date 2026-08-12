# Auditoria profissional — Super Car

Data: **12/08/2026**  
Ferramenta: Playwright (desktop 1440×900, mobile 390×844)  
URLs: `http://127.0.0.1:8765/` (local) · [GitHub Pages](https://jorgeramalho.github.io/Supercar/)

Score geral (média das dimensões): **72 / 100**

## Dimensões

| Dimensão | Nota | Resumo |
|----------|------|--------|
| SEO | 42 | Title/description/lang ok; faltam OG, Twitter, canonical, favicon, JSON-LD, robots/sitemap |
| Usabilidade | 74 | Filtros, modal e âncoras ok; formulário só simula; link de privacidade morto |
| Responsividade | 78 | Breakpoints 900/600; menu mobile; sem overflow-x; hero alto no mobile |
| Layout / UI | 68 | Visual premium coerente; hero em card + badge + stats na 1ª dobra |
| Identidade | 76 | Marca SC + ouro/ciano + tipografia própria; desalinhamento hero R$ 2,2M vs estoque |
| Funcionalidade | 80 | Catálogo 12 itens, busca/marca/categoria/preço, marquee, dialog |
| Estratégia de desenvolvimento | 66 | Stack estática adequada ao MVP; deps CDN; Pages desatualizado vs working tree |
| Estrutura / documentação | 84 | Raiz enxuta + `docs/` + `hero/`/`catalog/` (ainda untracked) |
| Tipografia | 82 | Barlow Condensed + Plus Jakarta Sans com escala `clamp` |
| UX | 70 | Fluxo estoque→modal→contato claro; expectativa de preço e lead fracos |

## Evidências Playwright

- **Local pós-reorganização:** hero `assets/images/hero/lamborghini-huracan.png` carrega (`naturalWidth > 0`); imagens quebradas = 0.
- **Produção (Pages):** ainda referencia paths antigos → 404 no hero (e risco no estoque se paths locais não existirem no branch publicado).
- **Busca:** filtro `"BMW"` → 1 card.
- **Modal:** `HTMLDialogElement.showModal()` abre; close via `[data-close]`.
- **Mobile:** `.nav-toggle` com `display: flex`; `scrollWidth` ≈ viewport (sem overflow horizontal).
- **SEO runtime:** `hasOg=false`, `hasCanonical=false`, `hasFavicon=false`, `hasJsonLd=0`, `skipLink=false`.
- **Preço:** estoque max R$ 318.000; filtro max R$ 350.000 (cobre o catálogo); hero anuncia R$ 2.200.000.

## Estrutura e pastas fora da raiz

### Dentro do repositório

Ver [estrutura.md](./estrutura.md). Ordem canônica:

1. Raiz enxuta: `index.html`, `README.md`, `.gitignore`
2. `css/` → apresentação
3. `js/` → dados + comportamento
4. `assets/images/hero|catalog` + `assets/logos`
5. `docs/` → documentação profissional

### Fora de `Projeto-SuperCar/`

| Local | Papel |
|-------|--------|
| `Fron_End/Projetos/` | Portfólio de projetos irmãos (`Projeto-*`) — não compartilhar assets entre eles |
| `Fron_End/Arquivos/` | Pasta irmã de `Projetos/` — manter fora do SuperCar |
| `https://github.com/JorgeRamalho/Supercar` | Remote Git |
| `https://jorgeramalho.github.io/Supercar/` | Deploy Pages (branch `main`, path `/`) |
| CDNs (Simple Icons, Unsplash, Google Fonts) | Dependências de runtime externas |

## Plano de pesquisa (próximos ciclos)

| Fase | Objetivo | Doc |
|------|----------|-----|
| Inventário | Paths HTML/JS ↔ arquivos reais | estrutura / assets |
| Arquitetura | Fluxo lead e responsabilidades | arquitetura |
| Convenções | Naming e PRs | convencoes |
| Auditoria | Scores e backlog (este arquivo) | auditoria |
| Conteúdo | Tom de voz, FAQ, política | `conteudo.md` (criar) |
| SEO local | Keywords Moema / seminovos | `seo.md` (criar) |

## Backlog ordenado

Execução viva em [acoes-imediatas.md](./acoes-imediatas.md).

### P0

1. Commit/push de `assets/images/hero/`, `assets/images/catalog/` e `docs/` — **feito**
2. Favicon + Open Graph + canonical apontando para Pages — **feito**
3. Alinhar hero (modelo/preço) ao estoque real — **feito**

### P1

4. Conversão real do formulário (WhatsApp) — **feito**
5. Hero limpo: sem badge; stats abaixo da dobra — **feito**
6. Seção de Política de Privacidade — **feito**

### P2

7. Skip link + foco do modal — **feito**
8. Catálogo 100% local — **feito**
9. `robots.txt` + `sitemap.xml` + JSON-LD — **feito**
10. Reduzir marquee / self-host fontes — **pendente (Fase 5)**

Continuidade: [fases.md](./fases.md) · checklist: [acoes-imediatas.md](./acoes-imediatas.md)

## Critérios de pronto (definição)

- Zero 404 de mídia em local e em Pages
- Head com title, description, OG, favicon, canonical
- Lead capturado em canal real
- Documentação em `docs/` refletindo a árvore publicada

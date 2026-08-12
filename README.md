# Super Car — Seminovos Premium

Site institucional e catálogo dinâmico da loja **Super Car**.

## Quick start

Abra `index.html` no navegador ou use um servidor local:

```bash
python -m http.server 8080
```

Acesse: [http://localhost:8080](http://localhost:8080)

## Pasta raiz (enxuta)

Somente o essencial permanece na raiz:

| Arquivo | Função |
|---------|--------|
| `index.html` | Entrada da aplicação |
| `.gitignore` | Regras de versionamento |
| `README.md` | Este guia |

Demais artefatos ficam em pastas dedicadas — ver [docs/estrutura.md](docs/estrutura.md).

## Estrutura

```
Projeto-SuperCar/
├── index.html
├── .gitignore
├── README.md
├── css/
│   ├── variables.css      # tokens (cores, tipografia, marquee)
│   └── styles.css         # layout e componentes
├── js/
│   ├── data.js            # veículos e URLs de imagem
│   └── app.js             # catálogo, filtros, modal, marquee
├── assets/
│   ├── images/
│   │   ├── hero/          # destaque do primeiro viewport
│   │   └── catalog/       # fotos do estoque
│   └── logos/             # logos locais (ex.: Lexus)
└── docs/                  # documentação profissional
    ├── estrutura.md
    ├── arquitetura.md
    ├── assets.md
    └── convencoes.md
```

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [docs/estrutura.md](docs/estrutura.md) | Mapa de pastas e arquivos |
| [docs/arquitetura.md](docs/arquitetura.md) | Camadas, fluxos e dependências |
| [docs/assets.md](docs/assets.md) | Inventário de mídia e referências |
| [docs/convencoes.md](docs/convencoes.md) | Nomenclatura e regras de organização |
| [docs/auditoria.md](docs/auditoria.md) | Auditoria SEO/UX/UI (Playwright) e backlog |
| [docs/acoes-imediatas.md](docs/acoes-imediatas.md) | Checklist P0/P1/P2 de execução |
| [docs/fases.md](docs/fases.md) | Roteiro de fases do projeto |
| [docs/conteudo.md](docs/conteudo.md) | Tom de voz e conteúdo |
| [docs/seo.md](docs/seo.md) | SEO on-page e local |

## Funcionalidades

- Hero com destaque (Lamborghini Huracán) e estatísticas
- Catálogo com busca, filtro por marca/categoria e faixa de preço
- Modal com detalhes do veículo
- Faixa animada de marcas (logos + links oficiais)
- Menu responsivo e formulário de contato
- Fallback de imagens e suporte a `prefers-reduced-motion`

## Design

- **Paleta:** fundo profundo, ouro luxo e ciano dinâmico
- **Tipografia:** [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) (títulos) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (corpo)

## Stack

HTML5 · CSS3 (custom properties) · JavaScript vanilla — sem bundler.

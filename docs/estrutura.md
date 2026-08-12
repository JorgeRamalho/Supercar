# Estrutura do projeto

Mapa oficial das pastas e arquivos do **Projeto-SuperCar**. A pasta raiz permanece enxuta: apenas entrada da aplicação, configuração e documentação de visão geral.

## Raiz (somente essenciais)

| Arquivo | Função |
|---------|--------|
| `index.html` | Entrada única da aplicação (HTML semântico) |
| `.gitignore` | Exclusões de versionamento (IDE, temporários, segredos) |
| `README.md` | Visão geral, quick start e link para esta documentação |

Arquivos e pastas de editor (`.vscode/`, `.cursor/`) podem existir localmente, mas **não** fazem parte do padrão versionado.

## Árvore canônica

```
Projeto-SuperCar/
├── index.html                 # entrada
├── robots.txt                 # crawlers
├── sitemap.xml                # mapa do site
├── .gitignore                 # configuração Git
├── README.md                  # documentação de entrada
├── css/                       # estilos
│   ├── variables.css          # tokens de design
│   └── styles.css             # layout e componentes
├── js/                        # scripts
│   ├── data.js                # catálogo (fonte de dados)
│   └── app.js                 # UI, filtros, modal, marquee
├── assets/                    # mídia estática
│   ├── images/
│   │   ├── hero/              # campanhas / hero alternativo
│   │   └── catalog/           # fotos dos veículos do estoque
│   └── logos/                 # favicon e logos locais
└── docs/                      # documentação profissional
    ├── estrutura.md           # este arquivo
    ├── arquitetura.md         # fluxo e responsabilidades
    ├── assets.md              # inventário de mídia
    ├── convencoes.md          # nomenclatura e regras
    ├── auditoria.md           # SEO, UX/UI, Playwright e backlog
    ├── acoes-imediatas.md     # checklist de execução
    ├── fases.md               # roteiro de fases
    ├── conteudo.md            # tom de voz
    └── seo.md                 # SEO on-page / local
```

## Pastas fora da raiz — papel de cada uma

| Pasta | Escopo | O que pode entrar | O que não deve entrar |
|-------|--------|-------------------|------------------------|
| `css/` | Apresentação | Tokens, folhas de estilo da UI | Lógica JS, imagens |
| `js/` | Comportamento | Dados do catálogo e lógica de interface | Estilos, binários |
| `assets/images/hero/` | Hero visual | Uma imagem principal por campanha/destaque | Fotos de cards do catálogo |
| `assets/images/catalog/` | Estoque | Fotos reais dos veículos listados em `data.js` | Dump de editor, testes |
| `assets/logos/` | Marcas locais | SVG/PNG de logos sem CDN | Fotos de veículos |
| `docs/` | Documentação | Guias de estrutura, arquitetura e convenções | Código de produção |

## Ordem de carregamento (entrada)

1. `css/variables.css` → tokens
2. `css/styles.css` → estilos
3. `js/data.js` → dados (`CARS`, helpers de imagem)
4. `js/app.js` → inicialização da UI

Caminhos no HTML/JS são **relativos à raiz** (`css/...`, `js/...`, `assets/...`).

# Convenções

Padrões para manter a pasta raiz enxuta e as pastas coerentes.

## Raiz

Permitido na raiz:

- `index.html` — único ponto de entrada HTML
- `.gitignore` — configuração Git
- `README.md` — documentação de entrada

Tudo o mais deve residir em `css/`, `js/`, `assets/` ou `docs/`.

## Nomenclatura de arquivos

| Tipo | Padrão | Exemplos |
|------|--------|----------|
| HTML de entrada | `index.html` na raiz | — |
| CSS | `kebab-case.css` | `variables.css`, `styles.css` |
| JS | `kebab-case.js` | `data.js`, `app.js` |
| Imagens | `kebab-case.png` / `.webp` / `.jpg` | `honda-civic-touring.png` |
| Logos | `marca.svg` | `lexus.svg` |
| Docs | `tema.md` em português | `estrutura.md` |

Evitar: espaços, acentos, paths embutidos no nome, prefixos de SO, `test-*` em produção.

## Organização por pasta

- **Um papel por pasta** — não misturar estilos em `js/` nem scripts em `css/`
- **Um arquivo, uma responsabilidade** — dados em `data.js`, UI em `app.js`
- **Assets por contexto** — `hero/` ≠ `catalog/` ≠ `logos/`
- **Docs só em `docs/`** — não espalhar `.md` auxiliares na raiz (exceto `README.md`)

## Caminhos

Sempre relativos à raiz do projeto:

```html
<link rel="stylesheet" href="css/variables.css" />
<script src="js/data.js" defer></script>
<img src="assets/images/hero/lamborghini-huracan.png" />
```

```js
image: "assets/images/catalog/mercedes-c180.png"
```

Ao mover um asset, atualizar **todas** as referências em `index.html`, `js/data.js` e `js/app.js` e o inventário em `docs/assets.md`.

## Git

- Não versionar `.vscode/`, `.cursor/`, `.env*`, dumps temporários
- Preferir commits por camada (estrutura → assets → código → docs) quando fizer sentido
- Antes de incluir imagem nova: nome conforme tabela, pasta correta, referência no código + inventário

## Checklist ao adicionar veículo com foto local

1. Salvar PNG/WebP em `assets/images/catalog/`
2. Nomear `marca-modelo[-detalhe].png`
3. Registrar path em `CARS` (`js/data.js`)
4. Atualizar linha em `docs/assets.md`

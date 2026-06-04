# Super Car — Loja de Carros Usados

Site institucional e catálogo dinâmico para a loja **Super Car** (seminovos premium).

## Como visualizar

Abra `index.html` no navegador ou use um servidor local:

```bash
python -m http.server 8080
```

Acesse: `http://localhost:8080`

## Design

- **Paleta:** fundo profundo, ouro luxo e ciano dinâmico
- **Degradês:** mesh no fundo, cards e CTAs
- **Tipografia:** [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) (títulos) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (corpo)

## Funcionalidades

- Hero com destaque (Lamborghini Huracán) e estatísticas
- Catálogo com busca, filtro por marca/categoria e faixa de preço
- Modal com detalhes do veículo
- Faixa animada de marcas com logo, legenda e link para site oficial
- Menu responsivo e formulário de contato
- Fallback de imagens e suporte a `prefers-reduced-motion`

## Estrutura

```
Projeto-SuperCar/
├── index.html
├── css/
│   ├── variables.css    # tokens (cores, tipografia, marquee)
│   └── styles.css
├── js/
│   ├── data.js          # veículos e URLs de imagem
│   └── app.js           # catálogo, filtros, modal, marquee
├── assets/
│   ├── images/          # fotos reais do estoque e hero
│   └── logos/           # ícones locais (ex.: Lexus)
└── README.md
```

## Git / GitHub

Repositório versionado em commits por camada (base → JS → assets → docs). Para publicar:

```bash
gh auth login
gh repo create Projeto-SuperCar --public --source=. --remote=origin --push
```

Ou crie o repositório no GitHub e depois:

```bash
git remote add origin https://github.com/SEU_USUARIO/Projeto-SuperCar.git
git push -u origin main
```

## Histórico de evolução (resumo)

| Etapa | Conteúdo |
|-------|----------|
| Base | HTML semântico, tokens CSS, layout hero e seções |
| Catálogo | `CARS` em `data.js`, cards, filtros e modal |
| Mídia | Imagens locais (Honda, Nissan, Mercedes, Hilux, Lexus, hero) |
| Marcas | Carrossel com logos, legendas, links externos e velocidade ajustável (`--marquee-duration`) |

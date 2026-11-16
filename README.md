# Clínica Orbe · demonstrativo VT Sites

Site multipágina estático, sem dependências em runtime.

## Publicar na Vercel
Suba esta pasta. `vercel.json` já define `buildCommand` (`node src/build.mjs`) e `outputDirectory` (`site`). A pasta `site/` também já vem gerada e pronta para deploy direto.

## Editar
- `src/data.mjs`: telefone, WhatsApp, endereço, horários, equipe, textos das especialidades, FAQ, domínio (`SITE.url`) e `SITE.demo`.
- `src/build.mjs`: templates das páginas. `src/assets/`: `style.css` e `app.js`.
- Rode `node src/build.mjs` após qualquer alteração.

## Imagens
As imagens são ilustrações geradas por `scripts/images.mjs` (precisa de `sharp`). Para usar fotos reais, substitua os arquivos de `site/assets/img` mantendo os nomes (`nome-LARGURA.webp`, versão cheia e metade) e ajuste `IMG` em `src/data.mjs` se mudar as proporções.

## Antes de usar com uma clínica real
Defina `SITE.demo = false` (libera indexação e remove o aviso), troque todos os dados fictícios e revise os textos clínicos com os profissionais responsáveis.

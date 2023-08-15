# Vue.js starter template

Features:

- 🛠 [Vue 3](https://v3.vuejs.org/guide/introduction.html)
- ⚡️ [Vite](https://vitejs.dev/guide/)
- 🗂 [PNPM](https://pnpm.io)
- 🛣 [Vue Router](https://github.com/vuejs/vue-router-next)
- 🌗 [Light and dark mode composable](https://github.com/lecoueyl/vue3-template/blob/main/src/composables/theme.js)
- 🔡 [Inter var font](https://rsms.me/inter/)
- 📄 [Github pages action](https://pages.github.com)

## Getting Started

Install and start dev server

```
npm install
npm start
```

## Deployment

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lecoueyl/vue3-template)

### Github pages

The default github action will build to `gh-page` when pushing on `main` branch.

For a project page, the base path of the repository must be specified. Add the following secret in the Github repository Settings > Secrets > Actions

| Name                        | Value                    |
| --------------------------- | ------------------------ |
| VITE_BASE_PUBLIC_PATH       | `/repository-name/`      |


## Explicando o repo

Fazemos alteracoes apenas na pasta /src.


### /src/assets

Pasta onde guardamos fontes, imagens, svg e princpilmente arquivos css.


### /src/components

Componentes em vue são templates reutilizáveis em outras paginás, nenhum componente será acessado por url, mas são inseridos em páginas. Por exemplo, a navbar, será importada pela página base da aplicacão, mas a nav nunca será acessada diretamente, ela é apenas uma parte reutilizável da página. Outro exemplo, se desejarmos ter uma tabela em duas páginas, para não ter o mesmo código em ambas, criamos um componente que contém apenas a tabela, e importamos nas páginas que usaremos.


### /src/composables

Arquivos .js, aonde nos comunicaremos com a API e teremos funções reutilizáveis


### /src/pages

Arquivos .vue, serão acessadas pelo url, quando adicionado novas páginas, adicionar o path em routes.js


### IMPORTANTE

Em vue, a estilização e scipts são feitos na própria página/componente (arquivo.vue). sempre usar <style scoped> para não modificar css em páginas não desejadas. Se o javascript ou o css for feito para modificar mais de uma página ou componente, o javascript deve ser feito em um arquivo na pasta /composables e o css na pasta /assets/styles

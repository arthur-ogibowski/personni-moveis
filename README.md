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

Componentes em vue sao templates reutilizaveis em outras paginas, nenhum componente sera acessado por url, mas sao inseridos em paginas. Por exemplo, a navbar, sera importada pela pagina base da aplicacao, mas a nav nunca sera acessada diretamente, ela e apenas uma parte reutilizavel da pagina. Outro exemplo, se desejarmos ter uma tabela em duas paginas, para nao ter o mesmo codigo em ambas, criamos um componente que contem apenas a tabela, e importamos nas paginas que usaremos.


### /src/composables

Arquivos javascript, aonde nos comunicaremos com a API e teremos funcoes reutilizaveis


### /src/pages

As paginas. Serao acessadas pelo url, quando adicionado novas paginas, adicionar o path em routes.js


### IMPORTANTE

Em vue, a estilizacao e scipts sao feitos na propria pagina/componente (arquivo.vue). sempre usar <style scoped> para nao modificar css em paginas nao desejadas. Se o javascript ou o css for feito para modificar mais de uma pagina ou componente, o javascript deve ser feito em um arquivo na pasta /composables e o css na pasta /assets/styles

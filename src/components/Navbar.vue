<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    background-color="#112620"
    text-color="#B68D40"
    active-text-color="$tertiary-color"
    @select="handleSelect"
  >
    <el-menu-item><router-link to="/">Personni Móveis</router-link></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item><router-link to="/produtos">Catálogo</router-link></el-menu-item>
    <el-menu-item><router-link to="/perfil">Meu perfil</router-link></el-menu-item>
    <el-menu-item><router-link to="/carrinho">Carrinho</router-link></el-menu-item>
    <router-link to="/criar"><el-button class="cta" color="$cta-color">Criar meu móvel</el-button></router-link>
  </el-menu>
</template>

<script>
export default {
  computed: {
    isHomepage() {
      return this.$route.path === '/';
    },
  },

}
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
.el-menu{
  z-index: 2;
  padding-right: 10px;
  text-transform: uppercase;
}
.cta{
  margin: 0 20px;
}

</style>
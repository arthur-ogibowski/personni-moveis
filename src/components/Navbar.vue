<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    :background-color="isHomepage ? 'transparent' : '#1a2930'"
    :class="{ 'not-homepage': !isHomepage }"
    text-color="#fff"
    active-text-color="$tertiary-color"
    @select="handleSelect"
  >
    <el-menu-item><router-link to="/">Personni Móveis</router-link></el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu>
      <template #title>Categorias</template>
      <el-menu-item index="2-1">Cadeiras</el-menu-item>
      <el-menu-item index="2-2">Mesas</el-menu-item>
      <el-menu-item index="2-3">Armários</el-menu-item>
    </el-sub-menu>
    <router-link to="/criar"><el-button class="cta" color="$cta-color">Criar meu móvel</el-button></router-link>
    <el-menu-item class="menu-icon-item"><router-link to="/perfil"><el-icon><User /></el-icon></router-link></el-menu-item>
    <el-menu-item class="menu-icon-item"><router-link to="/carrinho"><el-icon><ShoppingCart /></el-icon></router-link></el-menu-item>
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
}
.menu-icon-item{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  .el-icon{
    margin: 0px;
    font-size: 20px;
  }
}
.cta{
  margin-right: 10px;
}

</style>
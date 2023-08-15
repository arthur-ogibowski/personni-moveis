<template>
  <el-menu
    mode="horizontal"
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
    <el-button class="cta" color="$cta-color">Criar meu móvel</el-button>
    <el-menu-item><router-link to="/perfil">Minha Conta</router-link></el-menu-item>
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

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.el-menu{
  z-index: 2;
}

.not-homepage {
  margin-bottom: 50px;
}

</style>
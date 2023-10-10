<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    background-color="#112620"
    text-color="#B68D40"
    active-text-color="$tertiary-color"
    @select="handleSelect"
  >
    <el-menu-item><router-link to="/"><img style="width: 200px;" src="../assets/img/personniLogo-Gold.png"/></router-link></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item v-if="isUserSysColaborator()"><router-link to="/admin">Admin</router-link></el-menu-item>
    <el-menu-item><router-link to="/produtos">Catálogo</router-link></el-menu-item>
    <el-menu-item><router-link to="/perfil">Meu perfil</router-link></el-menu-item>
    <el-menu-item><router-link to="/carrinho">Carrinho {{ cartItemsCounter }}</router-link></el-menu-item>
    <router-link to="/modelar"><el-button class="cta" color="$cta-color">Começar à modelar</el-button></router-link>
  </el-menu>
</template>

<script>
import AuthService from '@/store/authService';
import cartService from '@/store/cartService';
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      cartItemsCounter: cartService.amountOfProductsInCart(),
    };
  },
  computed: {
    isHomepage() {
      return this.$route.path === '/';
    },
  },
  created() {
    this.getAmountOfProductsInCart();
  },
  methods: {
    /** Cria o eventListner e atualiza a quantidade de itens no icone do carrinho. */
    getAmountOfProductsInCart() {
      window.addEventListener('cartUpdated', () => {
        this.cartItemsCounter = cartService.amountOfProductsInCart();
      });
    },
    /** Retorna true para usuários logados com permissão de colab ou admin. */
    isUserSysColaborator() {
      //return AuthService.isUserColaborator();
      return true
    }
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
  height: 75px;
}
.cta{
  margin: 0 20px;
}

</style>
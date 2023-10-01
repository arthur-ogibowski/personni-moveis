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
    <el-menu-item><router-link to="/admin">Admin</router-link></el-menu-item>
    <el-menu-item><router-link to="/produtos">Catálogo</router-link></el-menu-item>
    <el-menu-item><router-link to="/perfil">Meu perfil</router-link></el-menu-item>
    <el-menu-item><router-link to="/carrinho">Carrinho {{ cartItemsCounter }}</router-link></el-menu-item>
    <router-link to="/criar"><el-button class="cta" color="$cta-color">Criar meu móvel</el-button></router-link>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      cartProducts: [],
      cartCMP: [],
      cartItemsCounter: JSON.parse(localStorage.getItem('carrinho')).length || ''
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
        const localStorageCart = JSON.parse(localStorage.getItem('carrinho'));
        // Se carrinho foi criado com sucesso e tem ao menos um produto, coloca qtde de produtos, senão uma string vazia.
        this.cartItemsCounter = (localStorageCart && localStorageCart.length > 0) ? localStorageCart.length : '';
      });
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
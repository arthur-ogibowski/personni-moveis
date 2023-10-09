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
    <el-menu-item v-if="isUserSysColaborator()"><router-link to="/admin">Admin</router-link></el-menu-item>
    <el-menu-item><router-link to="/produtos">Catálogo</router-link></el-menu-item>
    <el-menu-item v-if="isUserLoggedIn()"><router-link to="/perfil">Meu perfil</router-link></el-menu-item>
    <el-menu-item><router-link to="/carrinho">Carrinho {{ cartItemsCounter }}</router-link></el-menu-item>
    <router-link to="/criar"><el-button class="cta" color="$cta-color">Criar meu móvel</el-button></router-link>
  </el-menu>
</template>

<script>
import AuthService from '@/store/authService';

export default {
  data() {
    return {
      cartItemsCounter: '',
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
        const localStorageProducts = JSON.parse(localStorage.getItem('carrinho'));
        const localStorageCmps = JSON.parse(localStorage.getItem('carrinhoCMP'));
        // Se carrinho foi criado com sucesso e tem ao menos um produto, coloca qtde de produtos, senão uma string vazia.
        let totalItems = 0
        if (localStorageProducts && localStorageProducts.length > 0) {
          totalItems += localStorageProducts.length || 0;
        }
        if(localStorageCmps && localStorageCmps.length > 0) {
          totalItems += localStorageCmps.length || 0;
        }
        // Atribui total de itens se for diferente de 0 ou string vazia.
        this.cartItemsCounter = totalItems != 0 ? totalItems : '';
      });
    },
    isUserLoggedIn() {
      return AuthService.isUserLoggedIn(this.$router);
    },
    /** Retorna true para usuários logados com permissão de colab ou admin. */
    isUserSysColaborator() {
      return AuthService.isUserColaborator();
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
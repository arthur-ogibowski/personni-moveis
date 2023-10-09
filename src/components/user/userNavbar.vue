<template>
  <div>
    <h1 class="perfil-title"><el-icon style="font-size:25px"><UserFilled /></el-icon>Minha Conta</h1>
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="transparent"
    active-text-color="#000000"
  >
  <!-- <div class="profile-links"> -->
    <router-link to="/perfil"><el-menu-item index="1">Geral</el-menu-item></router-link>
    <router-link to="/perfil/pedidos"><el-menu-item index="2">Pedidos</el-menu-item></router-link>
    <router-link to="/perfil/orcamentos"><el-menu-item index="3">Orçamentos</el-menu-item></router-link>
    <router-link to="/perfil/enderecos"><el-menu-item index="4">Endereços</el-menu-item></router-link>
    <router-link to="/perfil/configuracoes"><el-menu-item index="5">Configurações</el-menu-item></router-link>
  <!-- </div> -->
    <router-link to="/perfil"><el-menu-item class="sair-btn" @click="handleLogout">Sair</el-menu-item></router-link>
  </el-menu>

  </div>
</template>

<script>
import AuthService from '@/store/authService.js';

export default {
  methods: {
    handleLogout() {
      this.$confirm('Tem certeza que deseja sair?', 'Confirmação', {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        // Usuário confirmou a saída, então faz o logout
        AuthService.clearToken();
        this.$router.push({ path: '/login' });
      }).catch(() => {
        // Usuário cancelou a saída, não faz nada
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';

// perfil do usuario 
h1.perfil-title{
    font-size: 20px;
    font-weight: 400;
    display: flex;
    margin:  50px 0 25px 0;

    & > i{
      margin-right: 10px;
    }
}
.el-menu--horizontal{
  border-bottom: 2px solid #A4A4A4;
  height: auto;
  // justify-content: space-between;

  li.el-menu-item:hover {
    color: $text-color;
  }
  & > a {
    font-size: 12px;
  }
  .router-link-active {
      font-weight: bolder;
      border-bottom: 2px solid $text-color;
      margin-bottom: -2px;
    }
}

// .profile-links {
//   display: flex;
// }

.sair-btn, .sair-btn:hover {
  color: red !important;
  border-bottom: none;
}
</style>
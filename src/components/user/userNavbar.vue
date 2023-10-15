<template>
  <div>
    <h1 class="perfil-title"><el-icon style="font-size:25px"><UserFilled /></el-icon>Minha Conta</h1>
    <el-tabs class="profile-links" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Geral" name="perfil"></el-tab-pane>
      <el-tab-pane label="Pedidos" name="pedidos"></el-tab-pane>
      <el-tab-pane label="Configurações" name="configuracoes"></el-tab-pane>
      <el-button class="sair-btn" type="text" @click="handleLogout">Sair</el-button>
    </el-tabs>
  </div>
</template>

<script>
import AuthService from '@/store/authService.js';

export default {
  data() {
    return {
      activeName: 'perfil' // Define 'first' como ativo por padrão
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name; // Atualiza o elemento ativo ao ser clicado
    },
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
  },
  watch: {
    activeName(newTab) {
      if (newTab === 'perfil') {
        this.$router.push('/perfil');
      } else if (newTab === 'pedidos') {
        this.$router.push('/perfil/pedidos');
      } else if (newTab === 'configuracoes') {
        this.$router.push('/perfil/configuracoes');
      }
    }
  },
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

.profile-links {
  display: flex;
}

.sair-btn, .sair-btn:hover {
  color: red !important;
  border-bottom: none;
}
</style>
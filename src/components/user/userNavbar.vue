<template>
  <div>
    <h1 class="perfil-title"><el-icon style="font-size:25px"><UserFilled /></el-icon>Minha Conta</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Geral" name="first"></el-tab-pane>
    <el-tab-pane label="Pedidos" name="second">
      <el-table :data="pedidos" class="perfil-table" style="width: 100%">
        <el-table-column prop="orderId" label="#" width="100" />
        <el-table-column prop="totalPrice" label="Valor Total" />
        <el-table-column prop="status" label="Status" />
        <el-table-column>
          <el-button plain>Detalhes</el-button>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="Configurações" name="third"></el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
import AuthService from '@/store/authService.js';
import axios from 'axios';

export default {
  data() {
    return {
      pedidos: [],
      page: 1,
      pageSize: 10,
    }
  },
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
  },

  created() {
    axios.get('http://localhost:8081/orders')
      .then(response => {
        this.pedidos = response.data;
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
      });
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

// .profile-links {
//   display: flex;
// }

.sair-btn, .sair-btn:hover {
  color: red !important;
  border-bottom: none;
}
</style>
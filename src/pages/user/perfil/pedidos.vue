<template>
  <div class="container">
    <userNavbar />


    <div class="perfil-content">
      <h1 class="page-title">Meus pedidos</h1>
      <el-table :data="pedidos" class="perfil-table" style="width: 100%">
        <el-table-column prop="id" label="#" width="100" />
        <el-table-column prop="data" label="Data" />
        <el-table-column prop="produtos" label="Produtos" />
        <el-table-column prop="pagamento" label="Método de pagamento" />
        <el-table-column prop="valor" label="Valor total" />
        <el-table-column prop="status" label="Status" />
        <el-table-column>
          <el-button plain>Detalhes</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import userNavbar from '@/components/user/userNavbar.vue';
import AuthService from '@/store/authService.js';

export default {
  components: {
    userNavbar,
  },
  data() {
    return {
      tableData: [], // Inicialmente vazio, será preenchido com os dados dos pedidos
    };
  },
  created() {
    AuthService.shouldRedirectToLogin(this.$router);
    this.getPedidos();
  },
  methods: {
    getPedidos() {
      const config = { headers: { Authorization: AuthService.getToken() } };

      axios.get('http://localhost:8081/orders/user-orders', config)  // Altere a URL para a endpoint correta de pedidos do usuário
        .then((response) => {
          this.tableData = response.data;  // Atualize os dados da tabela com os dados dos pedidos
        })
        .catch((error) => {
          ElMessage.error('Erro ao carregar pedidos.');
          console.error('Erro:', error);
        });
    },
  },
};
</script>
<style></style>
<template>
  <div class="container">
    <userNavbar />


    <div class="perfil-content">
      <h1 class="page-title">Meus pedidos</h1>
      <el-table :data="pedidos" class="perfil-table" style="width: 100%">
        <el-table-column prop="orderId" label="#" width="100" />
        <el-table-column prop="totalPrice" label="Valor Total" />
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
import userNavbar from '@/components/user/userNavbar.vue'
import axios from 'axios';
export default {
  components: {
    userNavbar,
  },
  data() {
    return {
      pedidos: [],
      page: 1,
      pageSize: 10,
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
<style></style>
<template>
  <div class="admin-container">
    <h1>Produtos</h1>
    <router-link :to="{path: '/admin/produtos/adicionar'}"><el-button class="admin-cta" color="$admin-cta">+ Novo produto</el-button></router-link>

    <el-table :data="tableData" style="width: 100%;" class="admin-table">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="productId" label="ID" sortable width="80" />
      <el-table-column prop="name" label="Name" sortable width="80" />
      <el-table-column prop="value" sortable label="Preço" />
      <el-table-column prop="quantity" sortable label="Estoque" />
      <el-table-column prop="description" label="Detalhes do produto" sortable width="250" />
      <el-table-column prop="editable" sortable label="Personalizável" />
      <el-table-column prop="acoes" label="Ações">
        <template #default="scope">
          <el-button class="table-edit" color="#A8A8A8" plain>
            <router-link :to="'/admin/produtos/' + scope.row.productId">Editar</router-link>
          </el-button>
          <el-button class="table-delete" color="#F56C6C" plain>...</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    axios.get('http://localhost:8081/products')
      .then(response => {
        response.data.forEach(product => this.tableData.push(product));
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
      });
  }
}
</script>

<script setup>

</script>

<style></style>
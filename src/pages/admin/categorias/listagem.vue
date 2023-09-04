<template>
  <div class="admin-container">
    <h1>Categorias</h1>
    <el-button class="admin-cta" color="$admin-cta">+ Nova categoria</el-button>

    <el-table :data="tableData" style="width: 100%;" class="admin-table">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="id" label="ID" sortable width="80" />
      <el-table-column prop="name" label="Nome" sortable width="250" />
      <el-table-column prop="Produtos cadastrados" sortable label="Produtos Cadastrados" width="250" />
      <el-table-column prop="criacao" sortable label="Possibilitar Criação" />
      <el-table-column prop="acoes" label="Ações">
        <el-button class="table-edit" color="#A8A8A8" plain>
          <router-link to="/admin/categorias/" + >Editar</router-link>
        </el-button>
        <el-button class="table-delete" color="#F56C6C" plain>...</el-button>
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
    axios.get('http://localhost:8081/category')
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
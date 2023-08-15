<template>
  <div class="admin-container">
    <h1>Produtos</h1>
    <el-button class="admin-cta" color="$admin-cta">+ Novo produto</el-button>

    <el-table :data="tableData" style="width: 100%;" class="admin-table">
        <el-table-column type="selection" width="50"/>
        <el-table-column prop="id" label="ID" sortable width="80" />
        <el-table-column prop="detalhes" label="Detalhes do produto" sortable width="250"/>
        <el-table-column prop="categorias" sortable label="Categorias" />
        <el-table-column prop="estoque" sortable label="Estoque"/>
        <el-table-column prop="preco" sortable label="Preço"/>
        <el-table-column prop="personalizavel" sortable label="Personalizável"/>
        <el-table-column prop="acoes" label="Ações"> 
            <el-button class="table-edit" color="#A8A8A8" to="/admin/produtos/:id" plain>Editar</el-button>
            <el-button class="table-delete" color="#F56C6C" plain>...</el-button>
        </el-table-column>
  </el-table>

  </div>
</template>

<script>
export default {

}
</script>

<script setup>
const tableData = [
  {
    id: '1',
    detalhes: 'Tom',
    categorias: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2',
    detalhes: 'Tom',
    categorias: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '3',
    detalhes: 'Tom',
    categorias: 'No. 189, Grove St, Los Angeles',
  }
]
</script>

<style>

</style>
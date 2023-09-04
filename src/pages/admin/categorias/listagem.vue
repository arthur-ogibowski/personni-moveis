<template>
    <div class="admin-container">
      <h1>Categorias</h1>
      <el-button class="admin-cta" color="$admin-cta">+ Novo produto</el-button>
  
      <el-table :data="pagedCategorias" style="width: 100%;" class="admin-table">
          <el-table-column type="selection" width="50"/>
          <el-table-column prop="id" label="ID" sortable width="80" />
          <el-table-column prop="name" label="Nome" sortable width="250"/>
          <el-table-column prop="quantidade" sortable label="Produtos Cadastrados" width="250"/>
          <el-table-column sortable label="Possibilitar Criação">

          </el-table-column>
          <el-table-column label="Ações"> 
              <router-link :to="{path: '/admin/categorias/' + '1'}"><el-button class="table-edit" color="#A8A8A8" plain>Editar</el-button></router-link>
              <el-button class="table-delete" color="#F56C6C" plain>...</el-button>
          </el-table-column>
          <el-pagination layout="prev, pager, next" :total="this.categorias.length" @current-change="setPage">
      </el-pagination>
    </el-table>
  

  
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categorias: [
        {"name": "Cadeiras", "id": "1", "allow_creation": true},
        {"name": "Mesas", "id": "2", "allow_creation": true},
        {"name": "Sofás", "id": "3", "allow_creation": true},
        {"name": "Poltronas", "id": "4", "allow_creation": true},
        {"name": "Camas", "id": "5", "allow_creation": true},
        {"name": "Armários", "id": "6", "allow_creation": true},
        {"name": "Estantes", "id": "7", "allow_creation": true},
        {"name": "Racks", "id": "8", "allow_creation": true},
        {"name": "Aparadores", "id": "9", "allow_creation": true},
        {"name": "Balcões", "id": "10", "allow_creation": true},
        {"name": "Buffets", "id": "11", "allow_creation": true},
        {"name": "Cristaleiras", "id": "12", "allow_creation": true},
        {"name": "Painéis", "id": "13", "allow_creation": true},
        {"name": "Roupeiros", "id": "14", "allow_creation": true},
        {"name": "Cômodas", "id": "15", "allow_creation": true},
        {"name": "Gaveteiros", "id": "16", "allow_creation": true},
        {"name": "Penteadeiras", "id": "17", "allow_creation": true},
        {"name": "Bancos", "id": "18", "allow_creation": true},
        {"name": "Banquetas", "id": "19", "allow_creation": true},
        {"name": "Bares", "id": "20", "allow_creation": true},
        {"name": "Carrinhos", "id": "21", "allow_creation": true},
        {"name": "Cristaleiras", "id": "22", "allow_creation": true},
        {"name": "Estantes", "id": "23", "allow_creation": true},
        {"name": "Fruteiras", "id": "24", "allow_creation": true},
      ],
      page: 1,
      pageSize: 10,
    }
  },
  mounted() {
    //this.categorias = Object.values(this.getCategorias())
  },
  computed: {
    pagedCategorias() {
      return this.categorias.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    },
  },
  methods: {
    getCategorias() {
      /*axios.get('http://localhost:8081/category')
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })*/
    },
    setPage(page) {
      this.page = page
    },
  },
}
</script>


<style>

</style>
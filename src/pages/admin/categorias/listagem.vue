<template>
    <div class="admin-container">
      <h1>Categorias</h1>
      <router-link :to="{path: '/admin/categorias/adicionar'}"><el-button class="admin-cta" color="$admin-cta">+ Nova Categoria</el-button></router-link>
   
      <el-table :data="categorias" style="width: 100%;" class="admin-table">
          <el-table-column type="selection" width="50"/>
          <el-table-column prop="id" label="ID" sortable width="80" />
          <el-table-column prop="name" label="Nome" sortable width="250"/>
          <el-table-column prop="allow_creation" sortable label="Possibilitar modelagem">

          </el-table-column>
          <el-table-column label="Ações" prop="id"> 
            <template #default="scope">  
              <el-button class="table-edit" color="#A8A8A8" plain>
              <router-link :to="{path: '/admin/categorias/' + scope.row.id}">Editar</router-link>
            </el-button>
              <el-button v-on:click="deleteCategory(scope.row.id)" class="table-delete" color="#F56C6C" plain>Deletar</el-button>
            </template>
          </el-table-column>
          <!--<el-pagination layout="prev, pager, next" :total="this.categorias.length" @current-change="setPage">
      </el-pagination>-->
    </el-table> 
    </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      categorias: [],
      page: 1,
      pageSize: 10,
    }
  },
  created() {
    axios.get('http://localhost:8081/category')
      .then(response => {
        this.categorias = response.data;
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
      });
  },
  mounted() {
    //this.categorias = Object.values(this.getCategorias())
  },
  computed: {
    pagedCategorias() {
      /*return this.categorias.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)*/
    },
  },
  methods: {
    /*setPage(page) {
      this.page = page
    },*/
    deleteCategory(id) {
      axios.delete(`http://localhost:8081/category/${id}`)
      .then(response => {
        this.categorias = response.data;
        ElMessage.success('Categoria deletada com Sucesso!')  
        setTimeout(() => {
                window.location.reload()
            }, 2000);
      })
      .catch(error => {
        ElMessage.error('Erro ao deletar Categoria');
      });
    },
  },
}
</script>


<style>

</style>

<template>
  <div class="admin-container">
    <h1>Usuários</h1>
    <router-link :to="{path: '/admin/usuarios/adicionar'}"><el-button class="cta">+ Novo usuário</el-button></router-link>
 
    <el-table :data="usuarios" style="width: 100%;" class="admin-table">
        <el-table-column type="selection" width="50"/>
        <el-table-column prop="userId" label="ID" sortable width="80" />
        <el-table-column prop="name" label="Nome" sortable width="*"/>
        <el-table-column prop="email" label="Email" sortable width="*"/>
        <el-table-column prop="cpf" sortable label="CPF" width="*"/>
        <el-table-column prop="phoneNumber" sortable label="Telefone" width="*"/>
        <el-table-column prop="profile" sortable label="Perfil" width="*">

        </el-table-column>
        <el-table-column label="Ações" prop="userId"> 
          <template #default="scope">  
            <router-link :to="{path: '/admin/usuarios/' + scope.row.userId}"><el-button class="table-edit" color="#A8A8A8" plain>Editar</el-button></router-link>
            <el-button v-on:click="deleteUser(scope.row.userId)" class="table-delete" color="#F56C6C" plain>Deletar</el-button>
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
import AuthService from '@/store/authService';
export default {
data() {
  return {
    usuarios: [],
    page: 1,
    pageSize: 10,
  }
},
created() {
  const config = { headers: { Authorization: AuthService.getToken() } };

  axios.get('http://localhost:8081/users', config)
    .then(response => {
       this.usuarios = response.data;
    })
    .catch(error => {
      console.error('Erro ao obter dados da API:', error);
    });
},
mounted() {
  //this.categorias = Object.values(this.getCategorias())
},
computed: {
  pagedUsuarios() {
    /*return this.categorias.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)*/
  },
},
methods: {
  /*setPage(page) {
    this.page = page
  },*/
  deleteUser(id) {
    console.log("ID:", id);
    const config = { headers: { Authorization: AuthService.getToken() } };
    axios.delete(`http://localhost:8081/users/${id}`, config)
    .then(response => {
      this.usuarios = response.data;
      ElMessage.success('Usuário deletado com Sucesso!')  
      setTimeout(() => {
              window.location.reload()
          }, 2000);
    })
    .catch(error => {
      ElMessage.error('Erro ao deletar Usuário');
    });
  },
},
}
</script>


<style>

</style>
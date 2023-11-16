<template>
    <div class="admin-container">
      <div class="top-content">
        <div class="left">
          <h1>Pedidos</h1>
          <router-link :to="{path: '/admin/categorias/adicionar'}"><el-button class="cta" color="$admin-cta">+ Novo Pedido</el-button></router-link>
        </div>
        <el-input v-model="pedidosSearch" placeholder="Procurar por nome">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>

      <el-table :data="filteredList() ? filteredList() : pedidos" style="width: 100%;" class="admin-table">
          <el-table-column prop="orderId" label="ID" sortable width="80">
            <template v-slot="scope">
              <div class="orderId">
                <h4># {{ scope.row.orderId }}</h4>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="Valor" sortable width="*">
            <template v-slot="scope">
              <div class="totalPrice">
                <h3>R$ {{ formatPrice(scope.row.totalPrice) }}</h3>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" sortable width="*">
            <template v-slot="scope">
              <div class="status">
                <h3>{{ scope.row.status }}</h3>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Ações" prop="id"> 
            <template #default="scope"> 
              <el-icon class="table-edit" size="20" color="#A8A8A8" @click="redirectToEditCategory(scope)"><Edit/></el-icon>
              <el-icon class="table-delete" size="20" color="#F56C6C" plain @click="showDeleteMessage(scope.row.id)"><Delete/></el-icon> 
            </template>
          </el-table-column>
          <!--<el-pagination layout="prev, pager, next" :total="this.categorias.length" @current-change="setPage">
      </el-pagination>-->
    </el-table> 
    </div>
</template>


<script>
import { ElLoading } from 'element-plus';
import axios from 'axios';
export default {
    data() {
    return {
      pedidos: [],
      page: 1,
      pageSize: 10,
      pedidosSearch: '',
    }
  },
  created() {
    const loading = ElLoading.service({
            lock: true,
            text: 'Carregando pedidos...',
            background: 'rgba(0, 0, 0, 0.7)'
      });
    axios.get('http://localhost:8081/orders')
      .then(response => {
        this.pedidos = response.data;
        setTimeout(() => {
            loading.close()
          }, 250)
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
      });
  },

  methods: {
    /*setPage(page) {
      this.page = page
    },*/
    redirectToEditCategory(scope) {
      return this.$router.push(`/admin/categorias/${scope.row.id}`);
    },
    filteredList() {

    },
    formatPrice(x) {
      if (x.toString().match(/\.\d{2}$/)) {
        x = x.toString().replace(/\./g, ',');
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    showDeleteMessage(scope) {
      ElMessageBox.confirm('Tem certeza que deseja remover a categoria?', 'Confirmação', {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não', // Nesse caso não faz nada.
        type: 'warning',
      })
      .then(() => {
        // Usuário marcou sim -> deletar produto e atualizar tabela.
        this.deleteCategory(scope);
        // Atualiza lista de produtos.
        const excludedCategoryId = scope.row.id;
        this.pedidos = this.pedidos.filter(pedidos => pedidos.id != excludedCategoryId);
      })
      .catch(() => {
        // Nada é feito na seleção do 'não'.
      });
    },
    deleteCategory(id) {
      axios.delete(`http://localhost:8081/category/${id}`)
      .then(response => {
        ElMessage.success('Categoria deletada com Sucesso!')  
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
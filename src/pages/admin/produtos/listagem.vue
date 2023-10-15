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
          <el-button class="table-edit" color="#A8A8A8" plain @click="redirectToEditProduct(scope)">Editar</el-button>
          <el-button class="table-delete" color="#F56C6C" plain @click="showDeleteMessage(scope)">Deletar</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    // Adquire todos produtos.
    this.getProducts();
  },
  methods: {
    /** Faz redirecionamento para tela de edição do produto. */
    redirectToEditProduct(scope) {
      return this.$router.push(`/admin/produtos/${scope.row.productId}`);
    },
    /** Deleta produto e atualiza tabela. */
    showDeleteMessage(scope) {
      ElMessageBox.confirm('Tem certeza que deseja remover o produto?', 'Confirmação', {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não', // Nesse caso não faz nada.
        type: 'warning',
      })
      .then(() => {
        // Usuário marcou sim -> deletar produto e atualizar tabela.
        this.deleteProduct(scope);
        // Atualiza lista de produtos.
        const excludedProductId = scope.row.productId;
        this.tableData = this.tableData.filter(product => product.productId != excludedProductId);
      })
      .catch(() => {
        // Nada é feito na seleção do 'não'.
      });
    },
    /** Envia requisição para remover produto. */
    deleteProduct(scope) {
      axios.delete(`http://localhost:8081/products/${scope.row.productId}`)
        .then(response => {
          ElMessage.success('O produto foi removido com sucesso!');
        })
        .catch(error => {
          console.error('Não foi possível remover o produto.', error);
        });
    },
    getProducts() {
      axios.get('http://localhost:8081/products')
        .then(response => {
          this.tableData = response.data;
        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
        });
    },
    trueOrFalse(isEditable) {
      return isEditable ? 'Sim' : 'Não';
    }
  }
}
</script>

<script setup>

</script>

<style></style>
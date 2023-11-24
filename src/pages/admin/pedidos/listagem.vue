<template>
    <div class="admin-container">
      <div class="top-content">
        <div class="left">
          <h1>Pedidos</h1>
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
          <el-table-column prop="user.name" label="Cliente" sortable width="*">
            <template v-slot="scope">
              <div class="client_name">
                <h3>{{ scope.row.user.email }}</h3>
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
          <el-table-column prop="date" label="date" sortable width="*">
            <template v-slot="scope">
              <div class="date">
                <h3>{{ scope.row.date }}</h3>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Ações" prop="id"> 
            <template #default="scope"> 
              <el-button plain @click="showDetailsModal(scope)">Detalhes</el-button>
            </template>
          </el-table-column>
          <!--<el-pagination layout="prev, pager, next" :total="this.categorias.length" @current-change="setPage">
          </el-pagination>-->
      </el-table> 
    </div>

    <el-dialog v-model="showModal" title="Pedido do cliente">
        <h2> Pedido realizado por: </h2> <h3>{{ order.user.name }}</h3>
        <h2> E-mail: </h2> <h3>{{ order.user.email }}</h3>
        <h2>Produtos comprados:</h2>
        <div v-for="item in order.orderItems" v-bind:key="item">
          <div v-for="product in item.products" v-bind:key="product">
            <h3>{{ product.name }} - valor do produto: {{ product.value }}</h3>
          </div>
        </div>
        <h2>total da compra: {{ order.totalPrice }}</h2>
        <h2>Endereço: {{ order.address }}</h2>
        <p>{{ order }}</p>
      
    </el-dialog>
</template>

<script>
import { ElLoading } from 'element-plus';
import axios from 'axios';
export default {
    data() {
    return {
      pedidos: [],
      order: null,
      page: 1,
      pageSize: 10,
      pedidosSearch: '',
      showModal: false,
    }
  },
  created() {
    this.getOrders();
  },

  methods: {
    getOrders() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Carregando pedidos...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get('http://localhost:8081/orders')
        .then(response => {
          // Transforma datas para formato dia/mes/ano.
          response.data = response.data.map(order => {
          const dataArray = order.date;
          const data = new Date(dataArray[0], dataArray[1] - 1, dataArray[2]);
          const day = data.getDate();
          const month = data.getMonth() + 1; // Meses em JavaScript são indexados de 0 a 11
          const year = data.getFullYear();
          // Atribuir a string formatada de volta a order.date
          order.date = `${day}/${month}/${year}`;
          return order;
        });
        // Fazendo set dos valores na lista de pedidos em tela.
        this.pedidos = response.data;
        setTimeout(() => {
            loading.close()
          }, 250)
        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
        });
    },
    filteredList() {

    },
    showDetailsModal(scope) {
      this.showModal = true;
      this.order = this.pedidos.find(o => o.orderId === scope.row.orderId);
    },
    formatPrice(x) {
      if (x.toString().match(/\.\d{2}$/)) {
        x = x.toString().replace(/\./g, ',');
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },

}
</script>

<style>

</style>
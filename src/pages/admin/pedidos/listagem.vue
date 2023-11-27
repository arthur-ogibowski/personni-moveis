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
                <h2>{{ formatPrice(scope.row.totalPrice) }}</h2>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="user.name" label="Cliente" sortable width="*">
            <template v-slot="scope">
              <div class="client_name">
                <h4>{{ scope.row.user.email }}</h4>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" sortable width="*">
            <template v-slot="scope">
              <div class="status">
                <el-text type="success" v-if="scope.row.status == 'CONCLUIDO'">CONCLUÍDO</el-text>
                <el-text type="danger" v-else-if="scope.row.status == 'CANCELADO'">CANCELADO</el-text>
                <el-text type="warning" v-else-if="scope.row.status == 'ATIVO'">ATIVO</el-text>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="Data" sortable width="*">
            <template v-slot="scope">
              <div class="date">
                <h4>{{ scope.row.date }}</h4>
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

    <el-dialog v-model="showModal">
      <template #header>
        <h2 class="pedidoId">Pedido <span>#{{ order.orderId }}</span></h2>
      </template>
        
        <div class="clientInfo">
          <h2> Dados do cliente: </h2>
          <h4>{{ order.user.name }}</h4>
          <h4>{{ order.user.email }}</h4>
          <h4>{{ deliveryAddress.Rua }} {{ deliveryAddress.Número }}</h4>
          <h4>{{ deliveryAddress.Observações }}</h4>
          <h4>{{ deliveryAddress.Bairro }}</h4>
          <h4>{{ deliveryAddress.Cidade }}</h4>
          <h4>{{ deliveryAddress.CEP }}</h4>
        </div>
        <div class="orderInfo">
        <h2>Produtos:</h2>
          <el-table :data="padroes" style="100%">
            <el-table-column prop="products[0].productId" label="ID" sortable width="80">
              <template v-slot="scope">
                <div class="orderId">
                  <h4># {{ scope.row.products[0].productId }}</h4>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="selectedAmountOfProducts" label="Quantidade" sortable width="130"/>
            <el-table-column prop="products[0].name" label="Nome" sortable width="*">
              <template v-slot="scope">
                <div class="client_name">
                  <h3>{{ scope.row.products[0].name }}</h3>
                </div>
              </template>
            </el-table-column>
          </el-table>

          {{ order }}

        <div v-for="item in order.orderItems" v-bind:key="item">
          <div v-for="product in item.products" v-bind:key="product">
            <h3>{{ item.selectedAmountOfProducts }}x - {{ product.name }} ({{ formatPrice(product.value) }})</h3>
          </div>
        </div>
        <h2 class="total">Total: <span>{{ formatPrice(order.totalPrice) }}</span></h2>
      </div>
      
    </el-dialog>

    <el-dialog v-model="showModalCmp">
      <template #header>
        <h2 class="pedidoId">Pedido Modelado<span>#{{ currentProdCmp }}</span></h2>
      </template>
        <div class="orderInfo">
        <h2>Produtos:</h2>
      </div>
    </el-dialog>
</template>

<script>
import { ElLoading } from 'element-plus';
import axios from 'axios';
import AuthService from '@/store/authService.js';
import jwtDecode from 'jwt-decode';

export default {
    data() {
    return {
      pedidos: [],
      showModalCmp: false,
      currentProdCmp: '',
      order: null,
      page: 1,
      pageSize: 10,
      pedidosSearch: '',
      showModal: false,
      personalizados: [],
      padroes: [],
      modelados: [],
      deliveryAddress: {},
    }
  },
  created() {
    this.getOrders();
    const token = AuthService.getToken();

    if (token) {
      const usuario = jwtDecode(token);

      if (usuario) {
        if (usuario.userRole === 'COLABORATOR' || usuario.userRole === 'ADMIN') {
          // Usuário tem permissão de colab ou admin, continue carregando a página
        } else if (usuario.userRole === 'USER') {
          this.$router.push("/"); // Para voltar à página anterior
        }
      }
    }
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

          order.orderItems.forEach(item => {
            if (item.custom) {
              this.personalizados.push(item);
            } else {
              this.padroes.push(item);
            }
          });

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
      this.personalizados = this.order.orderItems.filter(item => item.options);
      // format this "CEP: 82300-310, Cidade: Curitiba, Bairro: São Braz, Rua: Rua João Obrzut, Número: 474, Observações: " into different items into deliveryAddress array and remove text before :

      const address = this.order.deliveryAddress.split(', ');
      address.forEach(item => {
        const split = item.split(': ');
        this.deliveryAddress[split[0]] = split[1];
      });
      this.padroes = this.order.orderItems.filter(item => !item.options);
    },
    formatPrice(x) {
      return x.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },

}
</script>

<style scoped lang="scss">
.clientInfo, .orderInfo{
  h2{
    font-size: 2.5rem;
    font-weight: 800;
    margin-top: 20px;
    margin-bottom: 0;
  }
  h4{
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 10px !important;
    margin-bottom: 0;
  }
  h2.total{
    font-weight: 400;
    font-size: 2rem;
    text-align: end !important;

    span{
      font-weight: 800;
      font-size: 2.5rem;
    }
  }
}
.pedidoId {
  margin: 0;
  padding: 0;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;

  span{
    color: var(--cta-color);
    font-weight: 700;
  }
}

</style>
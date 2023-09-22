<template>
    <div class="container">
        <div class="categorias">
            <el-menu
              class="lista-categorias"
              mode="horizontal"
              background-color="transparent"
              active-text-color="#000000"
            >
            <div v-for="categoria in categorias" v-bind:key="categoria">
              <el-menu-item index="1" @click="filtrarPorCategoria(categoria.id)">{{categoria.name}}</el-menu-item>
            </div>
            </el-menu>

            <h1>Produtos</h1>

            <div class="produtos-listing">
              <div class="produto-card" v-for="product in products" :key="product">
                <router-link :to='"/produtos/" + product.productId'>
                  <el-card :body-style="{ padding: '0px' }">
                      <img
                        src="@/assets/img/cadeira1.png"
                        class="image"
                      />
                      <div style="padding: 14px">
                        <div class="bottom">
                          <h2>{{  product.name }}</h2>
                          <el-text v-if="product.quantity > 0" class="mx-1" type="success" size="small">Disponível</el-text>
                          <el-text v-else class="mx-1" type="danger" size="small">Fora de estoque</el-text>
                          <br>
                          <el-text v-if="product.editable == true" class="mx-1" type="success" size="small">Personalizável</el-text>
                          <el-text v-else class="mx-1" type="danger" size="small"></el-text>
                          <br>
                          <span v-if="product.quantity > 0">R$ {{ product.value }}</span>
                          
                        </div>
                        <br>
                        <el-button type="primary" class="cta" color="$cta-color">Detalhes</el-button>
                      </div>
                  </el-card>
                </router-link>
              </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ElLoading } from 'element-plus'

export default {
    data(){
        return{
            categorias: [],
            products: [],
            loading: true,
        }
    },
    async created() {
      const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get('http://localhost:8081/category')
        .then(response => {
          response.data.forEach(categoria => this.categorias.push(categoria));
        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
      });
      axios.get('http://localhost:8081/products')
        .then(response => {
          response.data.forEach(product => this.products.push(product));
          setTimeout(() => {
            loading.close()
          }, 250)
        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
      });
    
  },
  methods: {
    filtrarPorCategoria(categoryId) {
      const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get("http://localhost:8081/category/products-in-category/" + categoryId)
        .then(response => {
          this.product = [];
          response.data.forEach(product => this.products.push(product));
          console.log(this.products);
          this.$forceUpdate();

          setTimeout(() => {
            loading.close()
          }, 250)

        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
        });
    }
  }

}
</script>

<style scoped lang="scss">
ul.lista-categorias {
  display: flex;
  justify-content: center;
  border: 1px solid #A6A6A6;
  border-radius: 5px !important;
}
div.el-card{
    width: 200px;
}
div.produtos-listing{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  div.produto-card{
    margin: 15px;
  }
}
</style>
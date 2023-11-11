<template>
    <div class="container">

      <div class="catalogo-top">
            <h1 class="page-title">Catálogo</h1>

            <el-input v-model="productSearchInput" placeholder="Procurar produto">
              <template #prefix>
                <el-icon class="el-input__icon"><search /></el-icon>
              </template>
            </el-input>
      </div>

            <el-divider />

            <el-button v-if="this.filterCategory != ''" @click="removeSelectedCategory()">Remover Categoria</el-button>
            <div class="catalogo-content">
              <div class="filters">
                <div class="filters-item">
                <el-divider content-position="center">Categorias</el-divider>
                <el-radio-group v-model="filterCategory" size="large">
                  <el-radio-button
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.id"
                    :value="category.id">
                    {{ category.name }}
                  </el-radio-button>
                </el-radio-group>
              </div>

              <div class="filters-item">
                <el-divider content-position="center">Preço</el-divider>
                <el-radio-group @change="filterPrice" v-model="priceFilter" size="large">
                  <el-radio-button label="crescente">
                    Menor para maior 
                    <!-- Se filtro para ordenar pelo maior é selecionado -->
                    <el-icon><CaretTop /></el-icon>
                  </el-radio-button>
                  <el-radio-button label="decrescente">
                    Maior para Menor <el-icon><CaretBottom /></el-icon>
                  </el-radio-button>
                </el-radio-group>
              </div>
              
            </div>


              <div class="produtos-listing">
                <div class="produto-card" v-for="product in getFilteredProducts()" :key="product">
                  <router-link :to='"/produtos/" + product.productId'>
                    <el-card :body-style="{ padding: '0px' }">
                        <el-image v-if="product.mainImg"
                          :src="product.mainImg"
                          class="image"
                        />
                        <div v-else>
                          <img src="../../../assets/img/personniLogo-Grey.png" class="image placeholder"/>
                          </div>
                        <div style="padding: 14px">
                          <div class="card-bottom">
                            <h2>{{  product.name }}</h2>
                            <div class="card-bottom-details">
                              <div class="details-left">                            
                                <el-text v-if="product.quantity > 0" class="mx-1" type="success" size="small">Disponível</el-text>
                              <el-text v-else class="mx-1" type="danger" size="small">Fora de estoque</el-text>
                              <br>
                              <el-text v-if="product.editable == true" class="mx-1" type="success" size="small">Personalizável</el-text>
                              <el-text v-else class="mx-1" type="danger" size="small"></el-text></div>
                              <h3 v-if="product.quantity > 0">R$ {{ product.value }}</h3>
                            </div>

                          </div>
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
import { ElLoading } from 'element-plus';

export default {
    data() {
      return{
        categories: [],
        products: [],
        loading: true,
        // Filtros:
        filterCategory: '',
        productSearchInput: '',
        priceFilter: null,
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
        this.categories = response.data;
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
    });
    axios.get('http://localhost:8081/products')
      .then(response => {
        this.products = response.data;
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
    },
    /** Filtra produtos com base no input do usuário. */
    inputSearch(searchInput, products) {
      return products.filter(product => product.name.toUpperCase().includes(searchInput.toUpperCase()));
    },
    /** Filtra os produtos com base na categoria selecionada. Se nehuma foi selecionada, retorna todos produtos. */
    filterByCategory(selectedCategory, products) {
      return products.filter(product => selectedCategory == '' || product.categoryId == selectedCategory);
    },
    /** Aplica todos os filtros e retorna os produtos. */
    getFilteredProducts() {
      const filteredByCategory = this.filterByCategory(this.filterCategory, this.products);
      return this.inputSearch(this.productSearchInput, filteredByCategory);
    },
    /** Remove a categoria selecionada no momento. */
    removeSelectedCategory() {
      this.filterCategory = '';
    },
    filterPrice() {
      if (this.priceFilter == 'crescente') {
        this.products.sort((a, b) => a.value - b.value);
      } else if (this.priceFilter == 'decrescente') {
        this.products.sort((a, b) => b.value - a.value);
      }
    },
    /** Remove filtro de preço após filtro ser selecionado. */
    removePriceFilter() {
      this.priceFilter = null;
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';

div.catalogo-top{
  display: flex;
  justify-content: space-between;

  .el-input{
    height: 40px;
    width: 200px;
  }

}
div.catalogo-content{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-bottom: 50px;

  .filters-item{
    margin-bottom: 4rem;


  
  }
}
:deep(.el-radio-button__inner){
  border: 1px solid $grey-border !important;
}
div.el-card{
    width: 250px;
    transition: all 0.2s ease-in-out;
    box-shadow: none;

      &:hover{
        transform: scale(1.05);
      }

      div.card-bottom{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100px;
        max-height: 100px;

        h3{
          margin: 0;
          font-size: 1.5rem;
          font-weight: 400;
        }
        h2{
          font-size: 2rem;
          font-weight: 400;
        }

        span{
          word-break: normal;
        }

        div.card-bottom-details{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

      }
}
div.produtos-listing{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 70vw;

  div.produto-card{
    margin: 0 15px 30px 15px;
  }
}

.el-image.image, .image {
          width: 100%;
          height: 200px;
        }
.placeholder{
  object-fit: contain;
  padding: 10px;
}
</style>
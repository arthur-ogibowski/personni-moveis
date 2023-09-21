<template>
    <div class="container" v-loading="loading" element-loading-text="Carregando..."
    :element-loading-spinner="svg"
    element-loading-background="rgba(122, 122, 122, 0.9)">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
          <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
        </el-breadcrumb>


        <div class="main-single">
            <el-carousel
              direction="vertical"
              type="card"
              :autoplay="false"
            >
              <el-carousel-item v-for="item in 4" :key="item" class>
                <el-image style="width: 100px; height: 100px" :src="product.imgUrl" :fit="fit" />
              </el-carousel-item>
            </el-carousel>
            <el-image style="width: 500px; height: 500px" :src="product.imgUrl" :fit="fit" />

            <div class="info-box">
                <h2 style="font-size: 2rem;">{{  product.name }}</h2>
                <p style="font-size: 1.6rem;">{{ product.description }}</p>
                <h3 style="font-size: 1.8rem;">R${{ product.value }}</h3>
                <div class="info-box-action">
                    <router-link  :to="{path: '/produtos/' + product.productId + '/personalizar'}"><el-button color="#1a2930" size="small">Personalizar</el-button></router-link>
                    <el-button class="cta" color="$cta-color">Adicionar ao carrinho</el-button>
                </div>
            </div>


        </div>

        <hr>

        <div class="about-single">
            <h1>Descrição do Produto</h1>

            <el-table :data="product.details" style="width: 100%">
              <el-table-column prop="detailField" width="180" />
              <el-table-column prop="fieldContent" width="*" />
            </el-table>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            product: '',
            loading: true
        }
    },
    created() {
    axios.get('http://localhost:8081/products/' + this.$route.params.id)
      .then(response => {
        this.product = response.data
        this.loading = false;
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);
      });
    }
    
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/scss/basics.scss';
div.container {

    p {
        color: $user-grey;
    }
    hr{
        margin: 75px 0;
        color: $user-grey;
        border: 1px solid $user-grey;
    }
    div.main-single{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;

        .el-image{
            border: 2px solid #BABABA; 
        }
        div.el-carousel{
            div.el-carousel__item{
                width: 100px;
                height: 100px;
                background: black;
                //transform: none ; 
            }
        }
        div.info-box{
            width: 600px;
            border: 2px solid #BABABA;
            background: #F1F1F1;
            padding: 2rem;

            div.info-box-action{
                display: flex;
                flex-direction: column;
                width: fit-content;
                max-width: 150px;

                button {
                    width: fit-content;
                    margin: 0.5rem 0;
                }
            }
        }
    }
    div.about-single{

        div.el-table{
            background-color: transparent;
            margin-top: 2rem;
            :deep(.el-table__row), :deep(.el-table__cell)  {
                background-color: transparent;
                //border-bottom: 1px solid #A6A6A6;
                padding: 2rem;
            }
            :deep(.el-table__header-wrapper){
                display: none;
            }
            :deep(.el-table_1_column_1){
                border-right: 1px solid #A6A6A6;
            }
        }

        
    }
}

</style>
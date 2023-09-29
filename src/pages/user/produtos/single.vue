<template>
    <div class="container">
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
                <h2 style="font-size: 4rem;">{{  product.name }}</h2>
                <el-text v-if="product.quantity > 0" class="mx-1" type="success" size="large">Disponível</el-text>
                <el-text v-else class="mx-1" type="danger" size="large">Fora de estoque</el-text>
                <h3 style="font-size: 2.5rem;">R${{ product.value }}</h3>
                <p style="font-size: 1.6rem;">{{ product.description }}</p>
                <div class="info-box-action" v-if="product.quantity > 0">
                    <el-button class="cta" color="$cta-color" @click="addToCart">Adicionar ao carrinho</el-button>
                    <el-divider>OU</el-divider>
                    <router-link  :to="{path: '/produtos/' + product.productId + '/personalizar'}"><h1>Personalizar <el-icon><Right /></el-icon></h1></router-link>
                </div>
            </div>


        </div>

        <el-divider></el-divider>

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
import cartService from '@/store/cartService.js';
import axios from 'axios';
import { ElLoading } from 'element-plus';

export default {
    data(){
        return{
            product: '',
        }
    },
    async created() {
        const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        const id = this.$route.params.id;
        if (id != null) {
            axios.get(`http://localhost:8081/products/${this.$route.params.id}`)
                .then(response => {
                    this.product = response.data
                setTimeout(() => {
                    loading.close()
                }, 250)
            })
            .catch(error => {
                console.error('Erro ao obter dados da API:', error);
            });
        }
    },
    methods: {
        addToCart() {
            cartService.addToCart(this.product);
        }
    }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/scss/basics.scss';


div.container {

    :deep(.el-divider__text){
        background-color: #EFEFEF;
    }

    p {
        color: $user-grey;
    }
    div.main-single{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;

        .el-image{
            border: 1px solid #BABABA; 
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
            padding: 2rem;

            h2{
                margin-bottom: 0;
            }
            h3{
                color: $cta-color !important;
            }

            div.info-box-action{
                display: flex;
                flex-direction: column;
                width: fit-content;
                max-width: 150px;

                button {
                    width: fit-content;
                    margin: 0.5rem 0;
                }


                h1{
                    color: $cta-color;
                    width: 250px;
                    text-decoration: underline;
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
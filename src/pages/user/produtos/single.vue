<template>
    <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Catálogo</el-breadcrumb-item>
          <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
        </el-breadcrumb>


        <div class="main-single">
            <el-carousel :interval="5000" arrow="always" :autoplay="false">
              <el-carousel-item v-for="item in 4" :key="item">
                <el-image style="width: 500px; height: 500px" :src="product.mainImg" :fit="fit" />
              </el-carousel-item>
            </el-carousel>

            <div class="info-box">
                <h2 style="font-size: 4rem; font-weight: 400;">{{  product.name }}</h2>
                <el-text v-if="product.quantity > 0" class="mx-1" type="success" size="large">Disponível</el-text>
                <el-text v-else class="mx-1" type="danger" size="large">Fora de estoque</el-text>
                <h3 style="font-size: 2.5rem; font-weight: 400;">{{ formatPrice(product.value) }}</h3>
                <p style="font-size: 1.6rem; ont-weight: 400;">{{ product.description }}</p>
                <div class="info-box-action" v-if="product.quantity > 0">
                    <el-button class="cta" color="$cta-color" @click="addToCart">Adicionar ao carrinho</el-button>
                    <el-divider v-if="product.editable">OU</el-divider>
                    <router-link  v-if="product.editable" :to="{path: '/produtos/' + product.productId + '/personalizar'}"><h1>Personalizar <el-icon><Right /></el-icon></h1></router-link>
                </div>
            </div>


        </div>

        <el-divider></el-divider>

        <div class="about-single">
            <h1>Detalhes do Produto</h1>

            <el-table :data="product.details" style="width: 100%">
              <el-table-column prop="fieldContent" width="180" />
              <el-table-column prop="detailField" width="*" />
            </el-table>

        </div>
        
    </div>
</template>

<script>
import cartService from '@/store/cartService.js';
import axios from 'axios';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus'

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
            ElMessage({
              message: 'Produto adicionado ao carrinho',
              type: 'success',
            })
        },
        formatPrice(){
            return this.product.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        
        }
    }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/scss/basics.scss';


div.container {

    :deep(.el-divider__text){
        background-color: $primary-color;
    }

    p {
        color: $user-grey;
    }
    div.main-single{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
        margin-top: 50px;

        .el-image{
            border: 1px solid $grey-border; 
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
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 2rem;
            background-color: $primary-color;
            border: 1px solid $grey-border;

            h2{
                margin-bottom: 0;
                margin-top: 0;
            }
            h3{
                color: $text-color !important;
            }
            .el-text{
                display: inline-block;
                width: 100%;
                text-align: start;
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
                border-bottom: 0;
                padding: 2rem;
            }
            :deep(.el-table__header-wrapper){
                display: none;
            }
            :deep(tr.el-table__row > td:first-child){
                border-right: 1px solid #A6A6A6;
            }
        }

        h1{
            font-weight: 300;
        }

        
    }
}


:deep(div.el-carousel__item){
    width: 500px !important;
    height: 500px !important;
}
:deep(.el-carousel__container){
    height: 500px;
}

</style>
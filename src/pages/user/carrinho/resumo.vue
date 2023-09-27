<template>
  <div class="container">
    <h1 class="page-title">Carrinho</h1>

    <div class="criar-content" v-if="this.cartProducts.length > 0">
        <el-button class="cta" color="$cta-color" @click="this.removeAll()">Esvaziar carrinho</el-button>
    </div>
    
    <div class="carrinho-content">
        <div class="listagem-produtos">
            <div class="produto-card" v-for="product in cartProducts" :key="product">
                <el-card class="carrinho-item">
                    <img
                    src="@/assets/img/cadeira1.png"
                    class="image"
                    />
                    <h2> {{ product.productName }} </h2>
                    <div class="quantidade">
                        <p>Quantidade</p>
                        <el-input-number v-model="product.amount" size="small" :min="1" :max="100" label="Quantidade"></el-input-number>
                    </div>
                    <div class="preco">
                        <p>Preço</p>
                        <h2> {{ product.value }} </h2>
                    </div>
                    <div class="deletar">
                        <el-icon><Delete /></el-icon>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="preco-final">
            <h2>Total: {{ this.calcularTotal() }}</h2>
            <router-link to="/checkout"><el-button class="cta" color="$cta-color" >Ir para o pagamento</el-button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cartService from '../../../cartService';

export default {
    data() {
        return{
            quantidade: 1,
            precoTotal: 0,
            cartProducts: [
                {
                    productId: null,
                    productName: '',
                    value: null,
                    imageurl: null,
                    amount: 0
                }
            ]
        }
    },
    created() {
        this.getCartProductsFromLocalStorage();
    },
    methods: {
        calcularTotal() {
            //const calcularTotalDaCompra = (listaDeProdutos) => listaDeProdutos.reduce((total, produto) => total + produto.preco, 0);
            console.log(this.cartProducts.reduce((total, product) => total + product.value * product.amount, 0));
            return this.cartProducts.reduce((total, product) => total + product.value * product.amount, 0);
        },
        getCartProductsFromLocalStorage() {
            this.cartProducts = cartService.getCartItens();
        },
        removeAll() {
            // Atualiza localStorage e lista de produtos em tela.
            cartService.removeAllfromCart(this.cartProducts);
        }
    },

}
</script>

<style scoped lang="scss">

@import "@/assets/styles/scss/basics.scss";

div.carrinho-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .carrinho-item{
        width: 70vw;
        margin: 10px 0;

        :deep(.el-card__body){
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .image{
            width: 200px;
            height: 200px;
        }
        
        h2{
            font-size: 20px;
        }

        .quantidade, .preco {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            p{
                color: $user-grey;
            }
        }
    }
}

</style>
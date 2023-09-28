<template>
  <div class="container">
    <h1 class="page-title">Carrinho</h1>

    <h2 class="page-title" v-if="cartIsEmpty()">Seu carrinho está vazio no momento.</h2>

    <div class="criar-content" v-if="!cartIsEmpty()">
        <el-button class="cta" color="$cta-color" @click="removeAll()">Esvaziar carrinho</el-button>
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
                        <el-icon @click="removeOneProduct(product)"><Delete /></el-icon>
                    </div>
                </el-card>
            </div>
        </div>
        
        <div class="preco-final" v-if="!cartIsEmpty()">
            <h2>Total: {{ calcularTotal() }}</h2>
            <router-link to="/checkout"><el-button class="cta" color="$cta-color" >Ir para o pagamento</el-button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cartService from '../../../cartService';
import { ElMessageBox } from 'element-plus';

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
                    amount: 1
                }
            ]
        }
    },
    created() {
        // Inicializa lista de produtos do carrinho (em tela) com os produtos adicionados no localstorage.
        this.getCartProductsFromLocalStorage();
    },
    methods: {
        calcularTotal() {
            return this.cartProducts.reduce((total, product) => total + product.value * product.amount, 0);
        },
        getCartProductsFromLocalStorage() {
            this.cartProducts = cartService.getCartItems();
        },
        /** Remove todos os itens do carrinho (no local storage e na lista em tela). */
        removeAll() {
            ElMessageBox.confirm('Tem certeza que deseja esvaziar o carrinho?', 'Confirmação', {
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não', // Nesse caso não faz nada.
                type: 'warning',
            })
            .then(() => {
                // Esvazia o carrinho em local storage.
                cartService.removeAllfromCart();
                // Esvazia lista de produtos em tela.
                this.cartProducts = [];
            })
            .catch(() => {
                // Se o usuário clicar em "Não" ou fechar a caixa de diálogo, nada precisa ser feito.
            });
        },

        removeOneProduct(product) {
            cartService.removeFromCart(product);
            // remove da lista em tela.
            const itemIndex = this.cartProducts.findIndex((item) => item.productId === product.productId);
            this.cartProducts.splice(itemIndex, 1);
        },

        /** Retorna um boolean para indicar se carrinho está vazio. */
        cartIsEmpty() {
            return this.cartProducts.length < 1;
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
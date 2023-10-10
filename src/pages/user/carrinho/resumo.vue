<template>
  <div class="container">
    <h1 class="page-title">Carrinho</h1>

    <div class="criar-content" v-if="!cartIsEmpty() || !cmpIsEmpty()">
        <el-button class="cta" color="$cta-color" @click="removeAll()">Esvaziar carrinho</el-button>
    </div>

    <h1 class="page-title" v-if="cartIsEmpty()">Não há produtos no seu carrinho no momento.</h1>
    
    <!-- Produtos -->
    <div class="carrinho-content">
        <div class="listagem-produtos">
            <div class="produto-card" v-for="product in cartProducts" :key="product">
                <el-card class="carrinho-item">
                    <img
                    :src="getImgPath(product.mainImgUrl)"
                    class="image"
                    />
                    <h2> {{ product.name }} </h2>
                    <div class="quantidade">
                        <p>Quantidade</p>
                        <el-input-number v-model="product.amount" size="small" :min="0" :max="100" label="Quantidade" @input="updateCurrentProduct(product)"></el-input-number>
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
    </div>

    <!-- CMP -->
    <h1 class="page-title" v-if="!cmpIsEmpty()">Móveis criados por você:</h1>
    <div class="carrinho-content">
        <div class="listagem-produtos">
            <div class="produto-card" v-for="cmp in cmpProducts" :key="cmp">
                <el-card class="carrinho-item">
                    <img
                    :src="getImgPath(cmp.imgUrl)"
                    class="image"
                    />
                    <h2> CMP </h2>
                    <div class="quantidade">
                        <p>Quantidade</p>
                        <el-input-number v-model="cmp.amount" size="small" :min="0" :max="100" label="Quantidade" @input="updateCurrentProductCmp(cmp)"></el-input-number>
                    </div>
                    <div class="preco">
                        <p>Preço</p>
                        <h2> {{ cmp.value }} </h2>
                    </div>
                    <div class="deletar">
                        <el-icon @click="removeOneCmp(cmp)"><Delete /></el-icon>
                    </div>
                </el-card>
            </div>
        </div>
    </div>

    <!-- Total da compra no carrinho -->
    <div class="preco-final" v-if="!cartIsEmpty() || !cmpIsEmpty()">
        <h2>Total: {{ calcularTotal() }}</h2>
        <router-link to="/checkout"><el-button class="cta" color="$cta-color">Ir para o pagamento</el-button></router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cartService from '@/store/cartService.js';
import { ElMessageBox } from 'element-plus';
import AuthService from '@/store/authService';

export default {
    data() {
        return{
            cartProducts: [
                {
                    productId: null,
                    name: '',
                    value: null,
                    mainImgUrl: '',
                    amount: 1
                }
            ],
            cmpProducts: []
        }
    },
    created() {
        // Inicializa lista de produtos do carrinho (em tela) com os produtos adicionados no localstorage.
        this.getCartProductsFromLocalStorage();
        this.getCartCmpProductsFromLocalStorage();
    },
    methods: {
        // Produto
        calcularTotal() {
            const totalProducts = this.cartProducts.reduce((total, product) => total + product.value * product.amount, 0);
            const totalCmps = this.cmpProducts.reduce((total, cmp) => total + cmp.value * cmp.amount, 0);
            return totalProducts + totalCmps;
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
                cartService.removeAllFromCmpCart();
                // Esvazia lista de produtos e cmp em tela.
                this.cartProducts = [];
                this.cmpProducts = [];
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
        },
        getImgPath(img) {
            // Carrega imagem do contexto local em tempo de excução,
            // permitindo alterar imagens estáticas dinamicamente.
            return new URL(`/src/assets/img/${img}`, import.meta.url).href
        },
        // Atualiza produtos do carrinho antes de ir para o checkout, setando as 
        // beforeChekout() {
        //     // Antes de permitir entrada no checkout, checa se usuário fez login - se fez continua para checkout,
        //     // senão redireciona para /login.
        //     AuthService.shouldRedirectToLogin(this.$router);
        //     this.$router.push('/checkout');
        // },
        /** Atualiza carrinho em local storage com valores inseridos pelo usuário em tela */
        updateCurrentProduct(product) {
            if (product.amount < 1) {
                // Se quantidade do produto foi reduzida até 0, remove da lista e local storage.
                this.removeOneProduct(product);
            } else {
                // Senão, só faz atualização dos novos valores.
                cartService.updateCart(this.cartProducts);
            }
        },

        // Produto CMP.
        updateCurrentProductCmp(cmp) {
            if (cmp.amount < 1) {
                // Se quantidade do produto foi reduzida até 0, remove da lista e local storage.
                this.removeOneCmp(cmp);
            } else {
                // Senão, só faz atualização dos novos valores.
                cartService.updateCmpCart(this.cmpProducts);
            }
        },
        getCartCmpProductsFromLocalStorage() {
            this.cmpProducts = cartService.getCmpItems();
        },
        cmpIsEmpty() {
            return this.cmpProducts.length < 1;    
        },
        removeOneCmp(cmp) {
            cartService.removeOneCmpFromCart(cmp);
            // remove da lista em tela.
            const itemIndex = this.cmpProducts.findIndex((item) => item.id === cmp.id);
            this.cmpProducts.splice(itemIndex, 1);
        },
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
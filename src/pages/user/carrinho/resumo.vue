<template>
  <div class="container" id="carrinho-container">

    <div class="carrinho-content">
        <h1 class="page-title">Carrinho</h1>

        <div class="criar-content" v-if="!cartIsEmpty() || !cmpIsEmpty()">
            <el-text type="info" tag="ins"  style="cursor: pointer;" @click="removeAll()">Esvaziar carrinho</el-text>
        </div>

        <h1 class="page-title" v-if="cartIsEmpty() & cmpIsEmpty() ">Não há produtos no seu carrinho no momento.</h1>

        <!-- Produtos -->

            <div class="listagem-produtos">
                <div class="produto-card" v-for="product in cartProducts" :key="product">
                    <el-card class="carrinho-item" shadow="never">
                        <img v-if="product.mainImg" :src=product.mainImg
                        class="image"
                        />
                        <img v-else
                        :src="storeConfig.placeholder"
                        class="image"
                        />
                        <h2> {{ product.name }} </h2>
                        <div class="quantidade">
                            <p>Quantidade</p>
                            <el-input-number v-model="product.amount" size="small" :min="0" :max="100" label="Quantidade" @input="updateCurrentProduct(product)"></el-input-number>
                        </div>
                        <div class="preco">
                            <p>Preço</p>
                            <h2>{{ formatPrice(product.value) }} </h2>
                        </div>
                        <div class="deletar">
                            <el-icon @click="removeOneProduct(product)"><DeleteFilled /></el-icon>
                        </div>
                    </el-card>
                </div>
            </div>

        <!-- CMP -->
        <h1 style="margin-top: 2rem;" class="page-title" v-if="!cmpIsEmpty()">Móveis modelados:</h1>
            <div class="listagem-produtos">
                <div class="produto-card" v-for="cmp in cmpProducts" :key="cmp">
                    <el-card class="carrinho-item" shadow="never">
                        <img
                        :src="storeConfig.placeholder"
                        class="image"
                        />
                        <h2>Móvel modelado</h2>
                        <div class="quantidade">
                            <p>Quantidade</p>
                            <el-input-number v-model="cmp.amount" size="small" :min="0" :max="100" label="Quantidade" @input="updateCurrentProductCmp(cmp)"></el-input-number>
                        </div>
                        <div class="preco">
                            <p>Preço</p>
                            <h2>{{ formatPrice(cmp.value) }} </h2>
                        </div>
                        <div class="deletar">
                            <el-icon @click="removeOneCmp(cmp)"><DeleteFilled /></el-icon>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>

        <!-- Total da compra no carrinho -->
        <div class="side-info" v-if="!cartIsEmpty() || !cmpIsEmpty()">
            <el-card class="box-card" shadow="never">
                    <div class="card-header card-item">
                        <h2>Resumo</h2>
                    </div>
                    <div class="card-item count-products">
                        <el-text type="info" size="small">Móveis prontos / personalizados ({{ cartProducts.length }} ite{{ cartProducts.length == 1 ? "m" : "ns" }}): </el-text><h4>{{ calcularTotalProdutosProntos() != 0 ? formatPrice(calcularTotalProdutosProntos()) : "--" }}
                        </h4>
                    </div>
                    <div class="card-item count-products">
                        <el-text type="info" size="small">Móveis modelados: ({{ cmpProducts.length }} ite{{ cmpProducts.length == 1 ? "m" : "ns" }}): </el-text><h4> {{ calcularTotalProdutosCmp() != 0 ? "R$ " + formatPrice(calcularTotalProdutosCmp()) : "--" }}
                        </h4>
                    </div>
                    <div class="card-item subtotal">
                        <el-text type="info" size="medium">Subtotal ({{ products.length }} itens): </el-text><h3>{{ formatPrice(calcularTotal()) }}</h3>
                    </div>

                    <router-link to="/checkout"><el-button class="cta" color="var(--cta-color)">Ir para o pagamento <el-icon><ArrowRightBold /></el-icon></el-button></router-link>
                   
                </el-card>
            </div>
    </div>
</template>

<script>
import cartService from '@/store/cartService.js';
import { ElLoading, ElMessageBox, ElMessage } from 'element-plus';
import AuthService from '@/store/authService.js';
import axios from 'axios';

export default {
    data() {
        return{
            cartProducts: [
                {
                    productId: null,
                    name: '',
                    value: null,
                    mainImg: '',
                    amount: 1
                }
            ],
            cmpProducts: [],
            products: [],
            totalProducts: 0, // preco dos itens padrao do carrinho
            totalCmps: 0, // preco dos itens modelados do carrinho
            storeConfig: {
                placeholder: '',
            },
        }
    },
    created() {
        const loading = ElLoading.service({
            lock: true,
            text: 'Carregando carrinho...',
            background: 'rgba(0, 0, 0, 0.7)'
      });
        // Inicializa lista de produtos do carrinho (em tela) com os produtos adicionados no localstorage.
        this.getCartProductsFromLocalStorage();
        this.getCartCmpProductsFromLocalStorage();
        this.getStoreConfig();

        this.products = this.cartProducts.concat(this.cmpProducts);
        setTimeout(() => {
            loading.close()
        }, 250)
    },
    methods: {
        // Produto.
        calcularTotal() {
            // this.totalProducts = cartService.totalCartValue();
            // return this.totalProducts;
            const totalProdutosProntos = this.calcularTotalProdutosProntos();
            const totalProdutosCmp = this.calcularTotalProdutosCmp();

            return totalProdutosProntos + totalProdutosCmp;
        },
        totalProductOptions() {
            this.cartProducts = cartService.productCartValue();
            return this.cartProducts;
        },
        totalcmpOptions() {
            this.cmpProducts = cartService.cmpCartValue();
            return this.cmpProducts;
        },
        getCartProductsFromLocalStorage() {
            this.cartProducts = cartService.getCartItems();
        },

        calcularTotalProdutosProntos() {
            let totalProdutosProntos = 0;

            for (const produto of this.cartProducts) {
                totalProdutosProntos += produto.value * produto.amount;
            }

            return totalProdutosProntos;
        },

        calcularTotalProdutosCmp() {
            let totalProdutosCmp = 0;

            for (const produto of this.cmpProducts) {
                totalProdutosCmp += produto.value * produto.amount;
            }

            return totalProdutosCmp;
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
                cartService.removeAllFromCarts();
                // Esvazia lista de produtos e cmp em tela.
                this.cartProducts = [];
                this.cmpProducts = [];
            })
            .catch(() => {
                // Se o usuário clicar em "Não" ou fechar a caixa de diálogo, nada precisa ser feito.
            });
        },
        calcularFrete() {
            let frete = 0;
            /*if (this.products && this.products.length > 0) {
                frete += this.products.length * 10;
            }*/
            return frete;
        },
        formatPrice(x) {
            // to BRL
            return x.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
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
        /** Atualiza carrinho em local storage com valores inseridos pelo usuário em tela */
        updateCurrentProduct(product) {
            if (product.amount < 1) {
                // Se quantidade do produto foi reduzida até 0, remove da lista e local storage.
                this.removeOneProduct(product);
            } else {
                // Senão, só faz atualização dos novos valores.
                // // product.value = cartService.totalProductValue(product);
                // product.amount = Math.floor(product.amount); // Certifique-se de que a quantidade seja um número inteiro

                // // Adiciona o valor do produto ao total acumulado no componente
                // product.totalAmount = product.amount * product.value;
                // this.totalProductsAmount = cartService.totalProductValue();

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
        getStoreConfig() {
            const config = { headers: { Authorization: AuthService.getToken() } };
            axios.get(`http://localhost:8081/store`, config)
            .then((response) => {
            if (response.status === 200) {
                this.storeConfig.placeholder = response.data.storePlaceholdeImgPath
            
            } else {
                ElMessage.error('Erro ao receber config da empresa:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados da API:', error);
            });
        },
    },

}
</script>

<style scoped lang="scss">

@import "@/assets/styles/scss/basics.scss";


#carrinho-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .preco-final {
      display: flex;
      flex-direction: column;
    }
    .side-info {
        flex-basis: 30%;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .box-card {
            width: 100%;
            margin-bottom: 20px;
        }

        .el-card {
            background-color: $primary-color;
            :deep(.el-card__body) {
              display: flex;
              border: 1px solid $grey-border;
              flex-direction: column;
              align-items: baseline;
              padding: 3rem;

              a{
                align-self: center;
                width: 100%;

                .cta{
                    width: 100%;
                }
              }
            }

            h2 {
              display: flex;
              align-items: center;
              font-size: 20px;
              margin: 0;

              i {
                margin-right: 10px;
              }
            }

            h3{
                font-weight: 400;
                font-size: 18px;
                margin-bottom: 5px;
                margin-top: 0px;
            }

            h4 {
              font-size: 14px;
              font-weight: 400;
              margin-top: 0px;
            }

            .card-item{
                padding: 0 0 16px 0;
            }

            .card-item-inner {
                font-size: 12px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 2rem;
                border-bottom: 1px solid var(--el-card-border-color);

                    .card-item-about {
                      width: 70%;
                      padding-right: 4rem;

                      .el-text--small {
                          overflow: hidden;
                          text-overflow: ellipsis;
                          word-break: normal;
                        }
                    }

                    .card-item-price {
                      width: 30%;
                      text-align: end;
                      //margin-left: 30%;
                    }

            }

            .card-item.subtotal {
              display: flex;
               justify-content: flex-end;
              align-items: baseline;

              h4 {
                margin-bottom: 0px;
              }
              h3{
                margin-left: 1rem;
              }
            }

            .card-item.count-products {
              display: flex;
               justify-content: flex-end;
              align-items: baseline;

              h4{
                margin-left: 1rem;
                margin-bottom: 0px;
              }
            }


            .preco-final {
                font-size: 20px;
                padding: 20px;
                text-align: center;

                h3 {
                    color: green;
                }
            }
        }

        .actions {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            button {
                width: 100%;
                margin: 10px 0;
            }
        }

    
    }
}

div.carrinho-content{
    margin-right: 30px;

    .carrinho-item{
        width: 55vw;
        margin: 10px 0;
        border: 1px solid $grey-border;

        :deep(.el-card__body){
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }


        .image{
            width: 150px;
            height: 150px;
            object-fit: contain;
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

        div.deletar{
            cursor: pointer;

            &:hover{
                color: red;
            }

            .el-icon, svg{
                color: $user-grey;
                height: 1.6rem !important;
                width: 1.6rem !important;
            }
        }
    }
}


</style>
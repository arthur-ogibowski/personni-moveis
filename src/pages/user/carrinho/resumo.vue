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
                        <img :src=product.mainImg
                        class="image"
                        />
                        <h2> {{ product.name }} </h2>
                        <div class="quantidade">
                            <p>Quantidade</p>
                            <el-input-number v-model="product.amount" size="small" :min="0" :max="100" label="Quantidade" @input="updateCurrentProduct(product)"></el-input-number>
                        </div>
                        <div class="preco">
                            <p>Preço</p>
                            <h2> R${{ product.value }} </h2>
                        </div>
                        <div class="deletar">
                            <el-icon @click="removeOneProduct(product)"><Delete /></el-icon>
                        </div>
                    </el-card>
                </div>
            </div>

        <!-- CMP -->
        <h1 class="page-title" v-if="!cmpIsEmpty()">Móveis modelados:</h1>
            <div class="listagem-produtos">
                <div class="produto-card" v-for="cmp in cmpProducts" :key="cmp">
                    <el-card class="carrinho-item" shadow="never">
                        <img
                        :src="cmp.img"
                        class="image"
                        />
                        <h2> CMP </h2>
                        <div class="quantidade">
                            <p>Quantidade</p>
                            <el-input-number v-model="cmp.amount" size="small" :min="0" :max="100" label="Quantidade" @input="updateCurrentProductCmp(cmp)"></el-input-number>
                        </div>
                        <div class="preco">
                            <p>Preço</p>
                            <h2> R${{ cmp.value }} </h2>
                        </div>
                        <div class="deletar">
                            <el-icon @click="removeOneCmp(cmp)"><Delete /></el-icon>
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
                        <el-text type="info" size="small">Móveis prontos / personalizados ({{ cartProducts.length }} ite{{ cartProducts.length == 1 ? "m" : "ns" }}): </el-text><h4>{{ totalProducts != 0 ? "R$ " + formatPrice(totalProducts) : "--" }}
                        </h4>
                    </div>
                    <div class="card-item count-products">
                        <el-text type="info" size="small">Móveis modelados: ({{ cmpProducts.length }} ite{{ cmpProducts.length == 1 ? "m" : "ns" }}): </el-text><h4> {{ totalCmps != 0 ? "R$ " + formatPrice(totalCmps) : "--" }}
                        </h4>
                    </div>
                    <div class="card-item subtotal">
                        <!-- <el-text type="info" size="medium">Subotal ({{ products.length }} itens): </el-text><h3> R$ {{ formatPrice(calcularTotal()) }}</h3> -->
                    </div>

                    <router-link to="/checkout"><el-button class="cta" color="$cta-color">Ir para o pagamento <el-icon><ArrowRightBold /></el-icon></el-button></router-link>
                   
                </el-card>
            </div>
    </div>
</template>

<script>
import cartService from '@/store/cartService.js';
import { ElLoading, ElMessageBox } from 'element-plus';

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
            totalProducts: "", // preco dos itens padrao do carrinho
            totalCmps: "", // preco dos itens modelados do carrinho
        }
    },
    created() {
        const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
        // Inicializa lista de produtos do carrinho (em tela) com os produtos adicionados no localstorage.
        this.getCartProductsFromLocalStorage();
        this.getCartCmpProductsFromLocalStorage();

        this.products = this.cartProducts.concat(this.cmpProducts);
        setTimeout(() => {
            loading.close()
        }, 250)
    },
    methods: {
        // Produto.
        calcularTotal() {
            this.totalProducts = cartService.totalCartValue();
        },
        totalProductOptions() {
            //this.cartProducts = cartService.productCartValue();
        },
        totalcmpOptions() {
            //this.cmpProducts = cartService.cmpCartValue();
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
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            border: 0px;
            :deep(.el-card__body) {
              display: flex;
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
              justify-content: end;
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
              justify-content: end;
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
        border: none !important;

        :deep(.el-card__body){
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }


        .image{
            width: 150px;
            height: 150px;
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
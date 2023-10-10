<script setup>
import { LocationFilled, WalletFilled, StarFilled, Select } from '@element-plus/icons-vue'
</script>

<template>
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      background-color="#FEFEFE"
      text-color="#112620"
      active-text-color="$tertiary-color"
      @select="handleSelect"
    >
    <el-menu-item><router-link to="/"><img style="width: 200px;" src="../../../assets/img/personniLogo-Green.png"/></router-link></el-menu-item>

      <el-steps align-center :active="currentStep" finish-status="success" simple class="checkout-steps">
            <el-step title="Endereço de entrega" :icon="LocationFilled"/>
            <el-step title="Forma de pagamento" :icon="WalletFilled" />
            <el-step title="Finalizar pedido" :icon="Select"/>
        </el-steps>
    </el-menu>

    <div class="container">

        <div class="carrinho-content">

            <div class="endereco" v-if="currentStep == 0">
                <h1>Endereço de entrega</h1>
                <el-form :model="endereco" label-position="top">
                    <el-col :span="10">
                        <el-form-item label="CEP">
                            <el-input placeholder="#####-###" v-model="endereco.cep" required @blur="consultarCEP" v-mask="'#####-###'" maxlength="9"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-alert type="info" v-if="!cepExists" show-icon :closable="false">
                          <p>O endereço será automaticamente preenchido assim que o CEP for validado.</p>
                    </el-alert>

                    <div class="after-cep" v-loading="cepLoading">
                        <el-form-item label="Rua">
                            <el-input v-model="endereco.rua"  :disabled="!cepExists" required></el-input>
                        </el-form-item>
                        <div class="small-inputs">
                            <el-form-item label="Número">
                                <el-input v-model="endereco.numero"  :disabled="!cepExists" required></el-input>
                            </el-form-item>
                            <el-form-item label="Complemento (Opcional)">
                                <el-input v-model="endereco.complemento" :disabled="!cepExists" ></el-input>
                            </el-form-item>
                            <el-form-item label="Cidade">
                                <el-input v-model="endereco.cidade"  :disabled="!cepExists" required></el-input>
                            </el-form-item>
                            <el-form-item label="Estado">
                                <el-input v-model="endereco.estado"  :disabled="!cepExists" required></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>

                <div class="actions">
                    <router-link to="/carrinho"><el-button type="info" plain><el-icon><DArrowLeft /></el-icon> Retornar ao carrinho</el-button></router-link>
                    <el-button type="primary" @click="nextStep">Próximo passo <el-icon><ArrowRightBold /></el-icon></el-button>
                </div>
            </div>

            <div class="forma-pagamento" v-if="currentStep == 1">
                <h1>Forma de pagamento</h1>

                <el-radio-group v-model="metodoPagamento">
                    <el-radio label="2" size="large" border>PIX</el-radio>
                    <el-radio label="1" size="large" border :default="true">Cartão de crédito</el-radio>
                </el-radio-group>

                <el-form :model="endereco" v-if="metodoPagamento == 1">
                    <el-form-item label="Nome no cartão">
                        <el-input v-model="cartao.nomeCartao"></el-input>
                    </el-form-item>
                    <el-form-item label="Número do cartão">
                        <el-input placeholder="#### #### #### ####" maxlength="15" v-model="cartao.NumeroCartao"></el-input>
                    </el-form-item>
                    <div class="smaller-inputs">
                    <el-form-item label="Mês">
                        <el-input placeholder="##" maxlength="2" v-model="cartao.mes"></el-input>
                    </el-form-item>
                    <el-form-item label="Ano">
                        <el-input placeholder="##" maxlength="2" v-model="cartao.ano"></el-input>
                    </el-form-item>
                    <el-form-item label="CVV">
                        <el-input placeholder="###" maxlength="3" v-model="cartao.CvvCartao"></el-input>
                    </el-form-item>
                </div>
                </el-form>

                <div class="actions">
                    <el-button type="info" plain @click="previousStep"><el-icon><ArrowLeftBold /></el-icon> Voltar</el-button>
                    <el-button type="primary" @click="nextStep">Próximo passo <el-icon><ArrowRightBold /></el-icon></el-button>
                </div>

            </div>

            <div class="side-info" v-if="currentStep !== 3">

                <h1 v-if="currentStep == 2">Finalizar pedido</h1>

                <el-card class="box-card" shadow="never">
                    <div class="card-header card-item">
                        <h2><el-icon><GoodsFilled /></el-icon> Resumo do pedido</h2>
                    </div>
                    <div class="card-item" v-for="product in products" :key="product">
                        <div class="card-item-inner">
                            <div class="card-item-about">
                                <h3>{{ product.quantity }} x {{ product.name }}</h3>
                                <el-text type="info" size="small">{{ product.description }}</el-text>
                            </div>
                            <div class="card-item-price">
                                <h4>R$ {{ formatPrice(product.value) }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-item frete">
                        <el-text type="info" size="small">Frete: </el-text><h4> {{ calcularFrete() != 0 ? "R$" + formatPrice(calcularFrete()) : "--" }}
                        </h4>
                    </div>
                    <div class="card-item subtotal">
                        <el-text type="info" size="medium">Total ({{ products.length }} itens): </el-text><h3> {{ totalPrice() != 0 ? "R$" + formatPrice(totalPrice()) : "--" }}
                        </h3>
                    </div>
                   

                </el-card>

                <div class="actions" v-if="currentStep == 2">
                    <el-button type="info" plain @click="previousStep"><el-icon><ArrowLeftBold /></el-icon> Voltar</el-button>
                    <el-button type="success" @click="Pagar" size="large">Confirmar</el-button>
                </div>
            </div>

            <div class="final-step" v-if="currentStep == 3">
                <h1>Pedido concluído</h1>
                <div class="mega-icon">
                    <el-icon color="#67c23a"><SuccessFilled /></el-icon>
                </div>

                <router-link to="/"><el-text tag="ins" type="info">Voltar para a página inicial</el-text></router-link>
                

            </div>

        </div>

    </div>
</template>

<script>
import cartService from '@/store/cartService.js';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus'

export default {
    data() {
        return {
            currentStep: 0,
            metodoPagamento: 1,
            selected: [],
            loading: false,
            cepLoading: false,
            productsCmp: {
                id: 0,
                value: 0,
                quantity: 0,
                imgUrl: "string",
                description: "string",
                sectionProductCmpDtos: [],
            },
            product: {
                sections: [],
                amount: 1,
            },
            categoria: {
                name: "",
                allow_creation: false,
                sectionCmps: [],
            },
            endereco: {
                cep: "",
                rua: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "",
                pais: "",
            },
            cartao: {
                nomeCartao: "",
                NumeroCartao: "",
                mes: "",
                ano: "",
                CvvCartao: ""
            },
            products: [],
            regularProducts: [],
            productCmps: [],
            cepExists: false,
        };
    },
    methods: {

        Pagar() {
            const currentDate = new Date();
            // Dados do pedido adaptados ao formato JavaScript
            const pedidoPagSeguro = {
                reference_id: "ex-00001",
                customer: {
                    name: "Jose da Silva",
                    email: "email@test.com",
                    tax_id: "12345678909",
                    phones: [
                        {
                            country: "55",
                            area: "11",
                            number: "999999999",
                            type: "MOBILE"
                        }
                    ]
                },
                items: [
                    {
                        reference_id: "referencia do item",
                        name: "nome do item",
                        quantity: 1,
                        unit_amount: 500
                    }
                ],
                qr_codes: [
                    {
                        amount: {
                            "value": this.productsCmp.value
                        },
                        expiration_date: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toISOString(), 
                    }
                ],
                shipping: {
                    address: {
                        street: this.endereco.rua,
                        number: this.endereco.numero,
                        complement: this.endereco.complemento,
                        locality: this.endereco.bairro,
                        city: this.endereco.cidade,
                        region_code: this.endereco.estado,
                        country: "BRA",
                        postal_code: this.endereco.cep
                    }
                },
                notification_urls: [
                    "https://meusite.com/notificacoes"
                ],
            };

            // Envia a solicitação POST para a API do PagSeguro
            axios
                .post('http://localhost:8081/payments', pedidoPagSeguro, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    // Lida com a resposta da API do PagSeguro aqui
                    console.log(response.data);
                })
                .catch((error) => {
                    // Lida com erros aqui
                    console.error(error);
                });
        },


        consultarCEP() {
            const cep = this.endereco.cep;

            // Verifique se o CEP foi fornecido antes de fazer a solicitação
            if (cep) {
                this.cepLoading = true;
                axios
                    .get(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((response) => {
                        const data = response.data;

                        if (!data.erro) {
                            // Preencha os campos com os dados retornados pela API
                            this.endereco.rua = data.logradouro;
                            this.endereco.bairro = data.bairro;
                            this.endereco.cidade = data.localidade;
                            this.endereco.estado = data.uf;
                            this.cepExists = true;
                            setTimeout(() => {
                                this.cepLoading = false;
                            }, 400)
                            
                            // Preencha outros campos, se necessário
                        } else {
                            // Trate o caso em que o CEP não foi encontrado
                            // Exiba uma mensagem de erro ou limpe os campos, por exemplo
                        }
                    })
                    .catch((error) => {
                        // Trate erros na solicitação, se necessário
                        ElMessage({
                            message: 'CEP não encontrado.',
                            type: 'error',
                        })
                    });
            }
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

        nextStep() {
            this.currentStep++;
        },
        previousStep() {
            this.currentStep--;
        },
        /** Popula lista em tela com os produtos do carrinho armazenados em local storage. */

        /** Calcula o valor de todos os produtos e cmps selecionados pelo usuário. */
        totalPrice() {
            let total = 0;
            // Se houverem produtos no carrinho, soma ao valor do total.
            if (this.products && this.products.length > 0) {
                total += this.totalProducts();
            }
            // Se houverem cpms, soma ao valor do total.
            if (this.productCmps && this.productCmps.length > 0) {
                total += this.totalCmps();
            }

            this.productsCmp.value = total;
            return total;
        },
        // Calculo dos produtos e personalizações.
        totalProducts() {
            const productsTotal = this.products.reduce((total, product) => {
                // Se o produto é personalizável, calcula o total das personalizações
                let personalizationTotal = 0;
                if (product.editable && product.sections && product.sections.length > 0) {
                    personalizationTotal = this.totalOption(product.sections);
                }
                // Calcula o total do produto considerando o valor base e as personalizações
                let productTotal = (product.value + personalizationTotal) * product.quantity;
                // Soma o total do produto ao total geral.
                return total + productTotal;
            }, 0);
            return productsTotal;
        },
        /** Calcula valor total das opções selecionadas em um produto. */
        totalOption(sections) {
            // Se não há opções no produto (não foi personalizado), retorna 0.
            if (!(sections.options && sections.options > 0)) {
                return 0;
            }
            return sections.reduce((sectionTotal, section) => {
                // Soma o preço de todas as opções selecionadas na seção
                let optionsTotal = section.options.reduce((optionTotal, option) => {
                    return optionTotal + option.price;
                }, 0);
                // Soma o total da seção ao total da personalização.
                return sectionTotal + optionsTotal;
            }, 0);
        },

        // Calculo dos cmps e edições.
        totalCmps() {
            // const cmpsTotal = this.productsCmp.reduce((total, cmp) => {
            //     let total = 0;
            // }, 0);
            return 0;
        },
    },
    created() {
        const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
        // Inicializa lista de produtos do carrinho (em tela) com os produtos adicionados no localstorage.

        this.regularProducts = cartService.getCartItems();
        this.cmpProducts = cartService.getCmpItems();

        this.products = this.regularProducts.concat(this.cmpProducts);
        

        setTimeout(() => {
            loading.close()
          }, 250)
    },
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";

.el-menu{
    display: flex;
    justify-content: space-between;
}

.checkout-steps {
  padding: 0 5% 0 20vw;
  width: 100%;
}
.el-steps--simple {
  background: transparent;
}

:deep(.el-step.is-simple .el-step__title) {
  font-size: 14px;
  line-height: 16px;
  word-break: normal !important;
}

:deep(.el-step__head.is-finish) {
  color: $tertiary-color;
  border-color: $tertiary-color;
}

:deep(.el-step__title.is-finish) {
  color: $tertiary-color;
}
.el-step.is-simple .el-step__title {
  font-size: 14px;
  line-height: 20px;
}
:deep(.el-step.is-simple .el-step__arrow::after), :deep(.el-step.is-simple .el-step__arrow::before) {
  width: 2px;
}
.container{
    padding-top: 1%;
}

.el-radio-group{
    margin-bottom: 20px;
}

.el-radio.is-bordered.el-radio--large {
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
}

:deep(.el-loading-mask) {
  background-color: transparent;
}
.small-inputs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

    & > .el-form-item {
        width: 25rem;
    }
}
.smaller-inputs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

    & > .el-form-item {
        width: 15rem;
    }
}

.final-step{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
.mega-icon{
    margin-top: 50px;
    .el-icon { 
        width: 100%;
        & > svg {
            height: 10em !important;
            width: 10em !important;
            }
        }  
    }  
}

.carrinho-content {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    h1 {
        font-size: 32px;
        margin-bottom: 20px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        color: $text-color;
    }

    .endereco,
    .forma-pagamento,
    .revisao {
        flex-basis: 45%;
        margin: 0 10px;
    }
    .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
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
            border: 2px solid var(--el-card-border-color);

            h2 {
              display: flex;
              align-items: center;
              font-size: 20px;
              margin-bottom: 4rem;

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

            div.card-header.card-item {
              padding: 0.5rem 0 0 2rem;
            }

            .card-item{
                padding: 16px;
                padding-top: 0px;
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

            .card-item.frete {
              display: flex;
              justify-content: end;
              align-items: baseline;

              h4 {
                margin: 0;
                margin-left: 1rem;
              }
            }

            :deep(.el-card__body) {
                padding: 0px;
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
</style>
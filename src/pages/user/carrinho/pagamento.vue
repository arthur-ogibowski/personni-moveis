<template>
    <div class="container" v-loading="loading" element-loading-text="Carregando..." :element-loading-spinner="svg"
        element-loading-background="rgba(122, 122, 122, 0.9)">
        <el-steps align-center :active="currentStep" finish-status="success">
            <el-step title="Endereço de entrega" />
            <el-step title="Forma de pagamento" />
            <el-step title="Revisão" />
            <el-step title="Finalizar compra" />
        </el-steps>

        <div class="carrinho-content">

            <div class="endereco" v-if="currentStep == 0">
                <h1>Endereço de entrega</h1>
                <el-form :model="endereco">
                    <el-form-item label="CEP">
                        <el-input v-model="endereco.cep" @blur="consultarCEP" v-mask="'#####-###'" maxlength="9"></el-input>
                    </el-form-item>
                    <el-form-item label="Rua">
                        <el-input v-model="endereco.rua" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Número">
                        <el-input v-model="endereco.numero"></el-input>
                    </el-form-item>
                    <el-form-item label="Complemento">
                        <el-input v-model="endereco.complemento"></el-input>
                    </el-form-item>
                    <el-form-item label="Bairro">
                        <el-input v-model="endereco.bairro" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Cidade">
                        <el-input v-model="endereco.cidade" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Estado">
                        <el-input v-model="endereco.estado" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>

            </div>

            <div class="forma-pagamento" v-if="currentStep == 1">
                <h1>Forma de pagamento</h1>
                <el-form :model="endereco">
                    <el-form-item label="Nome no cartão">
                        <el-input v-model="cartao.nomeCartao"></el-input>
                    </el-form-item>
                    <el-form-item label="Número do cartão">
                        <el-input v-model="cartao.NumeroCartao"></el-input>
                    </el-form-item>
                    <el-form-item label="Validade">
                        <el-input v-model="cartao.ValidadeCartao"></el-input>
                    </el-form-item>
                    <el-form-item label="CVV">
                        <el-input v-model="cartao.CvvCartao"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="revisao" v-if="currentStep == 2">
                <el-table border :data="products" style="width: 50%">
                    <el-table-column prop="name" label="Produto" width="*"></el-table-column>
                    <el-table-column prop="price" label="Preço" width="auto"></el-table-column>
                </el-table>
            </div>

            <div class="side-info">

                <el-card class="box-card" shadow="never">
                    <div class="card-header card-item">
                        <h2>Resumo da compra</h2>
                    </div>
                    <div class="card-item">
                        <h3>Subtotal ({{ products.length }} itens): {{ totalPrice() != 0 ? "R$" + totalPrice() : "--" }}
                        </h3>
                    </div>
                    <div class="card-item">
                        <h3>Frete: {{ totalPrice() != 0 ? "R$" + totalPrice() : "--" }}</h3>
                    </div>
                    <div class="preco-final">
                        <h3>Preço final: {{ totalPrice() != 0 ? "R$" + totalPrice() : "--" }}</h3>
                    </div>
                </el-card>

                <div class="actions">
                    <el-button v-if="currentStep != 0" type="primary" plain @click="previousStep"><el-icon>
                            <ArrowLeftBold />
                        </el-icon> Voltar</el-button>
                    <el-button type="primary" @click="nextStep">Próximo passo <el-icon>
                            <ArrowRightBold />
                        </el-icon></el-button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import cartService from '@/store/cartService.js';
import axios from 'axios';
import VueTheMask from 'vue-the-mask';
import { ElMessage } from 'element-plus';
export default {
    directives: { mask: VueTheMask.mask },
    data() {
        return {
            currentStep: 0,
            selected: [],
            loading: false,
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
                NumeroCartao: 0,
                ValidadeCartao: "",
                CvvCartao: 0
            },
            products: [],
            productCmps: []
        };
    },
    methods: {

        consultarCEP() {
            const cep = this.endereco.cep;

            // Verifique se o CEP foi fornecido antes de fazer a solicitação
            if (cep) {
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

        nextStep() {
            this.currentStep++;
        },
        previousStep() {
            this.currentStep--;
        },
        /** Popula lista em tela com os produtos do carrinho armazenados em local storage. */
        getCartProductsFromLocalStorage() {
            this.products = cartService.getCartItems();
        },
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
        this.getCartProductsFromLocalStorage();
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";


.carrinho-content {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .endereco,
    .forma-pagamento,
    .revisao {
        flex-basis: 70%;
        margin: 0 10px;
    }

    .side-info {
        flex-basis: 25%;
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
            background-color: transparent;
            border: 1px solid $user-grey;

            .card-item {
                border-bottom: 1px solid $user-grey;
                padding: 16px;
                font-size: 12px;
                text-align: center;
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
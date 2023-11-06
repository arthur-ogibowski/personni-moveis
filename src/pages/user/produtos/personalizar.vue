<template>
    <div class="container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/produtos/' + product.productId }">{{ product.name }}</el-breadcrumb-item>
            <el-breadcrumb-item>Personalizar</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="dropdown-list">
                <div class="dropdown-outer" v-for="section in product.sections" :key="section">
                    <el-divider>{{ section.name }}</el-divider>
                    <div class="dropdown-content">
                        <el-radio-group v-model="selected[section.sectionId]">
                            <el-radio-button v-for="option in section.options" :key="option.optionId" @change="resumoCmp"
                                :label="option.optionId" size="large">

                                <el-image :src="option.mainImg"/>{{ option.name }} (R${{ option.price }})
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div class="product-image">
                <el-image style="width: 500px; height: 500px" :src="product.mainImg" :fit="fit" />
            </div>
            <div class="resumo">
                <h1>Resumo</h1>
                <div class="resumo-item">
                    <el-divider/>
                    <div class="resumo-item-inner" v-for="optionInfo in selectedOptionsInfo" :key="optionInfo">
                        <h3 class="label">{{ optionInfo.section }}</h3>
                        <div class="resumo-item-inner-escolhido">
                            <el-text type="info" class="nome">{{ optionInfo.option }}</el-text>
                            <h2 class="preco">{{ optionInfo.price != 0 ? "R$" + formatPrice(optionInfo.price) : "--" }}</h2>
                        </div>
                    </div>

                </div>

                <h2 class="total">Total: {{ calcularTotal() != 0 ? "R$" + formatPrice(calcularTotal()) : "--" }}</h2>
                <el-button class="cta" color="$cta-color" @click="addToCart">Adicionar ao carrinho</el-button>
            </div>
        </div>
    </div>
</template>


<script>
import { ElLoading } from 'element-plus';
import cartService from '@/store/cartService.js';
import axios from 'axios';

export default {
    data() {
        return {
            selectedOptionsInfo: [],
            selected: [],
            product: {
                section: []
            },
        }
    },
    methods: {
        encontrarElementoESeçãoPorOpção(optionIds) {
            const correspondencias = [];

            for (const section of this.product.sections) {
                for (const option of section.options) {
                    for (const optionId of optionIds) {
                        if (option.optionId == optionId) {
                            correspondencias.push({ section: section, option: option });
                        }
                    }
                }
            }

            return correspondencias;
        },

        // Método chamado quando uma opção é selecionada
        resumoCmp() {
            // IDs das opções selecionadas (por exemplo, IDs de opção de cor e tamanho)
            const selectedOptionIds = this.selected;

            // Encontre as correspondências de seção e opção com base nos IDs selecionados
            const correspondencias = this.encontrarElementoESeçãoPorOpção(selectedOptionIds);

            // Inicialize o array de informações de opções selecionadas
            const selectedOptionsInfo = [];

            correspondencias.forEach(({ section, option }) => {
                // Construa as informações da opção selecionada
                const optionInfo = {
                    section: section.name,
                    option: option.name,
                    price: option.price,
                    img: option.img,
                };

                // Adicione a informação ao array
                selectedOptionsInfo.push(optionInfo);
            });

            // Atualize as informações de opções selecionadas
            this.selectedOptionsInfo = selectedOptionsInfo;
        },
        calcularTotal() {
            let total = 0;
            for (let i = 0; i < this.product.sections.length; i++) {
                let section = this.product.sections[i];
                let selected = this.selected[section.sectionId];
                if (selected) {
                    total += section.options.find(option => option.optionId == selected).price;
                }
            }
            return total;
        },
        selecionarItem(item) {
            this.product.personalizacoes += item;
            item.selected = true;

        },
        formatPrice(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        addToCart() {
            cartService.addToCart(this.product, this.selectedOptionsInfo);
            ElMessage({
              message: 'Produto adicionado ao carrinho',
              type: 'success',
            })
        }
    },
    async created() {
        const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        axios.get('http://localhost:8081/products/' + this.$route.params.id)
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
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';

div.content {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;

    div.dropdown-list {
        div.dropdown-outer {

            margin-bottom: 4rem;

            div.dropdown-header {
                width: 250px;
                height: fit-content;
                border: 2px solid $user-grey;
                text-align: center;

                h2 {
                    color: $user-grey;
                }

            }

            // secoes esquerda
            label.el-radio-button,
            :deep(span.el-radio-button__inner) {
                width: 250px;

                .el-image{
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
            }



            div.dropdown-item {
                width: 250px;
                height: fit-content;
                border: 2px solid $user-grey;
                border-top: none;
                text-align: center;


                span,
                h3 {
                    color: #696969;
                }

                &:hover {
                    background-color: #555;
                    color: #fff;
                    cursor: pointer;

                    span,
                    h3 {
                        color: #fff;
                    }
                }

                .item_selecionado {
                    background-color: #555;

                    span,
                    h3 {
                        color: #fff;
                    }
                }

                div.dropdown-item-header {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-around;
                }
            }

        }

    }


    div.resumo {

        border: 1px solid $user-grey;
        padding: 2rem 3rem;
        display: flex;
        flex-direction: column;

        h1 {
            color: $text-color;
            font-size: 3.5rem;
            margin-bottom: 0rem;
            text-align: center;
        }

        div.resumo-item-inner {

            h3 {
                margin-bottom: 0;
                margin-top: 2rem;
                color: $user-grey;
                font-weight: 400;
            }

            .el-text{
                font-size: 2rem;
                color: $text-color;
            }

            div.resumo-item-inner-escolhido {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;


                h2.nome {
                    margin-right: 10px;
                }

                h2 {
                    font-weight: normal;
                }
            }
        }

        .total {
            margin-top: auto;
        }

        .cta {
            height: 50px;
            font-size: 2rem;
        }
    }
}
</style>
<template>
    <div class="container" v-loading="loading" element-loading-text="Carregando..."
        :element-loading-spinner="svg"
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
                        <el-input v-model="endereco.cep"></el-input>
                    </el-form-item>
                    <el-form-item label="Rua">
                        <el-input v-model="endereco.rua"></el-input>
                    </el-form-item>
                    <el-form-item label="Número">
                        <el-input v-model="endereco.numero"></el-input>
                    </el-form-item>
                    <el-form-item label="Complemento">
                        <el-input v-model="endereco.complemento"></el-input>
                    </el-form-item>
                    <el-form-item label="Bairro">
                        <el-input v-model="endereco.bairro"></el-input>
                    </el-form-item>
                    <el-form-item label="Cidade">
                        <el-input v-model="endereco.cidade"></el-input>
                    </el-form-item>
                    <el-form-item label="Estado">
                        <el-input v-model="endereco.estado"></el-input>
                    </el-form-item>
                    <el-form-item label="País">
                        <el-input v-model="endereco.pais"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="forma-pagamento" v-if="currentStep == 1">
                <h1>Forma de pagamento</h1>
                <el-form :model="endereco">
                    <el-form-item label="Nome no cartão">
                        <el-input v-model="endereco.cep"></el-input>
                    </el-form-item>
                    <el-form-item label="Número do cartão">
                        <el-input v-model="endereco.rua"></el-input>
                    </el-form-item>
                    <el-form-item label="Validade">
                        <el-input v-model="endereco.numero"></el-input>
                    </el-form-item>
                    <el-form-item label="CVV">
                        <el-input v-model="endereco.complemento"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="revisao" v-if="currentStep == 2">
                <el-table border :data="produtos" style="width: 50%">
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
                        <h3>Subtotal ({{ produtos.length }} itens): {{ totalPrice() != 0 ? "R$" + totalPrice() : "--"}}</h3>
                    </div>
                    <div class="card-item">
                        <h3>Frete: {{ totalPrice() != 0 ? "R$" + totalPrice() : "--"}}</h3>
                    </div>
                    <div class="preco-final">
                        <h3>Preço final: {{ totalPrice() != 0 ? "R$" + totalPrice() : "--"}}</h3>
                    </div>
                </el-card>

                <div class="actions">
                    <el-button v-if="currentStep != 0" type="primary" plain @click="previousStep"><el-icon><ArrowLeftBold /></el-icon> Voltar</el-button>
                    <el-button type="primary" @click="nextStep">Próximo passo <el-icon><ArrowRightBold /></el-icon></el-button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 0,
            selected: [],
            loading: false,
            products_cmp: {
                id: 0,
                value: 0,
                quantity: 0,
                imgUrl: "string",
                description: "string",
                sectionProductCmpDtos: [],
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
            produtos: [
                {
                    name: "Cadeira 1",
                    price: "150",
                },
                {
                    name: "Cadeira 2",
                    price: "150",
                },
                {
                    name: "Cadeira 3",
                    price: "150",
                },]
        };
    },
    methods: {
        nextStep() {
            this.currentStep++;
        },
        previousStep() {
            this.currentStep--;
        },
        totalPrice() {
            let total = 0;
            for (let i = 0; i < this.selected.length; i++) {
                const element = this.selected[i];
                total += element.price;
            }
            return total;
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";


.carrinho-content{
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .endereco, .forma-pagamento, .revisao{
        flex-basis: 70%;
        margin: 0 10px;
    }
    .side-info{
        flex-basis: 25%;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .box-card{
            width: 100%;
            margin-bottom: 20px;
        }
        .el-card{
            background-color: transparent;
            border: 1px solid $user-grey;

            .card-item{
                border-bottom: 1px solid $user-grey;
                padding: 16px;
                font-size: 12px;
                text-align: center;
            }
            :deep(.el-card__body){
                padding: 0px;
            }

            .preco-final{
                font-size: 20px;
                padding: 20px;
                text-align: center;
                h3{
                    color: green;
                }
            }
        }
        .actions{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            button{
                width: 100%;
                margin: 10px 0;
            }
        }
    }

}


</style>
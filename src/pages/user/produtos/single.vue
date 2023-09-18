<template>
    <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
          <el-breadcrumb-item>{{ produto.nome }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main-single">
            <el-carousel
              direction="vertical"
              type="card"
              :autoplay="false"
            >
              <el-carousel-item v-for="item in 4" :key="item" class>
                <el-image style="width: 100px; height: 100px" :src="produto.imagem" :fit="fit" />
              </el-carousel-item>
            </el-carousel>
            <el-image style="width: 500px; height: 500px" :src="produto.imagem" :fit="fit" />

            <div class="info-box">
                <h2 style="font-size: 2rem;">{{  produto.nome }}</h2>
                <p style="font-size: 1.6rem;">{{ produto.descricao }}</p>
                <h3 style="font-size: 1.8rem;">R${{ produto.preco }}</h3>
                <div class="info-box-action">
                    <router-link  :to="{path: '/produtos/' + produto.id + '/personalizar'}"><el-button color="#1a2930" size="small">Personalizar</el-button></router-link>
                    <el-button class="cta" color="$cta-color">Adicionar ao carrinho</el-button>
                </div>
            </div>


        </div>

        <hr>

        <div class="about-single">
            <h1>Descrição do Produto</h1>

            <el-table :data="produto.sobre" style="width: 100%">
              <el-table-column prop="label" label="Date" width="180" />
              <el-table-column prop="value" label="Name" width="*" />
            </el-table>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            // produto: {
            //     nome: "Cadeira 1",
            //     id: 1,
            //     descricao: "Lorem ipsum dolor sit amet, consectetur ad ipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.",
            //     preco: "1300",
            //     imagem: "/src/assets/img/cadeira1.png",
            //     sobre: [
            //         {label: "Cor", value: "Bege"},
            //         {label: "Modelo", value: "Cadeira"},
            //         {label: "Garantia", value: "1 ano"},
            //         {label: "Cuidados", value: "Produto recomendado para uso doméstico. Limpar com pano macio seco ou levemente umedecido com água."},
            //         {label: "Conteúdo", value: "1 Cadeira de Escritório"},
            //         {label: "Tamanho", value: "Altura: 109 - 119 cm | Largura: 66 cm | Profundidade: 70 cm | Altura do braço ao chão: 65 - 75 cm | Altura do assento ao chão: 45 - 55 cm"},
            //         {label: "Montagem", value: "Sim, a montagem é simples mas sugerimos a contratação do nosso serviço de montagem (para os CEPs em que o serviço está disponível) ou de algum profissional experiente de sua preferência"},
            //         {label: "Encosto", value: "Encosto com regulagem de altura e inclinação"},
            //         {label: "Peso", value: "Suportado: 120 kg"},
            //     ],
            // }
            product: {
                productId: null,
                name: '',
                value: 0,
                quantity: 0,
                editable: false,
                mainImgurl: '',
                description: '',
                secondaryImages: [],
                details: [],
                materials: [],
                sections: [],
                tags: []
            }
        }
    },

    created() {
        // Carrega dados necessários ao entrar na tela.
        //this.getproduct();
    },

    methods: {

        /** Faz requisição para obter produto pelo id. */
        getProduct() {
            // pega id do produto pela URL.
            const productId = this.$route.params.id;
            if (productId != null) {
                axios.get(`http://localhost:8081/product/${productId}`)
                    .then(response => {
                        this.product = response.data;
                    }).catch(error => {
                        console.error('Erro ao obter produto:', error);
                    });
            }
        },


    }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/scss/basics.scss';
div.container {

    p {
        color: $user-grey;
    }
    hr{
        margin: 75px 0;
        color: $user-grey;
        border: 1px solid $user-grey;
    }
    div.main-single{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;

        .el-image{
            border: 2px solid #BABABA; 
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
            border: 2px solid #BABABA;
            background: #F1F1F1;
            padding: 2rem;

            div.info-box-action{
                display: flex;
                flex-direction: column;
                width: fit-content;
                max-width: 150px;

                button {
                    width: fit-content;
                    margin: 0.5rem 0;
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
                //border-bottom: 1px solid #A6A6A6;
                padding: 2rem;
            }
            :deep(.el-table__header-wrapper){
                display: none;
            }
            :deep(.el-table_1_column_1){
                border-right: 1px solid #A6A6A6;
            }
        }

        
    }
}

</style>
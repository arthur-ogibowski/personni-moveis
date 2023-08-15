<template>
    <div class="container">
        <h1><router-link to="/produtos">Cadeiras</router-link> > {{ produto.nome }}</h1>

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
                    <el-button color="#A6A6A6" size="small">Personalizar</el-button>
                    <el-button class="cta" color="$cta-color">Criar meu móvel</el-button>
                </div>
            </div>


        </div>
<hr>
        <div class="about-single">
            <h1>Descrição do Produto</h1>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            produto: {
                nome: "Cadeira 1",
                id: 1,
                descricao: "Lorem ipsum dolor sit amet, consectetur ad ipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.",
                preco: "1300",
                cor: "Bege",
                imagem: "@/assets/img/cadeira1.png",
                modelo: "Cadeira",
            }
        }
    }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/scss/basics.scss';
div.container {

    p {
        color: $user-grey;
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
                width: 200px;
            }
        }
    }
}

</style>
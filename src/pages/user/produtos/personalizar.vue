<template>
  <div class="container">
    <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/produtos/' + produto.id}">{{ produto.nome }}</el-breadcrumb-item>
          <el-breadcrumb-item>Personalizar</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <div class="dropdown-list">
            <div class="dropdown-outer" v-for="option in produto.opcoes" :key="option">
                    <div class="dropdown-header">
                        <h2>{{ option.label }}</h2>
                    </div>
                    <div class="dropdown-content">
                        <div class="dropdown-item" v-for="i in option" :key="i">
                            <div class="dropdown-item-header">
                                <h3>{{ i.nome }}</h3>
                                <span>{{ i.preco}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-image">
            <el-image style="width: 500px; height: 500px" :src="produto.imagem" :fit="fit" />
        </div>
        <div class="resumo">
            <h1>Resumo da compra</h1>
            <div class="resumo-item" v-for="option in produto.opcoes" :key="option">
                <div class="resumo-item-inner">
                    <h2>{{ option.label }}</h2>
                    <div class="resumo-item-inner-escolhido">
                        <h3 class="nome">{{ option.opcao_1.nome }}</h3> 
                        <h3 class="preco">R$ {{ option.opcao_1.preco }}</h3>
                    </div>
                </div>
            </div>

            <h2>Total: {{ calcularTotal() }}</h2>
        </div>
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
                imagem: "/src/assets/img/cadeira1.png",
                opcoes: [
                    {label: "Cor",opcao_1: {nome: "Bege", preco: 100}, opcao_2: {nome: "Preto", preco: 150}, opcao_3: {nome: "Branco", preco: 150}},
                    {label: "Madeira", opcao_1: {nome: "Acacia", preco: 200}, opcao_2: {nome: "Carvalho", preco: 200}}

                ]
            }
        }
    },
    methods: {
        calcularTotal(){
            let total = 0;
            for (let i = 0; i < this.produto.opcoes.length; i++) {
                const element = this.produto.opcoes[i];
                total += element.preco;
            }
            return total;
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';
div.content{
    display: flex;
    justify-content: space-between;
    margin-top: 50px;

    div.dropdown-list{
        div.dropdown-outer{

            div.dropdown-header{
                width: 250px;
                height: fit-content;
                border: 2px solid $user-grey;
                text-align: center;

                h2{
                    color: $user-grey; 
                }

            }
            
        }
    }

    div.resumo{
        div.resumo-item-inner{
            div.resumo-item-inner-escolhido{
                display: flex;
                flex-direction: row;
                align-items: center;

                h3.nome{
                    color: $user-grey;
                    margin-right: 10px;
                }

                h3{
                    font-weight: normal;
                }
            }
        }
    }
}

</style>
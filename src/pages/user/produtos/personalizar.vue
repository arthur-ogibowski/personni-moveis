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
                        <div class="dropdown-item" v-for="i in option.opcoes" :key="i" v-on:click="selecionarItem(i)">
                            <div class="dropdown-item-header" :class="{item_selecionado : i.selected}">
                                <el-image style="width: 50px; height: 50px" :src="produto.imagem" :fit="fit" />
                                <h3>{{ i.nome }}</h3>
                                <span>(R$ {{ i.preco}})</span>
                        </div>
                        </div>
                        <el-radio-group v-model="radio1" size="large" v-for="i in option.opcoes" :key="i">
                          <el-radio-button :label="i.nome + ' (' + i.preco + ') '" />
                        </el-radio-group>
                    </div>
            </div>
        </div>
        <div class="product-image">
            <el-image style="width: 500px; height: 500px" :src="produto.imagem" :fit="fit" />
        </div>
        <div class="resumo">
            <h1>Resumo da personalização</h1>
            <div class="resumo-item">
                <div class="resumo-item-inner" v-for="option in produto.opcoes" :key="option">
                    <h3 class="label">{{ option.label }}</h3>
                    <div class="resumo-item-inner-escolhido">
                        <h2 class="nome">{{ option.opcoes.opcao_1.nome }}</h2> 
                        <h2 class="preco">R$ {{ option.opcoes.opcao_1.preco }}</h2>
                    </div>
                </div>
            </div>

            <h2 class="total">Total: {{ calcularTotal() }}</h2>

            <el-button class="cta" color="$cta-color" >Adicionar ao carrinho</el-button>
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
                    {
                        label: "Cor",
                        opcoes: {
                            opcao_1: {nome: "Bege", preco: 100, selected: false}, 
                            opcao_2: {nome: "Preto", preco: 150, selected: false}, 
                            opcao_3: {nome: "Branco", preco: 150, selected:false}
                        }
                    },
                    {
                        label: "Modelo",
                        opcoes: {
                            opcao_1: {nome: "Cadeira", preco: 100, selected:false}, 
                            opcao_2: {nome: "Poltrona", preco: 150, selected:false}, 
                            opcao_3: {nome: "Sofá", preco: 150, selected:false}
                        }
                    }

                ],
                personalizacoes: {}
            }
        }
    },
    methods: {
        calcularTotal(){
            let total = 0;
            for (let i = 0; i < this.produto.opcoes.length; i++) {
                const element = this.produto.opcoes;
                total += element.preco;
                console.log(element)
            }
            return total;
        },
        selecionarItem(item){
            this.produto.personalizacoes += item;
            item.selected = true;
        
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

            div.dropdown-item {
              width: 250px;
              height: fit-content;
              border: 2px solid $user-grey;
              border-top: none;
              text-align: center;
              

              span,h3{
                color: #696969;
              }
              &:hover{
                    background-color:  #555;
                    color: #fff;
                    cursor: pointer;

                    span, h3{
                        color: #fff;
                    }
              }

              .item_selecionado{
                background-color: #555;
                span, h3{
                    color: #fff;
                }
              }

              div.dropdown-item-header{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
              }
            }

       }
        
    }
    

    div.resumo{

        border: 2px solid $user-grey;
        padding: 2rem 3rem;
        display: flex;
        flex-direction: column;

        h1{
            color: $user-grey;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
        }
        div.resumo-item-inner{

            h3{
                margin-bottom: 0;
                margin-top: 2rem;
                color: $user-grey;
            }
            
            div.resumo-item-inner-escolhido{
                display: flex;
                flex-direction: row;
                align-items: center;


                h2.nome{
                    margin-right: 10px;
                }

                h2{
                    font-weight: normal;
                }
            }
        }

        .total{
            margin-top: auto;
        }

        .cta{
            height: 50px;
            font-size: 2rem;
        }
    }
}

</style>
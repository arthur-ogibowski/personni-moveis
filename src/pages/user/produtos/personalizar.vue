<template>
  <div class="container">
    <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/produtos/' + produto.productId}">{{ produto.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>Personalizar</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <div class="dropdown-list">
            <div class="dropdown-outer" v-for="section in produto.sections" :key="section">
                <div class="dropdown-header">
                    <h2>{{ section.name }}</h2>
                </div>
                <div class="dropdown-content">
                    <el-radio-group v-model="selected[section.sectionId]" size="large">
                      <el-radio-button
                        v-for="option in section.options"
                        :key="option"
                        :label="option.name">
                        {{ option.name }} (R${{ option.price }})
                      </el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <div class="product-image">
            <el-image style="width: 500px; height: 500px" :src="produto.imgUrl" :fit="fit" />
        </div>
        <div class="resumo">
            <h1>Resumo da personalização</h1>
            <div class="resumo-item">
                <div class="resumo-item-inner" v-for="item in selected" :key="item">
                    <h3 class="label">{{ item }}</h3>
                    <div class="resumo-item-inner-escolhido">
                        <h2 class="nome">{{ item }}</h2> 
                        <h2 class="preco">R$ {{ item }}</h2>
                    </div>
                </div>
            </div>

            <h2 class="total">Total: {{ calcularTotal() }}</h2>
            {{ selected }}
            <el-button class="cta" color="$cta-color" >Adicionar ao carrinho</el-button>
        </div>
    </div>
  </div>
</template>


<script>
export default {
    data(){
        return{
            selected: [],
            produto: {
                productId: 1,
                name: "cadeira asdfg",
                value: 123,
                quantity: 2,
                editable: true,
                imgUrl: "cadeira1.png",
                description: "descrição blablabla",
                details: [
                    {
                        detailId: 1,
                        detailField: "cuidados",
                        fieldContent: "Produto recomendado para uso doméstico..."
                    },
                    {
                        detailId: 2,
                        detailField: "Garantia",
                        fieldContent: "1 ano..."
                    }
                ],
                materials: [
                    {
                        materialId: 1,
                        materialName: "carvalho",
                        imgUrl: "carv.png",
                        price: 100
                    }
                ],
                tags: [
                    {
                        tagId: 1,
                        tagName: "escritório"
                    }
                ],
                sections: [
                {
                    sectionId: 1,
                    name: "braços",
                    imgUrl: "braco.png",
                    options: [
                        {
                            optionId: 1,
                            name: "braço custom",
                            imgUrl: "custom.png",
                            price: 250
                        },
                        {   
                            optionId: 2,
                            name: "braço custom 2",
                            imgUrl: "custom2.png",
                            price: 200
                        }
                    ]
                },
                {
                    sectionId: 2,
                    name: "rodinhas",
                    imgUrl: "rodinha.png",
                    options: [
                        {
                            optionId: 3,
                            name: "rodinha custom",
                            imgUrl: "custom.png",
                            price: 250
                        },
                        {   
                            optionId: 4,
                            name: "rodinha custom 2",
                            imgUrl: "custom2.png",
                            price: 200
                        }
                    ]
                },
                {
                    sectionId: 3,
                    name: "encosto",
                    imgUrl: "encosto.png",
                    options: [
                        {
                            optionId: 5,
                            name: "encosto custom",
                            imgUrl: "custom.png",
                            price: 250
                        },
                        {   
                            optionId: 6,
                            name: "encosto custom 2",
                            imgUrl: "custom2.png",
                            price: 200
                        }
                    ]
                },
                {
                    sectionId: 4,
                    name: "assento",
                    imgUrl: "assento.png",
                    options: [
                        {
                            optionId: 7,
                            default: true,
                            name: "assento custom",
                            imgUrl: "custom.png",
                            price: 250
                        },
                        {   
                            optionId: 8,
                            name: "assento custom 2",
                            imgUrl: "custom2.png",
                            price: 200
                        }
                    ]
                }
                ]
            }
        }
    },
    methods: {
        calcularTotal(){
            let total = 0;
            for(let i = 0; i < this.produto.sections.length; i++){
                let section = this.produto.sections[i];
                let selected = this.selected[section.sectionId];
                if(selected){
                    total += section.options.find(option => option.name == selected).price;
                }
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

            margin-bottom: 20px;

            div.dropdown-header{
                width: 250px;
                height: fit-content;
                border: 2px solid $user-grey;
                text-align: center;

                h2{
                    color: $user-grey; 
                }

            }

            // secoes esquerda
            label.el-radio-button, :deep(span.el-radio-button__inner){
                width: 250px;
            }

            div.el-radio-group{
                display: flex;
                flex-direction: column;
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
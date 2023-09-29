<template>
  <div class="container">
    <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/produtos/' + product.productId}">{{ product.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>Personalizar</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <div class="dropdown-list">
            <div class="dropdown-outer" v-for="section in product.sections" :key="section">
                    <el-divider>{{ section.name }}</el-divider>
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
            <el-image style="width: 500px; height: 500px" :src="product.imgUrl" :fit="fit" />
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
import { ElLoading } from 'element-plus';
import axios from 'axios';

export default {
    data(){
        return{
            selecionados: [],
            selected: [],
            product: [],
        }
    },
    methods: {
        calcularTotal(){
            let total = 0;
            for(let i = 0; i < this.product.sections.length; i++){
                let section = this.product.sections[i];
                let selected = this.selected[section.sectionId];
                if(selected){
                    total += section.options.find(option => option.name == selected).price;
                }
            }
            return total;
        },        
        selecionarItem(item){
            this.product.personalizacoes += item;
            item.selected = true;
        
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
div.content{
    display: flex;
    justify-content: space-between;
    margin-top: 50px;

    div.dropdown-list{
        div.dropdown-outer{

            margin-bottom: 4rem;

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
        
            :deep(.el-divider__text){
              background-color: #EFEFEF;
            }

            .el-radio-group {
              display: flex;
              flex-direction: column;
              :deep(.el-radio-button--large .el-radio-button__inner) {
                padding: 16px 24px;
                font-size: var(--el-font-size-base);
                margin: 5px 0;
                border: none !important;
                width: 250px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: none;
                
                &:hover{
                  color: $cta-color !important;
                }
            
              }
              :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner){
                  background-color: $tertiary-color !important;
                  color: $cta-color !important;
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
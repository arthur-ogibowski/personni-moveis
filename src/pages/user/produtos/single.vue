<template>
    <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/produtos' }">Produtos</el-breadcrumb-item>
          <el-breadcrumb-item>{{ produto.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main-single">
            <el-carousel
              direction="vertical"
              type="card"
              :autoplay="false"
            >
              <el-carousel-item v-for="item in 4" :key="item" class>
                <el-image style="width: 100px; height: 100px" :src="produto.imgUrl" :fit="fit" />
              </el-carousel-item>
            </el-carousel>
            <el-image style="width: 500px; height: 500px" :src="produto.imgUrl" :fit="fit" />

            <div class="info-box">
                <h2 style="font-size: 2rem;">{{  produto.name }}</h2>
                <p style="font-size: 1.6rem;">{{ produto.description }}</p>
                <h3 style="font-size: 1.8rem;">R${{ produto.value }}</h3>
                <div class="info-box-action">
                    <router-link  :to="{path: '/produtos/' + produto.productId + '/personalizar'}"><el-button color="#1a2930" size="small">Personalizar</el-button></router-link>
                    <el-button class="cta" color="$cta-color">Adicionar ao carrinho</el-button>
                </div>
            </div>


        </div>

        <hr>

        <div class="about-single">
            <h1>Descrição do Produto</h1>

            <el-table :data="produto.details" style="width: 100%">
              <el-table-column prop="detailField" width="180" />
              <el-table-column prop="fieldContent" width="*" />
            </el-table>

        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
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
                        detailField: "Cuidados",
                        fieldContent: "Produto recomendado para uso doméstico..."
                    },
                    {
                        detailId: 2,
                        detailField: "Garantia",
                        fieldContent: "1 ano..."
                    },
                    {
                        detailId: 3,
                        detailField: "Peso",
                        fieldContent: "1kg..."
                    },
                    {
                        detailId: 4,
                        detailField: "Dimensões",
                        fieldContent: "1m x 1m x 1m..."
                    },
                    {
                        detailId: 5,
                        detailField: "Material",
                        fieldContent: "Madeira..."
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
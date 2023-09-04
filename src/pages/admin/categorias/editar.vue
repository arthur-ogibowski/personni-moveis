<template>
    <div class="admin-container">
      <h1><router-link class="underline-router" to="/admin/categorias">Categorias</router-link > > Editar</h1>
      <el-form :model="categoria" label-width="*" label-position="top">
        <h2>Detalhes da categoria</h2>
            <el-form-item label="Nome">
              <el-input v-model="categoria.name"></el-input>
            </el-form-item>

          <hr>


            <h2>Criação</h2>
            <el-form-item label="Possibilitar criação">
                <el-switch v-model="categoria.allowCreation"></el-switch>
            </el-form-item>

            <div class="criar-content" v-if="categoria.allowCreation">

                <div class="section-item" v-for="section in categoria.sectionCmps" v-bind:key="section">
                    <el-form-item label="Seção">
                        <el-input v-model="section.name" class="section-input"></el-input>
                    </el-form-item>

                    
                    <div class="elements">
                        <div class="element-item" v-for="element in section.elementsCmps" v-bind:key="element">
                            

                            <div class="element-card">

                                <h2>{{ element.name.toUpperCase() }}</h2>

                                <el-form-item label="Nome">
                                    <el-input v-model="element.name"></el-input>
                                </el-form-item>


                                <div class="option-item" v-for="option in element.optionsCmps" v-bind:key="option">

                                    <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="Opção">
                                            <el-input v-model="option.name" size="small"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="Preço">
                                            <el-input v-model="option.price" size="small"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    </el-row>


                                </div>

                                <el-button type="primary" v-on:click="newOption(element.elementCmpId, element.sectionCmpId)"><el-icon><Plus /></el-icon> Opção</el-button>

                            </div>

                        </div>
                        <el-button type="primary" v-on:click="newElement(section.sectionCmpId)"><el-icon><Plus /></el-icon> Elemento </el-button>
                    </div>    

                    

                    <hr>

                </div>

                

                <el-button type="primary" v-on:click="newSection"><el-icon><Plus /></el-icon> Seção</el-button>

            </div>


          <el-form-item>
              <el-button type="primary">Salvar</el-button>
          </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
      data() {
          return {
              categoria:{
                id: 1,
                name: "Cadeiras",
                allowCreation: true,
                sectionCmps: [
                    {
                        sectionCmpId: 1,
                        name: "Assento",
                        imgUrl: "",
                        categoryId: 1,
                        elementsCmps: [
                            {
                                elementCmpId: 1,
                                name: "altura",
                                type: null,
                                sectionCmpId: 1,
                                optionsCmps: [
                                    {
                                        optionCmpId: 1,
                                        name: "10cm",
                                        imgUrl: "",
                                        price: 200,
                                        elementCmp: 1,
                                    },
                                    {
                                        optionCmpId: 2,
                                        name: "5cm",
                                        imgUrl: "",
                                        price: 150,
                                        elementCmp: 1,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        sectionCmpId: 2,
                        name: "Encosto",
                        imgUrl: "",
                        categoryId: 1,
                        elementsCmps: [
                            {
                                elementCmpId: 2,
                                name: "altura",
                                type: null,
                                sectionCmpId: 2,
                                optionsCmps: [
                                    {
                                        optionCmpId: 3,
                                        name: "10cm",
                                        imgUrl: "",
                                        price: 200,
                                        elementCmp: 2,
                                    },
                                    {
                                        optionCmpId: 4,
                                        name: "5cm",
                                        imgUrl: "",
                                        price: 150,
                                        elementCmp: 2,
                                    }
                                ]
                            }
                        
                        ]
                    }
                ]
              }
          }
      },
        methods: {

            newSection() {
                this.categoria.sectionCmps.push({
                    sectionCmpId: 3,
                    name: "Nova seção",
                    imgUrl: "",
                    categoryId: 1,
                    elementsCmps: []
                })
            },

            newElement(sectionId) {
                let section = this.categoria.sectionCmps.find(x => x.sectionCmpId == sectionId)
                section.elementsCmps.push({
                    elementCmpId: 3,
                    name: "Novo elemento",
                    type: null,
                    sectionCmpId: sectionId,
                    optionsCmps: []
                })
                
            },

            newOption(elementId, sectionId) {
                let section = this.categoria.sectionCmps.find(x => x.sectionCmpId == sectionId)
                let element = section.elementsCmps.find(x => x.elementCmpId == elementId)
                
                element.optionsCmps.push({
                    optionCmpId: 5,
                    name: "Nova opção",
                    imgUrl: "",
                    price: 0,
                    elementCmp: elementId,
                })
                
            }
        }
  
  }
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";
hr{
  border: 1px solid $admin-grey;
  margin: 30px 0;
}
.el-input.section-input {
    width: 50%;
}

.elements{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.element-card{
    border: 2px solid $admin-grey;
    padding: 0 20px 20px 20px;
    width: 300px;
    margin: 20px 20px 0 0;

    h2{
        text-align: center;
        color: $admin-grey;
    }
}
</style>
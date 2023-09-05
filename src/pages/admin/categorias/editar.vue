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
                <el-switch v-model="categoria.allow_creation"></el-switch>
            </el-form-item>

            <div class="criar-content" v-if="categoria.allow_creation">

                <div class="section-item" v-for="section in categoria.sectionCmps" v-bind:key="section">
                    <el-form-item label="Seção">
                        <el-input v-model="section.name" class="section-input"></el-input>
                    </el-form-item>

                    
                    <div class="elements">
                        <div class="element-item" v-for="element in section.elementCmps" v-bind:key="element">
                            

                            <div class="element-card">

                                <h2>{{ element.name.toUpperCase() }}</h2>

                                <el-form-item label="Nome">
                                    <el-input v-model="element.name"></el-input>
                                </el-form-item>


                                <div class="option-item" v-for="option in element.optionCmps" v-bind:key="option">

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

                                <el-button type="primary" v-on:click="newOption(element.id, element.sectionCmpId)"><el-icon><Plus /></el-icon> Opção</el-button>

                            </div>

                        </div>
                        <el-button type="primary" v-on:click="newElement(section.id)"><el-icon><Plus /></el-icon> Elemento </el-button>
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
  import axios from 'axios';
  export default {
      data() {
          return {
            categoria:{      
            name : "",
            allow_creation: false,
            sectionCmps: [
            ]          
            }
          }
      },
      mounted() {
        const id = this.$route.params.id;
    // Fazer uma solicitação GET para buscar dados da categoria por ID
    axios.get(`http://localhost:8081/category/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.categoria = response.data;
        } else {
          console.error('Erro ao buscar dados da API:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  },
      methods: {     
        },
            newSection() {
                this.categoria.sectionCmps.push({
                    id: Math.ceil(Math.random()*1000000),
                    name: "Nova seção",
                    imgUrl: "",
                    categoryId: 0,
                    elementCmpDtos: []
                })
            },

            newElement(sectionId) {
                let section = this.categoria.sectionCmps.find(x => x.id == sectionId)
                section.elementCmps.push({
                    id: Math.ceil(Math.random()*1000000),
                    name: "Novo elemento",
                    type: null,
                    sectionCmpId: sectionId,
                    optionCmpDtos: []
                })           
            },

            newOption(elementId, sectionId) {
                let section = this.categoria.sectionCmps.find(x => x.id == sectionId)
                let element = section.elementCmps.find(x => x.id == elementId)
                
                element.optionCmps.push({
                    id: Math.ceil(Math.random()*1000000),
                    name: "Nova opção",
                    imgUrl: "",
                    price: 0,
                    elementCmpId: elementId,
                })
                
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
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
                        <el-icon v-on:click="deleteSection(section.id)" style="margin-left: 8px;" :size="20" color="#FF0000"><CloseBold /></el-icon>
                    </el-form-item>

                    
                    <div class="elements">
                        <div class="element-item" v-for="element in section.elementCmps" v-bind:key="element">
                            

                            <div class="element-card">
                                <el-icon v-on:click="deleteElement(element.id)" style="margin-left: 8px; float: right; margin-top: 8px;" :size="20" color="#FF0000"><CloseBold /></el-icon>
                                <h2>{{ element.name.toUpperCase() }}</h2>

                                <el-form-item label="Nome">
                                    <el-input v-model="element.name"></el-input>      
                                                                                 
                                </el-form-item>
                                


                                <div class="option-item" v-for="option in element.optionCmps" v-bind:key="option">
                                    <el-icon v-on:click="deleteOption(option.id)" style="margin-left: 8px; float: right; margin-top: 33px;" :size="20" color="#FF0000"><CloseBold /></el-icon>
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

                                <el-button type="primary" v-on:click="newOption(element)"><el-icon><Plus /></el-icon> Opção</el-button>

                            </div>

                        </div>
                        <el-button type="primary" v-on:click="newElement(section)"><el-icon><Plus /></el-icon> Elemento </el-button>
                    </div>    

                    

                    <hr>

                </div>

                

                <el-button type="primary" v-on:click="newSection"><el-icon><Plus /></el-icon> Seção</el-button>

            </div>


          <el-form-item>
              <el-button type="primary" @click="salvarCategoria">Salvar</el-button>
          </el-form-item>
      </el-form>{{ categoria }}
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import { ElMessage } from 'element-plus';
  export default {
      data() {
          return {
            novaSecao: false,
            novoElemento: false,
            novaOpcao: false,

            categoria:{    
            id: 0,  
            name : "",
            allow_creation: false,
            sectionCmps: [
            ]          
            },
          }
      },
      mounted() {
        const id = this.$route.params.id;
    // Fazer uma solicitação GET para buscar dados da categoria por ID
    axios.get(`http://localhost:8081/category/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.categoria = response.data
        } else {
          ElMessage.error('Categoria salva com Sucesso!')
          console.error('Erro ao buscar dados da API:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  },
  methods: {     
    deleteOption(id) {
      axios.delete(`http://localhost:8081/OptionCmp/${id}`)
      .then(response => {
        this.categorias = response.data;
        window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao deletar Opção', error);
      });
    },

    deleteElement(id) {
      axios.delete(`http://localhost:8081/ElementCmp/${id}`)
      .then(response => {
        this.categorias = response.data;
        window.location.reload();
      })
      .catch(error => {
       ElMessage.error('Erro ao deletar Elemento! Veja se não tem Opções relacionadas!');
      });
    },

    deleteSection(id) {
      axios.delete(`http://localhost:8081/SectionCmp/${id}`)
      .then(response => {
        this.categorias = response.data;
        window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao Seção! Veja se não tem Elementos relacionados!');
      });
    },

    salvarCategoria() {
            axios.put(`http://localhost:8081/category/${this.$route.params.id}`,this.categoria)
        .then((response) => {
            if (response.status === 204) {
            // A resposta da API indica que o recurso foi criado com sucesso.
            // Você pode realizar ações adicionais aqui, se necessário.
            ElMessage.success('Categoria salva com Sucesso!')  
            setTimeout(() => {
                window.location.reload()
            }, 2000);
            } else {
            console.error('Erro ao criar recurso:', response.statusText);
            }
        })
    .catch((error) => {
    console.error('Erro ao criar recurso:', error);
        })},
    newSection() {
        if (!this.categoria.sectionCmps) {
            this.categoria.sectionCmps = [];
        }
        this.categoria.sectionCmps.push({            
            id: 0,
            name: "Nova seção",
            imgUrl: "",
            categoryId: this.categoria.id,
            elementCmpDtos: [],    
        })
        this.novaSecao = true
        this.novoElemento = false
    },

    newElement(section) {
        if (!section.elementCmps) {
            section.elementCmps = [];
        }
        section.elementCmps.push({
            id: 0,
            name: "Novo elemento",
            type: null,
            sectionCmpId: section.id,
            optionCmpDtos: []
        })           
        this.novoElemento = true
        this.novaOpcao = false

    },

    newOption(element) {
        if (!element.optionCmps) {
            element.optionCmps = [];
        }
        element.optionCmps.push({
            id: 0,
            name: "Nova opção",
            imgUrl: "",
            price: 0,
            elementCmpId: element.id,
        })
    }
},

            
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
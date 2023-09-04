<template>
  <div class="container">
    <el-steps align-center :active="currentSection">
    <el-step v-for="section in categoria.sectionCmps" v-bind:key="section" :title="section.name"/>
  </el-steps>

  <el-form :model="selected">
  <div class="section" v-for="section in categoria.sectionCmps" v-bind:key="section">
    <div class="inner-section"  v-if="currentSection == section.sectionCmpId" >
    <h1>{{ section.name }}</h1>
    <div v-for="element in section.elementsCmps" v-bind:key="element" class="ml-4">
      <h2>{{ element.name }}</h2>
      <el-radio-group v-model="element.elementCmpId">
        <el-radio  v-model="selected" v-for="option in element.optionsCmps" v-bind:key="option" size="large" :label="option.optionCmpId">{{ option.name }} (R${{ option.price }})</el-radio>
      </el-radio-group>
    </div>

      <el-button type="primary" v-on:click="previousSection" v-if="currentSection != 1">Voltar</el-button>
      <el-button type="primary" v-on:click="nextSection">Próximo passo</el-button>
    </div>
  </div>
  </el-form>

  <h2>{{ selected }}</h2>
  <h2>{{ currentSection }} </h2>

  </div>
</template>


<script>

  export default {
      data() {
          return {
              currentSection: 1,
              selected: [],
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
                            },
                            {
                                elementCmpId: 2,
                                name: "cor",
                                type: null,
                                sectionCmpId: 1,
                                optionsCmps: [
                                    {
                                        optionCmpId: 3,
                                        name: "bege",
                                        imgUrl: "",
                                        price: 200,
                                        elementCmp: 1,
                                    },
                                    {
                                        optionCmpId: 4,
                                        name: "preto",
                                        imgUrl: "",
                                        price: 300,
                                        elementCmp: 1,
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        sectionCmpId: 2,
                        name: "Encosto",
                        imgUrl: "",
                        categoryId: 1,
                        elementsCmps: [
                            {
                                elementCmpId: 3,
                                name: "altura",
                                type: null,
                                sectionCmpId: 2,
                                optionsCmps: [
                                    {
                                        optionCmpId: 5,
                                        name: "10cm",
                                        imgUrl: "",
                                        price: 200,
                                        elementCmp: 2,
                                    },
                                    {
                                        optionCmpId: 6,
                                        name: "5cm",
                                        imgUrl: "",
                                        price: 150,
                                        elementCmp: 2,
                                    }
                                ]
                            }
                        
                        ]
                    },
                    {
                        sectionCmpId: 3,
                        name: "Material",
                        imgUrl: "",
                        categoryId: 1,
                        elementsCmps: [
                            {
                                elementCmpId: 3,
                                name: "altura",
                                type: null,
                                sectionCmpId: 3,
                                optionsCmps: [
                                    {
                                        optionCmpId: 7,
                                        name: "10cm",
                                        imgUrl: "",
                                        price: 200,
                                        elementCmp: 1,
                                    },
                                    {
                                        optionCmpId: 8,
                                        name: "5cm",
                                        imgUrl: "",
                                        price: 150,
                                        elementCmp: 1,
                                    }
                                ]
                            }
                        
                        ]
                    },
                ]
              },

          }
      },
      methods: {
        selecionarOpcao(option) {
          for (let e in this.selected){
            if (option == e)
            return

            if (option.elementCmp == e.elementCmp){
              this.selected = this.selected.splice(e, 1) 
            }
          }
          this.selected.push(option)
        },
        nextSection() {
          this.currentSection += 1
        },
        previousSection() {
          this.currentSection -= 1
        }
      },
  
  }
</script>

<style>

</style>
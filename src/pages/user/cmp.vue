<template>
  <div class="container">
    <el-steps align-center :active="currentSection">
<el-step v-for="section in categoria.sectionCmps" v-bind:key="section" :title="section.name"/>
  </el-steps>

  <el-form :model="selected">
  <div class="section" v-for="section in categoria.sectionCmps" v-bind:key="section">
    <div class="inner-section"  v-if="currentSection == section.id" >
    <h1>{{ section.name }}</h1>
    <div v-for="element in section.elementCmps" v-bind:key="element" class="ml-4">
      <h2>{{ element.name }}</h2>
      <el-radio-group v-model="element.id">
        <el-radio  v-model="selected" v-for="option in element.optionCmps" v-bind:key="option" size="large" :label="option.id">{{ option.name }} (R${{ option.price }})</el-radio>
      </el-radio-group>
    </div>
      <el-button type="primary" v-on:click="previousSection" v-if="currentSection != 1">Voltar</el-button>
      <el-button type="primary" v-on:click="nextSection">Próximo passo</el-button>
    </div>
  </div>
  </el-form>



  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      currentSection: 1,
      selected: [],
      categoria:{      
            name : "",
            allow_creation: false,
            sectionCmps: [
              
            ]          
            }
    };
  },
  mounted() {
        const id = this.$route.params.id;
    // Fazer uma solicitação GET para buscar dados da categoria por ID
    axios.get(`http://localhost:8081/category/1`)
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
    selecionarOpcao(option) {
      // Seu código para selecionar opções aqui
    },
    nextSection() {
      this.currentSection += 1;
    },
    previousSection() {
      this.currentSection -= 1;
    },
  },
};
</script>

<style>

</style>
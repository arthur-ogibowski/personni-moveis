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
      categoria: null, // Inicialize como nulo até carregar os dados da API
    };
  },
  created() {
    // Faça uma solicitação Axios para buscar os dados da API
    axios.get('http://localhost:8081/category')
      .then((response) => {
        this.categoria = response.data; // Atualize a propriedade categoria com os dados da API
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
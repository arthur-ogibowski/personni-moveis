<template>
  <div class="container">
    <el-steps align-center :active="currentSection">
      <el-step v-for="section in categoria.sectionCmps" :key="section.id" :title="section.name" />
    </el-steps>

    <el-form :model="selected">
      <div class="section" v-for="section in categoria.sectionCmps" :key="section.id">
        <div class="inner-section" v-if="currentSection === section.id">
          <h1>{{ section.name }}</h1>
          <div v-for="element in section.elementCmps" :key="element.id" class="ml-4">
            <h2>{{ element.name }}</h2>
            <el-radio-group v-model="element.id">
              <el-radio
                v-model="selected"
                v-for="option in element.optionCmps"
                :key="option.id"
                size="large"
                :label="option.id">
                {{ option.name }} (R${{ option.price }})
              </el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="previousSection" v-if="currentSection !== 1">Voltar</el-button>
          <el-button type="primary" @click="nextSection">Próximo passo</el-button>
        </div>
      </div>
      <el-button type="primary" @click="previousSection" v-if="isLastSection">Voltar</el-button>
      <el-button type="primary" @click="criarCMP" v-if="isLastSection">Salvar</el-button>
    </el-form>
  </div>
</template>

<!-- ... Resto do código ... -->


<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentSection: 1,
      selected: [],
      categoria: {
        name: "",
        allow_creation: false,
        sectionCmps: [],
      },
    };
  },
  mounted() {
    const id = this.$route.params.id;
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
  computed: {
    isLastSection() {
      // Verifique se a seção atual é a última seção
      return this.currentSection > this.categoria.sectionCmps.length;
    },
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
    criarCMP() {
      // Lógica para criar a categoria aqui
    },
  },
};
</script>

<style>
</style>

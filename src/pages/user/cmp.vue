<template>
  <div class="container">
    <el-steps align-center :active="currentSection">
      <el-step v-for="section in categoria.sectionCmps" :key="section.id" :title="section.name" />
    </el-steps>
    <div class="mb-2 flex items-center text-sm">
  </div>
    <el-form :model="selected">
      <div class="section" v-for="section in categoria.sectionCmps" :key="section.id">
        <div class="inner-section" v-if="currentSection === section.id">
          <h1>{{ section.name }}</h1>
          <div v-for="element in section.elementCmps" :key="element.id" class="ml-4">
            <h2>{{ element.name }}</h2>
            <el-radio-group v-model="selected[element.id]">
              <el-radio
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
    </el-form>{{ selected }}
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentSection: 1,
      selected: [], 
      products_cmp: {
        id: 0,
        value: 0,
        quantity: 0,
        imgUrl: "string",
        description: "string",
        sectionProductCmpDtos: [],
      },
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
    nextSection() {
      this.currentSection += 1;
    },
    previousSection() {
      this.currentSection -= 1;
    },
    encontrarElementoESeçãoPorOpção(optionIds) {
      const correspondencias = [];
      for (const section of this.categoria.sectionCmps) {
        for (const element of section.elementCmps) {
          for (const optionId of optionIds) {
            const option = element.optionCmps.find((opt) => opt.id === optionId);
              if (option) {
                correspondencias.push({ sectionId: section.id, elementId: element.id, optionId: option.id });
              }
          }
        }
      }
      return correspondencias;
    },

    criarCMP() {
  // Encontre os IDs da seção e do elemento com base na opção selecionada
  const correspondencias = this.encontrarElementoESeçãoPorOpção(this.selected);

  if (correspondencias.length > 0) {
      correspondencias.forEach(({ sectionId, elementId, optionId }) => {
      // Crie um objeto para a seção
      const sectionObj = {
        "sectionId": sectionId,
        "name": "string",
        "imgUrl": "string",
        "categoryId": 0,
        "elementProductCmpDtos": []
      };

      // Crie um objeto para o elemento
      const elementObj = {
        "id": elementId,
        "name": "string",
        "imgUrl": "string",
        "type": "string",
        "sectionCmpId": 0,
        "optionProductCmpDto": {
          "id": optionId,
          "name": "string",
          "price": 0,
          "imgUrl": "string",
          "elementCmpId": 0
        }
      };

      // Adicione o elemento ao array de elementos da seção
      sectionObj.elementProductCmpDtos.push(elementObj);

      // Adicione a seção ao array de seções do JSON
      this.products_cmp.sectionProductCmpDtos.push(sectionObj);
    });
    axios.post('http://localhost:8081/products_cmp', this.products_cmp)
    .then((response) => {
            if (response.status === 201) {
            // A resposta da API indica que o recurso foi criado com sucesso.
            // Você pode realizar ações adicionais aqui, se necessário.
            console.log('Recurso criado com sucesso', response.data);
        
            } else {
            console.error('Erro ao criar recurso:', response.statusText);
            }
        })
    .catch((error) => {
    console.error('Erro ao criar recurso:', error);
        }) 
  }
}

  },
};
</script>

<style>
</style>

<template>
  <div class="container">
    <el-steps align-center :active="currentSection">
      <el-step v-for="section in categoria.sectionCmps" :key="section.id" :title="section.name" />
    </el-steps>

    <div class="cmp-container">
      <div class="cmp-sections">
        <el-form :model="selected">
          <div class="section" v-for="section in categoria.sectionCmps" :key="section.id">
            <div class="inner-section" v-if="currentSection == categoria.sectionCmps.indexOf(section) + 1">
              <h1>{{ section.name }}</h1>
              <div class="section-elements">
                <div v-for="element in section.elementCmps" :key="element.id" class="ml-4 element-item">
                  <el-divider>{{ element.name }}</el-divider>
                  <el-radio-group v-model="selected[element.id]">
                    <el-radio-button v-for="option in element.optionCmps" :key="option.id" size="large"
                      @change="resumoCmp" :label="option.id">
                      {{ option.name }} (R${{ option.price }})
                    </el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="actions">
                <el-button class="cta" color="$cta-color" type="primary" @click="previousSection"
                  v-if="currentSection !== 1">Voltar</el-button>
                <el-button class="cta" color="$cta-color" style="visibility: hidden;" type="primary"
                  @click="previousSection" v-else></el-button>
                <el-button class="cta" color="$cta-color" type="primary" @click="nextSection">Próximo passo</el-button>
              </div>
            </div>
          </div>
          <el-button class="cta" color="$cta-color" type="primary" @click="previousSection"
            v-if="isLastSection">Voltar</el-button>
          <el-button class="cta" color="$cta-color" type="primary" @click="criarCMP(this.products_cmp)"
            v-if="isLastSection">Salvar</el-button>
        </el-form>
      </div>

      <div class="resumo">
        <h1>Resumo</h1>
        <div class="nome">
          <h2>Opções Escolhidas</h2>
          <ul>
            <li v-for="optionInfo in selectedOptionsInfo" :key="optionInfo">{{ optionInfo }}</li>
          </ul>
        </div>
        <div class="preco">
          <h2>Total</h2>
          <h3>R$ {{ products_cmp.value }}</h3>
        </div>
      </div>
    </div>
    <h1>{{ this.products_cmp }}</h1>
  </div>
</template>
<script>
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import cartService from '@/store/cartService';

export default {
  data() {
    return {
      currentSection: 1,
      selected: [],
      selectedOptionsInfo: [],
      products_cmp: {
        id: 0,
        value: 0,
        amount: 1,
        imgUrl: '',
        description: '',
        sectionProductCmpDtos: [],
      },
      categoria: {
        name: "",
        allow_creation: false,
        sectionCmps: [],
      },
    };
  },
  async created() {
    const loading = ElLoading.service({
      lock: true,
      text: 'Carregando',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const id = this.$route.params.id;
    axios.get(`http://localhost:8081/category/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.categoria = response.data;
          setTimeout(() => {
            loading.close()
          }, 250)
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
              correspondencias.push({ section: section, element: element, option: option });
            }
          }
        }
      }
      return correspondencias;
    },

    resumoCmp() {
      // Encontre os IDs da seção e do elemento com base na opção selecionada
      const correspondencias = this.encontrarElementoESeçãoPorOpção(this.selected);

      if (correspondencias.length > 0) {
        const selectedOptionsInfo = []; // Array para armazenar as informações de cada opção escolhida

        correspondencias.forEach(({ section, element, option }) => {
          // Verifique se a seção já existe na lista de seções
          const existingSection = this.products_cmp.sectionProductCmpDtos.find(sec => sec.sectionId === section.id);

          if (existingSection) {
            const existingElement = existingSection.elementProductCmpDtos.find(ele => ele.id === element.id);

            if (existingElement) {
              // Se o elemento já existe, substitua a opção existente
              existingElement.optionProductCmpDto = {
                "id": option.id,
                "name": option.name,
                "price": option.price,
                "imgUrl": "string",
                "elementCmpId": 0
              };
            } else {
              // Caso contrário, crie um novo objeto para o elemento e a opção
              const elementObj = {
                "id": element.id,
                "name": element.name,
                "imgUrl": "string",
                "type": "string",
                "sectionCmpId": 0,
                "optionProductCmpDto": {
                  "id": option.id,
                  "name": option.name,
                  "price": option.price,
                  "imgUrl": "string",
                  "elementCmpId": 0
                }
              };

              existingSection.elementProductCmpDtos.push(elementObj);
            }
          } else {
            // Se a seção não existir, crie uma nova seção com o elemento e a opção
            const sectionObj = {
              "sectionId": section.id,
              "name": section.name,
              "imgUrl": "string",
              "categoryId": 0,
              "elementProductCmpDtos": [{
                "id": element.id,
                "name": element.name,
                "imgUrl": "string",
                "type": "string",
                "sectionCmpId": 0,
                "optionProductCmpDto": {
                  "id": option.id,
                  "name": option.name,
                  "price": option.price,
                  "imgUrl": "string",
                  "elementCmpId": 0
                }
              }]
            };

            this.products_cmp.sectionProductCmpDtos.push(sectionObj);
          }
          // Construa uma string com as informações da opção escolhida
          const optionInfo = `${section.name} - ${element.name} - ${option.name} (R$${option.price})`;

          selectedOptionsInfo.push(optionInfo);
        });

        // Atualize o valor total
        this.products_cmp.value = this.products_cmp.sectionProductCmpDtos.reduce((total, section) => {
          return total + section.elementProductCmpDtos.reduce((eleTotal, element) => {
            return eleTotal + element.optionProductCmpDto.price;
          }, 0);
        }, 0);

        this.selectedOptionsInfo = selectedOptionsInfo;
      }
    },
    criarCMP(productsCmp) {
      // axios.post('http://localhost:8081/products_cmp', this.products_cmp).then((response) => {
      //   if (response.status === 201) {
      //     // A resposta da API indica que o recurso foi criado com sucesso.             
      //     // Você pode realizar ações adicionais aqui, se necessário.             
      //     ElMessage.success('CMP criado com Sucesso!');
      //   }
      // }).catch((error) => { ElMessage.error('Erro ao criar CMP!'); })
      cartService.addCmpToCart(productsCmp);
    },
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';

:deep(.el-step__head.is-finish) {
  color: $cta-color;
  border-color: $cta-color;
}

:deep(.el-step__title.is-finish) {
  color: $cta-color;
}

.cmp-container {
  display: flex;
  flex-direction: columns;
  justify-content: space-between;

  .cmp-sections {
    width: 60%;
    height: 100%;
    border-radius: 10px;
    margin-right: 20px;
    padding: 20px;

    .inner-section {
      display: flex;
      flex-direction: column;

      .section-elements {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .element-item {
          margin: 20px;
        }
      }


      div.actions {
        display: flex;
        justify-content: space-between;
      }
    }

  }

  .resumo {
    width: 30%;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 10px;
    margin-left: 20px;
    padding: 20px;
  }
}
</style>

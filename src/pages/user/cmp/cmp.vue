<template>
  <el-menu mode="horizontal" :ellipsis="false" background-color="#FEFEFE" text-color="#112620"
        active-text-color="$tertiary-color" @select="handleSelect">
        <el-menu-item><router-link to="/"><img style="width: 200px;"
                    src="../../../assets/img/personniLogo-Green.png" /></router-link></el-menu-item>

        <h1> Modelagem de móveis </h1>
    </el-menu>
    <div class="steps-container">
      <h2 v-if="!isLastSection">{{ "Passo " + (currentSection + 1) + " de " + categoria.sectionCmps.length}}</h2>
      <h2 v-else>{{ "Passo " + (currentSection + 1) + " de " + categoria.sectionCmps.length + ": Revisar modelagem" }}</h2>
      <el-steps align-center :active="currentSection" finish-status="success">
      <el-step v-for="section in categoria.sectionCmps" :key="section.id" :title="section.name" />
    </el-steps>
    </div>
  <div class="container">

    <div class="cmp-container" v-if="!isLastSection">
      <div class="cmp-sections">
        <el-form :model="selected">
          <div class="section" v-for="section in categoria.sectionCmps" :key="section.id">
            <div class="inner-section" v-if="currentSection == categoria.sectionCmps.indexOf(section) && section.name !== 'Revisar'">
              <div class="section-elements">
                <div v-for="element in section.elementCmps" :key="element.id" class="ml-4 element-item">
                  <h2>{{ element.name }}</h2>
                  <el-radio-group v-model="selected[element.id]">
                    <el-radio-button
                      v-for="option in element.optionCmps"
                      :key="option.id"
                      size="large"
                      @change="resumoCmp"
                      :label="option.id">
                      <div class="option-image" v-if="option.img != ''">
                        <el-image :src="option.img"/>
                      </div>
                      <div class="option-image-placeholder" v-else>
                        <img src="../../../assets/img/personniLogo-Grey.png"/>
                      </div>
                      <div class="option-info">
                       <div class="option-name">{{ option.name }}</div>
                       <div class="option-price">{{ option.price != 0 ? "R$ " + option.price : "--" }}</div>
                      </div>
                    </el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="actions">
                <el-button class="cta" color="$cta-color" type="primary" @click="previousSection" v-if="currentSection !== 0"><el-icon><CaretLeft /></el-icon> Voltar</el-button>
                <el-button class="cta" color="$cta-color" style="visibility: hidden;" type="primary" @click="previousSection" v-else></el-button>
                <el-button class="cta" color="$cta-color" type="primary" @click="nextSection">Próximo passo <el-icon><CaretRight /></el-icon></el-button>
              </div>
            </div>
          </div>
        </el-form>
      </div>

    </div>

    <div class="last-section" v-if="isLastSection">

      <h1>Revisar modelagem</h1>

      <div class="revisar-section">
            <div v-for="optionInfo in selectedOptionsInfo" :key="optionInfo">

                <h2>{{ optionInfo.section }}</h2>
              <div class="revisar-section-list">
                <div v-for="element in optionInfo.elements" :key="element" class="revisar-section-item">
                  <div class="element-image" v-if="element.img">
                        <el-image :src="element.img"/>
                  </div>
                  <div class="element-image" v-else>
                        <img src="../../../assets/img/personniLogo-Grey.png"/>
                  </div>
                  <div class="revisar-section-item-option">
                    <div><h4>{{element.element}}</h4><h3 class="element-option">{{ element.option }}</h3></div>
                    <h3 class="element-price">R$ {{ element.price }}</h3>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="preco-final">
          <h3>Preço final:</h3> <h2>R$ {{ products_cmp.value }}</h2>
        </div>
        <div class="revisar-actions">
          <el-button class="cta" color="$cta-color" type="primary" @click="previousSection" v-if="isLastSection"><el-icon><CaretLeft /></el-icon> Voltar</el-button>    
          <el-button class="cta" color="$cta-color" size="large" type="primary" @click="criarCMP" v-if="isLastSection">Adicionar ao carrinho</el-button>
        </div>
      </div>
    
    
  </div>
</template>
<script>
import axios from 'axios';
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import cartService from '@/store/cartService';

export default {
  data() {
    return {
      testImage: "@assets/img/cadeira1.png",
      currentSection: 0,
      selected: [], 
      selectedOptionsInfo: [], 
      products_cmp: {
        id: 0,
        value: 0,
        quantity: 1,
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
  async created() {
    const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
    const id = this.$route.params.id;
    axios.get(`http://localhost:8081/category/` + id)
      .then((response) => {
        if (response.status === 200) {
          this.categoria = response.data;
          this.categoria.sectionCmps.push({
            name: "Revisar",
            elementCmps: [],
          });
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
      return this.currentSection === this.categoria.sectionCmps.length -1;
    },
  },
  methods: {
    criarCMP() {
      // Adiciona CMP criado ao local storage.
      cartService.addCmpToCart(this.products_cmp);
      ElMessage({
        showClose: true,
        message: 'Produto adicionado ao carrinho!',
        type: 'success',
        duration: 3000
      })
      setTimeout (() => {
        this.$router.push('/carrinho');
      }, 250);
    },
    nextSection() {
      this.currentSection += 1;
      const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        this.scrollToTop();
        loading.close()
      }, 250);
    },
    previousSection() {
      this.currentSection -= 1;
      const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        this.scrollToTop();
        loading.close()
      }, 250);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
      });
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
              "img": option.img,
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
                "img": option.img,
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
                "img": option.img,
                "elementCmpId": 0
              }
            }]
          };

          this.products_cmp.sectionProductCmpDtos.push(sectionObj);
        }
          
        if (!selectedOptionsInfo.find((sec) => sec.section === section.name)) {
          selectedOptionsInfo.push({ 
            section: section.name,
            elements: [],
          });
        }

        // push element to elements array
        const elementInfo = {
          element: element.name,
          option: option.name,
          price: option.price,
          img: option.img
        };

        selectedOptionsInfo[selectedOptionsInfo.length - 1].elements.push(elementInfo);
          
          




          //selectedOptionsInfo.push(optionInfo);

          //selectedOptionsInfo.push(optionInfo);
      });

      // Atualize o valor total
      this.products_cmp.value = this.products_cmp.sectionProductCmpDtos.reduce((total, section) => {
        return total + section.elementProductCmpDtos.reduce((eleTotal, element) => {
          return eleTotal + element.optionProductCmpDto.price;
        }, 0);
      }, 0);

      this.selectedOptionsInfo = selectedOptionsInfo;
      }
    }


  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';

/*:deep(.el-step__head.is-finish) {
  color: $cta-color;
  border-color: $cta-color;
}

:deep(.el-step__title.is-finish) {
  color: $cta-color;
}*/

.container, .cmp-container{
  background-color: #FFFFFF !important;
  padding-top: 0;
  h1{
  font-size: 32px;
  font-weight: 400;
  color: $text-color;
  margin-top: 5%;
}
}
:deep(.el-step__icon-inner.is-status) {
  transform: translate(-5px, -6px);
}
:deep(.el-icon svg) {
  height: 25px;
  width: 25px;
}
.el-steps{
  background-color: transparent !important;
  width: 40%;
}
.steps-container{
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;

  h2{
    padding-left: 20px;
  }
}

h2{
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
}
.el-menu{
  justify-content: space-between;
  h1 {
  font-size: 32px;
  font-weight: 400;
  color: $text-color;
  margin-right: 5%;
}
}

.cmp-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: $secondary-color;

  .cmp-sections{
    width: 70%;
    height: 100%;
    border-radius: 10px;
    padding: 20px;

    .inner-section{
      display: flex;
      flex-direction: column;

      h1{
        font-size: 8rem;
        text-align: center;
        font-weight: 400;
      }
      .section-elements{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        .element-item{
          margin: 20px;

          .el-image{
            width: 100px;
            height: 100px;
            margin-bottom: 10px;
          }

          .option-image-placeholder{
            width: 100px;
            height: 100px;
            margin: 5px;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #EBEBEB;
          }

          .option-info{
            display: flex;
            flex-direction: column;
            text-transform: none;

            .option-name{
              font-size: 14px;
              font-weight: 600;
              white-space: normal;
            }
            .option-price{
              font-size: 12px;
              font-weight: 400;
              white-space: normal;
            }
          }
        }
      }


      div.actions{
        display: flex;
        justify-content: space-between;
      }
    }
    
  }

  .resumo{
    width: 30%;
    height: 100%;
    border-radius: 10px;
    margin-left: 20px;
    padding: 20px;
    background-color: #f5f5f5;

    h2{
      font-size: 20px;
      color: $cta-color;
    }


    .resumo-section-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .resumo-section-item{
        margin: 0 10px 10px 0;
        padding: 10px;
        min-width: 150px;
        background-color: #EBEBEB;

        h4{
          margin-top: 0;
          margin-bottom: 10px;
          font-size:  14px;
        }
        p{
          font-size: 12px;
        }


        .resumo-section-item-option{
          display: flex;
          justify-content: space-between;

        }
      }
    }
  }
}
.revisar-actions{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
.revisar-section{


h2{
  font-size: 20px;
}
.revisar-section-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid $admin-grey;
  padding: 10px;
  margin-bottom: 30px;


  .revisar-section-item{
    margin: 0 10px 0 0;
    padding: 10px;
    min-width: 150px;
    width: 200px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    border: 1px solid $secondary-color;

    .element-option{
      font-size: 14px;
      font-weight: 400;
      color: $cta-color;
    }
    .element-price{
      font-size: 12px;
      font-weight: 400;
      min-width: 50px;
      text-align: end;
      color: $text-color;
    }

    .el-image{
      width: 150px;
      height: 150px; 

      :deep(.el-image__error){
        min-height: 150px;
      }
    }

    img {
      width: 150px;
    }

    .element-image {
      width: 150px;
      height: 150px;
      display: flex;
      margin: 10px 0;
      justify-content: center;
      align-items: center;
      align-self: center;
    }

    h4{
      margin-top: 0;
      margin-bottom: 10px;
      font-size:  14px;
      text-align: left;
      color: $admin-grey;
      font-weight: 400;
    }
    .el-text {
      max-width: 50%;
      word-break: normal;
    }
    p{
      font-size: 12px;
    }


    .revisar-section-item-option{
      display: flex;
      justify-content: space-between;
      align-items: end;
      :deep(.el-text) {
            align-self: end !important;
      }
    }
  }
}
}


div.el-radio-group{
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid $secondary-color;
  :deep(.el-radio-button){
    margin: 10px;
    transition: all 0.2s ease-in-out;
    &:hover{
      transform: scale(1.1);
    }
  };
  :deep(span.el-radio-button__inner) {
    padding: 10px 0;
    width: 120px;
    background-color: transparent;
    color: var(--el-text-color-regular) !important;

  display: flex;
  flex-direction: column;
  align-items: center;


  }
  :deep(.el-radio-button.is-active > .el-radio-button__inner) {
    transition: 0.1s;
    background-color: transparent !important;
    outline: 2px solid $cta-color !important;
    color: $text-color !important;

}
}
.preco-final {
  display: flex;
  align-items: baseline;
  justify-content: end;

  h2 {
    margin-left: 10px;
    font-size: 20px;
  }
  h3{
    font-weight: 400;
  }
}

.el-text--success{
  font-size: 18px;
}
:deep(.el-step__head.is-success) {
  height: 24px;
}
</style>

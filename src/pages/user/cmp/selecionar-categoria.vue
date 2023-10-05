<template>
    <div class="container">

        <h1>Criação de móveis</h1>

        <h2>Escolha a categoria</h2>

        <div class="categorias-grid">
          <router-link :to="'/criar/' + i.id" v-for="i in categorias" :key="i">
          <div class="categoria-item" v-if="i.allow_creation">
            <h3> {{  i.name }} </h3>
          </div>
        </router-link>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { ElLoading } from 'element-plus'

export default {
  data() {
    return {
      categorias: []
    }
  },
  async created() {
    const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get('http://localhost:8081/category')
        .then(response => {
          response.data.forEach(categoria => this.categorias.push(categoria));
          setTimeout(() => {
            loading.close()
          }, 250)
        
        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
      });
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';

h2{
    text-align: center;
    font-size: 2.5rem;
}
div.categorias-grid{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

div.categoria-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  padding: 2rem;
  transition: all 0.3s ease-in-out;
  background-color: $secondary-darker;
  height: 200px;
  width: 30vw;

  &:hover{
    transform: scale(1.1);

    h3{
        color: $cta-color;
    }
  }

  img{
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 10px;
  }

  h3{
    font-size: 5rem;
    color: $tertiary-color;
    font-family: shadows-into-light;
    transition: all 0.3s ease-in-out;
  }
}
</style>
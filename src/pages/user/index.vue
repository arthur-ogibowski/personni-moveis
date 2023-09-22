<template>
  <div>
    <div class="content">
      <div class="hero">
        <img src="../../assets/img/personni.png" alt="Personni Móveis" class="img-item"/>
        <div class="about">
          <h2> Personni Móveis </h2>
          <h1> Crie e personalize móveis do seu jeito </h1>
          <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, quisquam? Sint animi ex culpa tempora laboriosam dolor repellat nesciunt, labore soluta qui ducimus ab, fugit id in sed ipsum odio? </p>
          <br>
          <router-link to="/criar"><el-button class="cta" color="$cta-color">Criar meu móvel</el-button></router-link>

        </div>
      </div>

  
      <div class="novidades">
        <h2> Novidades </h2>
        <div class="block text-center">
          <el-carousel interval="5000" type="card" indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="carousel-content">
                <div class="carousel-text">
                  <h3>Cadeira {{ item }} </h3>
                  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. </p>
                  <router-link to="/produtos"><el-button class="cta" color="$cta-color">Detalhes</el-button></router-link>
                </div>
                <div class="carousel-image">
                  <img src="../../assets/img/cadeiras_para_mesa_de_jantar_cafe_2_1_1.jpg">
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="categorias">
        <h2> Categorias </h2>
        <div class="categorias-grid">
          <router-link to="/produtos" v-for="i in categorias" :key="i">
          <div class="categoria-item">
            <h3> {{  i.name }} </h3>
          </div>
        </router-link>
        </div>
        
        <div class="sobre-catalogo">
          <router-link to="/produtos"><el-button class="cta" color="$cta-color">Ver catálogo completo</el-button></router-link>
        </div>
      </div>

      
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categorias: []
    }
  },
  async created() {
      axios.get('http://localhost:8081/category')
        .then(response => {
          response.data.forEach(categoria => this.categorias.push(categoria));
        })
        .catch(error => {
          console.error('Erro ao obter dados da API:', error);
      });
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/basics.scss';


div.content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .cta{
        text-transform: uppercase;
        padding: 20px 40px !important;
        letter-spacing: 0.5px;
      }


   
  div.hero{
    display:flex;
    flex-direction: row;

    img.img-item, div.about{
      width: 50vw;
      height: 700px;
    }

    div.about{
      padding: 8rem;
      
      h1 {
      font-size: 6rem;
      font-weight: 400;
      margin-bottom: 0;
      margin-top: 20px;
      color: $cta-color;
      font-family: playfair-display;
      text-transform: uppercase;      
      }

      h2{
        font-size: 3rem;
        color: $primary-color;
        font-family: shadows-into-light;
        margin-top  : 0;
      }

      p {
        font-size: 1.5rem;
        letter-spacing: 0.5px;
        font-weight: 400;
        margin: 4rem 0;
        color: $secondary-color;
        line-height: 3rem;
      }

      a {
        font-size: 1.5rem;
        color: $user-grey;
        text-decoration: underline;
        font-weight: lighter;
      }

      
    }
    img.img-item{
      object-fit: cover;
    }
  }



  div.novidades{
      width: 100vw;
      margin-top: 2rem;
      //background-color: #fff;

    h2 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: inherit;     
      text-align: center; 
      font-family: shadows-into-light;
      color: $cta-color;
    }


    h3 {
      font-family: shadows-into-light;
      font-size: 3rem;
      margin: 0;
    }
    p{
      font-size: 2rem;
    }

    img {
      max-width: 600px;
      width: 100%;
    }

    .el-carousel__item {
      color: #0a1612;
      text-align: center;
      background-color: #FEFEFE;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .carousel-content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

    }

    .el-carousel {
      width: 100vw;
      min-height: 400px;
    }

    :deep(.el-carousel__mask){
      filter: brightness(0);
    }
    :deep(.el-carousel__container) {
      height: 400px;
    }

  }

  div.categorias{
    margin-top: 2rem;
    padding: 0 20rem;

    h2 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: inherit;     
      text-align: center; 
      font-family: shadows-into-light;
      color: $cta-color;
    }

    div.sobre-catalogo{
      margin-top: 2rem;
      display: flex;
      justify-content: center;
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
      background-color: $tertiary-darker;
      height: 200px;
      width: 30vw;

      &:hover{
        transform: scale(1.1);
      }

      img{
        width: 100%;
        max-width: 150px;
        height: auto;
        border-radius: 10px;
      }

      h3{
        font-size: 5rem;
        color: $secondary-color;
        font-family: shadows-into-light;
      }
    }
  }


}

</style>
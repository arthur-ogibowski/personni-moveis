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
                </div>
                <div class="carousel-image">
                  <img src="../../assets/img/cadeiras_para_mesa_de_jantar_cafe_2_1_1.jpg">
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      
    </div>

  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/basics.scss';


div.content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


   
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

      .cta{
        text-transform: uppercase;
        padding: 20px 40px !important;
        letter-spacing: 0.5px;
      }
      
    }
    img.img-item{
      object-fit: cover;
    }
  }

  div.choice{
    display: flex;
    flex-direction: row;

    div.catalogo{
      background-color: $tertiary-color;

      & h2:hover{
        color: $cta-color;
      }
    }

    div.criar{
      background-color: $cta-color;

      & h2:hover{
        color: $tertiary-color;
      }
    }

    div.catalogo, div.criar{
      width: 50vw;
      min-height: 200px;
      height: 50vh;
      text-align: center;
      h2{
        font-size: 4vw;
        font-family: shadows-into-light;
        transition: 0.2s all ease-in-out;
      }
      p{
        font-size: 2vw;
      }
    }

    h2, p{
      color: #fff;
    }
  }


  div.novidades{
      width: 100vw;
      //background-color: #fff;

    h2 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: inherit;     
      text-align: center; 
      font-family: shadows-into-light;
      color: $tertiary-color;
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
      margin-bottom: 100px;
    }

    :deep(.el-carousel__mask){
      filter: brightness(0);
    }
    :deep(.el-carousel__container) {
      height: 400px;
    }

  }


}

</style>
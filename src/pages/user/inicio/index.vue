<template>
  <div class="container">
    <NavBar />
    <div class="img-mask">
      <img src="../../../assets/img/personni.png" alt="Personni Móveis" class="img-item"/>
    </div>
    <div class="content">
      <div class="hero">
        <h1> Personni Móveis </h1>
        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, quisquam? Sint animi ex culpa tempora laboriosam dolor repellat nesciunt, labore soluta qui ducimus ab, fugit id in sed ipsum odio? </p>
      </div>

      <div class="choice">
        <div class="catalogo">
          <router-link class="para-catalogo" to="/produtos"><h2>Catálogo <el-icon><Right /></el-icon></h2></router-link>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. </p>
        </div>
        <div class="criar">
          <router-link to="/criar"><h2> Criação de móveis <el-icon><Right /></el-icon></h2></router-link>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. </p>
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
                  <img src="../../../assets/img/cadeiras_para_mesa_de_jantar_cafe_2_1_1.jpg">
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
import NavBar from '@/components/Navbar.vue'
export default {
  components: {
    NavBar
  }

}
</script>

<style lang="scss" scoped>

div.img-mask{
  width: 100vw;
  height: 100%;
  position: fixed;
  top: -60px;
  filter: brightness(0.3);
  z-index: -1;

  img.img-item{
    width: 100vw;
    max-width: 100%;
    height: 750px;
    object-fit: cover;
  }
}

div.content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div.hero{
    color: #fff;
    padding: 2rem;
    text-align: center;
    max-width: 50vw;
    margin-top: 14rem;
    margin-bottom: 18rem;

    h1 {
      font-size: 6vw;
      font-weight: 700;
      margin-bottom: 0;
      color: inherit;
      //font-family: shadows-into-light;      
    }

    p {
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 1rem;
      color: #C5C1C0;
      margin-top: 0;
    }
  }

  div.choice{
    display: flex;
    flex-direction: row;

    div.catalogo{
      background-color: #1a2930;

      & h2:hover{
        color: #f7ce3e;
      }
    }

    div.criar{
      background-color: #f7ce3e;

      & h2:hover{
        color: #1a2930;
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
      background-color: #fff;

    h2 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: inherit;     
      text-align: center; 
      font-family: shadows-into-light;
      color: #1a2930;
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
      object-fit: cover;
    }

    .el-carousel__item {
      color: #0a1612;
      text-align: center;
      background-color: #C5C1C0;
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
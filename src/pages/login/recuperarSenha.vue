<template>
  <div class="container">
    <img src="../../assets/img/personniLogo-Green.png" alt="Personni Móveis" class="logo"/>
    <div class="login-container">
      <div class="side-image">
        <img src="../../assets/img/personni.png" alt="Personni Móveis" class="img-item"/>
      </div>
    <!-- <div class="blue-rectangle"> -->
        <div class="dialog">
            <h1>Recuperar Senha</h1>
            <h3>informe o e-mail de sua conta para receber uma requisição de troca de senha.</h3>
                <el-input
                  v-model="email"
                  size="large"
                  placeholder="Email"
                />
                <el-button class="cta" color="$cta-color" size="large">Enviar</el-button>
        </div>
      </div>
      <h2><router-link class="voltar" to="/login"><el-icon><ArrowLeftBold /></el-icon> Voltar para login</router-link></h2>
  </div>

</template>

<script>
export default {
  data() {
      return {
        login:{
            email: "",
        },
      }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/basics.scss';
div.container{
  display: flex;
   justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background-color: #CECECE;
  padding-top: 0;
  padding-bottom: 0;
  .logo{
    width: 25rem;
    margin-bottom: 20px;
  }
}

div.login-container{
    img {
      object-fit: cover;
      height: 100%;
    }

    :deep(.side-image) {
      flex-basis: 50%;
    }
    .dialog{
      flex-basis: 70%;
    }
}


div.dialog{
    .el-link{
      color: $admin-grey;
      text-decoration: underline;
    }
    .el-link.is-underline:hover::after {
      border-bottom:none;
    }
    .recuperar-senha{
      text-align: right;

      .el-link{
        font-size: 12px;
      }
    }
    :deep(.el-divider){
      border-top: 1px solid $admin-grey;
    }
    :deep(.el-divider__text) {
      background-color: $tertiary-color;
      color: $admin-grey;
    }
    .register{
      text-align: center;

      .el-link{
        font-size: 16px;
      }
    }
}

h1{
    color: $primary-color;
    text-align: center;
    font-family: shadows-into-light;
    font-size: 4rem;
    font-weight: 400;   
}
h3 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2%;
  color: $secondary-color;
}
h2 {
  text-align: center;
  margin-top: 20px;
  color: $cta-color;
  font-weight: 400;

  .voltar{
    display: flex;
    align-items: center;
  }
}
</style>
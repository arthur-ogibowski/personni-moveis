<template>
  <div class="container login">
    <div class="side-image"></div>
    <!-- <div class="blue-rectangle"> -->
        <div class="login-dialog">
            <h1>Recuperar Senha</h1>
            <h3>informe o e-mail de sua conta para receber uma requisição de troca de senha.</h3>
                <el-input
                  v-model="email"
                  size="large"
                  placeholder="Email"
                />
                <router-link to="/login"><el-button color="#343434" size="large">Enviar</el-button></router-link>
        </div>
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

div.login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #112620;
}
// div.blue-rectangle{
//     width: 800px;
//     height: 800px;
//     flex-shrink: 0;
//     background: #2A58E1;

//     :deep(.el-input), :deep(.el-button){
//         width: 330px;
//         height: 56px;
//         margin: 25px;
//         color: #FCFAF1;
// text-align: center;
// font-size: 26px;
// font-style: normal;
// line-height: normal;
// letter-spacing: -0.333px;
//     }
// }


div.login-dialog{
    background: #FCFAF1;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.50);
    margin: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 480px;
    height: 480px;
    :deep(.el-input), :deep(.el-button){
         width: 330px;
         height: 56px;
         margin: 25px;
         color: #FCFAF1;
    }
}

h1{
    color: #1a2930;
    text-align: center;
    font-family: Inter;
    font-size: 41px;
    font-style: normal;
    font-weight: 700;   
    line-height: normal;
}

h3 {
  width: 330px;
  text-align: justify;
  font-size: 16px;
  letter-spacing: 0.9px;
}

</style>
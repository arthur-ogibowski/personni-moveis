<template>
    <div class="container login">
      <div class="side-image"></div>
      <!-- <div class="blue-rectangle"> -->
          <div class="login-dialog">
              <h1>Login</h1>
                  <el-input
                    v-model="login.email"
                    size="large"
                    placeholder="Email"
                  />
                  <el-input
                    v-model="login.password"
                    size="large"
                    placeholder="Senha"
                    type="password"
                    show-password
                  />
                  <el-button color="#343434" size="large" :loading-icon="Eleme" :loading="carregando" v-on:click="fazerLogin()">Entrar</el-button>
                  <router-link to="/login/recuperar-senha"><el-link>Esqueci minha senha</el-link></router-link>
          </div>
          <div class="register">
            <!-- <h2>Não possui uma conta?</h2> -->
            <router-link to="/login/cadastro"><el-button class="cadastro-btn" size="large">Criar Conta</el-button></router-link>
          </div>
      <!-- </div> -->
    </div>
  
  </template>


<script>
import axios from 'axios';
import AuthService from '@/authService.js';
import jwtDecode from 'jwt-decode';

export default {
    data() {
        return {
            login:{
            email: "",
            password: "",
        },
            carregando: false,
            usuario: null,
        }
    },
    created() {                              // VERIFICA USUARIO LOGADO, PEGA O TOKEN E PASSA PELA VERIFICAÇÃO, CASO ESTEJA LOGADO REDIRECIONA PARA PAGINA INICIAL.
      const token = AuthService.getToken();
      if (token) {
        this.$router.push('/');
      }
    },
    methods: {
        fazerLogin() {
            axios.post('http://localhost:8081/login', this.login)
            .then(response => {
          if (response.status === 200) {
            const token = response.data.token;
            AuthService.setToken(token);

            // Decodifica o token para obter as informações do usuário
            const usuario = jwtDecode(token);
            console.log('Informações do usuário:', usuario);

            this.$router.push('/');
          } else {
            console.error('Erro ao fazer login. Código de status:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao fazer login:', error);
        })
    }
  }
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

h2 {
  text-align: center;
  color: #FFF;
}

.cadastro-btn {
  width: 480px;
  height: 60px;
  font-size: 20px;
  // text-transform: uppercase;
  font-weight: bold;
  color: #1a2930;
}

.cadastro-btn:hover {
  color: #1a2930;
  background-color: #cecece;
}

.cadastro-btn:active, .cadastro-btn:focus {
  color: #1a2930;
}

</style>